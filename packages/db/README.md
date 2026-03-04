# @repo/db - Database Layer

The database package provides ORM and migration management for the Kiban application using Drizzle ORM with PostgreSQL.

## Overview

This package encapsulates all database schema definitions, migrations, and the database client used throughout the application.

**Technology Stack:**
- **ORM**: Drizzle ORM (TypeScript-first, zero-overhead)
- **Database**: PostgreSQL
- **Client**: postgres-js with prepared statements disabled for transaction pool compatibility
- **Migrations**: Drizzle migrations system

## Schema

### Tables

#### users

Stores user account information.

```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  emailVerified BOOLEAN NOT NULL DEFAULT false,
  name TEXT,
  image TEXT,
  createdAt TIMESTAMP NOT NULL DEFAULT now(),
  updatedAt TIMESTAMP NOT NULL DEFAULT now()
);
```

**Fields:**
- `id`: Unique identifier (generated)
- `email`: User email address (indexed, unique)
- `emailVerified`: Email verification status
- `name`: User display name (optional)
- `image`: Avatar URL (optional)
- `createdAt`: Account creation timestamp
- `updatedAt`: Last update timestamp

#### sessions

Stores active user sessions.

```sql
CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL REFERENCES users(id),
  expiresAt TIMESTAMP NOT NULL,
  token TEXT UNIQUE NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT now()
);
```

**Fields:**
- `id`: Session identifier
- `userId`: Foreign key to users table
- `expiresAt`: Session expiration time
- `token`: Unique session token
- `createdAt`: Session creation timestamp

**Indexes:**
- `userId` (for fast user session lookup)
- `expiresAt` (for session cleanup queries)

#### accounts

Maps OAuth providers to user accounts.

```sql
CREATE TABLE accounts (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL REFERENCES users(id),
  accountId TEXT NOT NULL,
  provider TEXT NOT NULL,
  providerAccountId TEXT NOT NULL,
  refreshToken TEXT,
  accessToken TEXT,
  expiresAt INTEGER,
  tokenType TEXT,
  scope TEXT,
  idToken TEXT,
  sessionState TEXT
);
```

**Fields:**
- `id`: Unique identifier
- `userId`: Foreign key to users table
- `provider`: OAuth provider name (e.g., "google")
- `providerAccountId`: ID from the provider
- `accessToken`: OAuth access token (may be refreshable)
- `refreshToken`: Token for refreshing access
- `expiresAt`: Token expiration timestamp

#### verifications

Stores verification tokens for email confirmation, password reset, etc.

```sql
CREATE TABLE verifications (
  id TEXT PRIMARY KEY,
  identifier TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expiresAt TIMESTAMP NOT NULL
);
```

**Fields:**
- `id`: Unique identifier
- `identifier`: Email or other identifier being verified
- `token`: Verification token sent to user
- `expiresAt`: Token expiration time

## Usage

### Importing the Database Client

```typescript
// In server components or API routes
import { db } from '@repo/db'

// Query users
const users = await db.query.users.findMany()

// Find by ID
const user = await db.query.users.findFirst({
  where: (fields, { eq }) => eq(fields.id, userId),
})

// Insert
await db.insert(users).values({
  id: crypto.randomUUID(),
  email: 'user@example.com',
  name: 'John Doe',
})

// Update
await db.update(users)
  .set({ name: 'Jane Doe' })
  .where((fields, { eq }) => eq(fields.id, userId))

// Delete
await db.delete(sessions)
  .where((fields, { eq }) => eq(fields.userId, userId))
```

### With Better Auth

Better Auth uses this database for storing users, sessions, and authentication state:

```typescript
// apps/web/lib/auth.ts
import { db } from '@repo/db'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  providers: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
})
```

## Migrations

Drizzle migrations are SQL files that version your database schema changes.

### Generate a Migration

After modifying `src/schema.ts`, generate a migration:

```bash
cd packages/db
bun run generate
```

This creates a new file in `packages/db/migrations/` with the SQL changes.

**Migration file format:**
- File name: `YYYYMMDDHHMMSS_description.sql`
- Contains UP (forward) and DOWN (rollback) SQL statements
- Generated from schema changes, fully reversible

### Run Migrations

Apply pending migrations to your database:

```bash
cd packages/db
bun run migrate
```

This updates the database schema to match the latest migration.

### Push Schema (Development Only)

For quick development iteration, push schema directly without creating migrations:

```bash
cd packages/db
bun run push
```

**⚠️ Warning:** Only use in development. In production, always use explicit migrations.

### View Database in Drizzle Studio

Open the Drizzle Studio GUI:

```bash
cd packages/db
bun run studio
```

This opens a web interface to browse and edit database records.

## Configuration

### Environment Variables

Required in `.env` or `.env.local`:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/kiban"
```

**Format:**
```
postgresql://[user[:password]@][netloc][:port][/dbname]
```

### drizzle.config.ts

```typescript
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
```

## Schema Design Principles

1. **IDs**: Use TEXT for UUIDs (string-based, globally unique)
2. **Timestamps**: Always include `createdAt` and `updatedAt`
3. **Foreign Keys**: Explicit REFERENCES constraints
4. **Null Safety**: Use explicit NOT NULL or make optional
5. **Indexes**: Add on frequently queried columns (userId, email, expiresAt)
6. **Naming**: Use camelCase in code, avoid abbreviations

## Best Practices

### Security

- Never expose `refreshToken` or `accessToken` to client
- Use parameterized queries (Drizzle handles this)
- Validate user ownership before reading/modifying records
- Hash passwords (handled by Better Auth)

### Performance

- Index foreign key columns
- Use `findFirst` instead of `findMany` when expecting one result
- Batch operations when possible
- Use prepared statements (default in postgres-js)

### Maintenance

- Create migrations for schema changes
- Test migrations in development before production
- Document custom queries in comments
- Review new tables for data lifecycle (expiration, cleanup)

## Extending the Schema

### Add a New Table

1. Define table in `src/schema.ts`:
```typescript
export const posts = pgTable('posts', {
  id: text('id').primaryKey(),
  userId: text('userId').references(() => users.id),
  title: text('title').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
})
```

2. Generate migration:
```bash
bun run generate
```

3. Run migration:
```bash
bun run migrate
```

4. Update types if needed (auto-generated from schema)

### Add a New Column

1. Modify table in `src/schema.ts`
2. Run `bun run generate` to create migration
3. Run `bun run migrate` to apply

## Related Documentation

- `ARCHITECTURE.md` - System design and data flow
- `apps/web/README.md` - Using @repo/db in the web app
- Drizzle ORM docs: https://orm.drizzle.team/docs/overview
- Better Auth docs: https://www.better-auth.com/docs
