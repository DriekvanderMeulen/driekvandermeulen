# @repo/db

Database layer package for Kiban. Provides type-safe PostgreSQL access via Drizzle ORM with automatic migrations and TypeScript type generation.

## Overview

This package handles all database operations for the Kiban application, including:
- User accounts and authentication sessions
- OAuth account linking (Google, GitHub, etc.)
- Email verification tokens
- Custom data tables for app-specific features

## Database Setup

### Prerequisites

- PostgreSQL 13+ installed locally or via Docker
- Environment variables configured (.env file)

### Environment Variables

Create a `.env` file in the `packages/db/` directory:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/kiban"
```

### Docker Setup (Recommended)

Start PostgreSQL locally:

```bash
docker run --name kiban-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=kiban \
  -p 5432:5432 \
  postgres:16
```

### Initial Setup

From `packages/db/`:

```bash
# Generate schema migrations from schema.ts
bun run generate

# Apply pending migrations to database
bun run migrate

# Or push schema directly (dev only - overwrites existing schema)
bun run push

# Open Drizzle Studio (database GUI)
bun run studio
```

## Schema Overview

### Core Tables

#### users
Stores user account information.

```typescript
{
  id: string;           // Unique identifier
  email: string;        // User email (unique)
  name: string | null;  // Display name
  image: string | null; // Avatar image URL
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

#### sessions
Manages active user sessions for authentication.

```typescript
{
  id: string;           // Unique session ID
  userId: string;       // Reference to users.id
  expiresAt: Date;      // Session expiration
  token: string;        // Session token
  ipAddress: string | null;
  userAgent: string | null;
}
```

#### accounts
Links OAuth providers to user accounts (Google, GitHub, etc.).

```typescript
{
  id: string;
  userId: string;       // Reference to users.id
  provider: string;     // "google", "github", etc.
  providerAccountId: string;
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: Date | null;
  createdAt: Date;
}
```

#### verifications
Stores email verification and password reset tokens.

```typescript
{
  id: string;
  identifier: string;   // Email or identifier being verified
  token: string;        // Verification token
  expiresAt: Date;      // Token expiration
  createdAt: Date;
}
```

## Working with Migrations

### Creating Migrations

After modifying `src/schema.ts`:

```bash
bun run generate
```

This creates a SQL migration file in `src/migrations/` with timestamped filename.

### Viewing Migrations

Migrations are stored in `src/migrations/` and are numbered in order:

```
src/migrations/
├── 0000_brave_daredevil.sql
├── 0001_high_flying_redwing.sql
└── 0002_marvelous_invisible_woman.sql
```

Each migration is idempotent and can be safely run multiple times.

### Rolling Back Migrations

To undo recent migrations, reverse them manually or use:

```bash
# In development, push current schema state directly
bun run push
```

Note: For production, use database-specific rollback procedures.

## Type Generation

Drizzle automatically generates TypeScript types from your schema:

```typescript
import type { users, sessions } from '@repo/db/schema';
```

Types are generated in `src/schema.ts` and exported for use in the main application:

```typescript
// From apps/web
import { db } from '@repo/db';
import type { User, Session } from '@repo/db';

// Use in queries and type annotations
const user = await db.query.users.findFirst({
  where: (users, { eq }) => eq(users.id, userId),
});
```

## Querying the Database

### Using db instance

Import and use the Drizzle instance:

```typescript
import { db } from '@repo/db';
import { users, sessions } from '@repo/db/schema';
import { eq } from 'drizzle-orm';

// SELECT
const user = await db.query.users.findFirst({
  where: (users, { eq }) => eq(users.email, email),
});

// SELECT with relations
const userWithSessions = await db.query.users.findFirst({
  where: (users, { eq }) => eq(users.id, userId),
  with: {
    sessions: true,
    accounts: true,
  },
});

// INSERT
const newUser = await db
  .insert(users)
  .values({ email, name, emailVerified: false })
  .returning();

// UPDATE
await db
  .update(users)
  .set({ emailVerified: true })
  .where(eq(users.email, email));

// DELETE
await db.delete(sessions).where(eq(sessions.expiresAt, expiredDate));
```

### Transaction Support

Wrap multiple operations:

```typescript
const result = await db.transaction(async (tx) => {
  await tx.delete(sessions).where(eq(sessions.userId, userId));
  await tx.insert(sessions).values(newSession);
  return { success: true };
});
```

## Better Auth Integration

This database package integrates with Better Auth for session management:

1. Better Auth creates/updates users and sessions automatically
2. Schema includes all necessary tables for Better Auth (users, sessions, accounts, verifications)
3. Drizzle adapter in `apps/web/lib/auth.ts` references this schema
4. Custom queries extend Better Auth functionality when needed

## PostgreSQL-Specific Configuration

### Connection Settings

The database connection uses:
- `prepare: false` - For transaction pool compatibility (e.g., PgBouncer)
- Connection pool - Automatically managed by postgres-js
- Transaction isolation - Default READ COMMITTED

### Performance Tips

1. **Indexes**: Define indexes on frequently queried columns
2. **Eager Loading**: Use `with:` to avoid N+1 queries
3. **Batch Operations**: Use multi-row inserts/updates when possible
4. **Connection Limits**: Monitor pool size for concurrent requests

## Troubleshooting

### Migration Issues

If `bun run migrate` fails:

1. Check DATABASE_URL is correct: `psql $DATABASE_URL`
2. Verify PostgreSQL is running
3. Check migration file syntax: `src/migrations/*.sql`
4. View migration history: `SELECT * FROM __drizzle_migrations;`

### Connection Issues

If you get connection errors:

1. Verify PostgreSQL is running
2. Test connection: `psql postgresql://postgres:postgres@localhost:5432/kiban`
3. Check DATABASE_URL environment variable
4. Ensure network access (localhost for dev, security groups for prod)

### Type Generation Issues

After schema changes, if types don't update:

1. Run: `bun run generate`
2. Clear any TypeScript cache: `rm -rf .turbo`
3. Rebuild: `bun run build`

## Related Documentation

- **ARCHITECTURE.md** - System design overview
- **DEVELOPMENT.md** - Setup and development workflow
- **apps/web/README.md** - How to use database in web app
