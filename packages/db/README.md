# @repo/db

Database layer for the Kiban application using Drizzle ORM with PostgreSQL.

## Overview

This package provides the database schema and connection configuration for the application. It's designed to work with Better Auth for authentication and supports PostgreSQL transaction pool mode.

## Installation

This package is used as a workspace dependency. In your app's `package.json`:

```json
{
	"dependencies": {
		"@repo/db": "*"
	}
}
```

## Usage

### Importing the Database Client

```typescript
import { db } from '@repo/db'

// Query example
const users = await db.select().from(user)
```

### Importing Schema Tables

```typescript
import { account, session, user, verification } from '@repo/db/schema'

// Use in queries
const result = await db.select().from(user).where(eq(user.email, email))
```

## Schema

The database schema includes four main tables for authentication:

### user

| Column        | Type      | Description                  |
| ------------- | --------- | ---------------------------- |
| id            | text      | Primary key                  |
| name          | text      | User's display name          |
| email         | text      | Unique email address         |
| emailVerified | boolean   | Email verification status    |
| image         | text      | Profile image URL (optional) |
| createdAt     | timestamp | Record creation time         |
| updatedAt     | timestamp | Last update time             |

### session

| Column    | Type      | Description                  |
| --------- | --------- | ---------------------------- |
| id        | text      | Primary key                  |
| expiresAt | timestamp | Session expiration time      |
| token     | text      | Unique session token         |
| ipAddress | text      | Client IP address (optional) |
| userAgent | text      | Client user agent (optional) |
| userId    | text      | Foreign key to user          |

### account

| Column       | Type | Description               |
| ------------ | ---- | ------------------------- |
| id           | text | Primary key               |
| accountId    | text | Provider account ID       |
| providerId   | text | OAuth provider identifier |
| userId       | text | Foreign key to user       |
| accessToken  | text | OAuth access token        |
| refreshToken | text | OAuth refresh token       |
| scope        | text | OAuth scopes              |

### verification

| Column     | Type      | Description             |
| ---------- | --------- | ----------------------- |
| id         | text      | Primary key             |
| identifier | text      | Verification identifier |
| value      | text      | Verification token/code |
| expiresAt  | timestamp | Token expiration time   |

## Relationships

```
user
├── sessions (one-to-many)
└── accounts (one-to-many)
```

- A user can have multiple sessions (logged in on different devices)
- A user can have multiple accounts (linked OAuth providers)

## Database Commands

Run these from the `packages/db` directory:

```bash
# Generate migrations from schema changes
bun run generate

# Apply migrations to the database
bun run migrate

# Push schema directly (development only)
bun run push

# Open Drizzle Studio (database GUI)
bun run studio
```

## Environment Variables

Create a `.env` file in this package:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/kiban"
```

## Configuration

The database connection is configured to work with PostgreSQL transaction pool mode:

```typescript
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const client = postgres(process.env.DATABASE_URL!, { prepare: false })
export const db = drizzle(client)
```

The `prepare: false` option is required for compatibility with connection poolers like PgBouncer.
