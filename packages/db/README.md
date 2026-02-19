# @repo/db

Database layer for the Kiban monorepo using Drizzle ORM with PostgreSQL. This package provides the database schema, connection management, and migration tooling for Better Auth integration.

## Installation

This package is internal to the monorepo. Import it in your app:

```ts
import { db } from "@repo/db";
import { user, session, account, verification } from "@repo/db/schema";
```

## Setup

### Environment Variables

Create a `.env` file in `packages/db/`:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/kiban"
```

### Database Schema

The schema is designed for Better Auth and includes:

| Table          | Purpose                                      |
| -------------- | -------------------------------------------- |
| `user`         | User accounts with email, name, and avatar   |
| `session`      | Active sessions with tokens and expiration   |
| `account`      | OAuth providers (Google, etc.) linked to users |
| `verification` | Email verification and password reset tokens |

All tables use cascading deletes from the `user` table.

## Commands

Run these from the `packages/db/` directory:

```bash
# Generate migration from schema changes
bun run generate

# Apply migrations to database
bun run migrate

# Push schema directly (development only)
bun run push

# Open Drizzle Studio GUI
bun run studio
```

## Usage

### Querying

```ts
import { db } from "@repo/db";
import { user } from "@repo/db/schema";
import { eq } from "drizzle-orm";

// Find user by email
const found = await db.query.user.findFirst({
  where: eq(user.email, "user@example.com"),
});

// Include relations
const userWithSessions = await db.query.user.findFirst({
  where: eq(user.id, userId),
  with: { sessions: true, accounts: true },
});
```

### Connection Details

The database connection uses `postgres-js` with `prepare: false` for compatibility with transaction pool mode (Supabase, PgBouncer). This is configured automatically.

## Better Auth Integration

This schema is used by Better Auth in `apps/web/lib/auth.ts`. The auth library manages all CRUD operations on these tables. You typically won't need to query them directly except for custom user data.

## Development

### Adding New Tables

1. Add the table definition to `src/schema.ts`
2. Add relations if needed
3. Run `bun run generate` to create a migration
4. Run `bun run migrate` to apply it
