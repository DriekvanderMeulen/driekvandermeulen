# @repo/db

Database layer for the Kiban monorepo using Drizzle ORM with PostgreSQL.

## Overview

This package provides the database schema, connection, and type-safe queries for the application. It uses Drizzle ORM with the `postgres-js` driver, configured for transaction pool mode compatibility.

## Installation

This package is a workspace dependency. Add it to your app's dependencies:

```json
{
  "dependencies": {
    "@repo/db": "*"
  }
}
```

## Usage

### Database Client

Import the pre-configured database client:

```typescript
import { db } from '@repo/db'

// Use in queries
const users = await db.query.user.findMany()
```

### Schema

Import schema tables directly for queries:

```typescript
import { user, session, account, verification } from '@repo/db/schema'
import { eq } from 'drizzle-orm'

// Type-safe queries
const userRecord = await db.select().from(user).where(eq(user.email, email))
```

## Schema Overview

### Tables

| Table | Description |
|-------|-------------|
| `user` | Core user accounts with email, name, and profile data |
| `session` | Active user sessions with token and expiration |
| `account` | OAuth provider accounts linked to users |
| `verification` | Email/token verification records |

### Relations

- `user` → has many `session` and `account`
- `session` → belongs to `user`
- `account` → belongs to `user`

## Environment Variables

Create a `.env` file (see `.env.example`):

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/kiban"
```

## Scripts

Run from the `packages/db` directory:

```bash
# Generate migrations from schema changes
bun run generate

# Apply migrations to database
bun run migrate

# Push schema directly (development only)
bun run push

# Open Drizzle Studio (database GUI)
bun run studio
```

## Configuration

The database connection is configured for Supabase/PgBouncer transaction pool mode with `prepare: false`. See `drizzle.config.ts` for migration settings.

## Development

### Adding New Tables

1. Define the table in `src/schema.ts`
2. Add relations if needed
3. Run `bun run generate` to create migration
4. Run `bun run migrate` to apply

### Type Safety

All schema exports are fully typed. Use Drizzle's inference utilities:

```typescript
import { user } from '@repo/db/schema'
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm'

type User = InferSelectModel<typeof user>
type NewUser = InferInsertModel<typeof user>
```
