# Kiban

A Next.js web application with Three.js 3D scenes, authentication, and a shared component library. Built as a Turborepo monorepo using Bun.

## Tech Stack

- **Framework**: Next.js 16 with React 19
- **3D Graphics**: Three.js via @react-three/fiber, drei, rapier (physics)
- **Auth**: Better Auth with Drizzle adapter
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Animation**: Motion (framer-motion v12)

## Project Structure

```
apps/
  web/              # Main Next.js application (port 3000)
packages/
  db/               # Drizzle ORM database layer
  ui/               # 300+ shared React components
  eslint-config/    # Shared ESLint configuration
  typescript-config/# Shared TypeScript configuration
  brand/            # Brand assets and design tokens
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) 1.2.20+
- PostgreSQL database

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Set up environment variables:
   ```bash
   cp apps/web/.env.example apps/web/.env
   cp packages/db/.env.example packages/db/.env
   ```
4. Configure your database URL and auth secrets in the `.env` files
5. Push the database schema:
   ```bash
   cd packages/db && bun run push
   ```
6. Start development:
   ```bash
   bun dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Development Commands

```bash
# Start all apps in development
bun dev

# Build all apps and packages
bun run build

# Run linting
bun run lint

# Type check
bun run check-types

# Format code
bun run format

# Check for unused code
bun run knip
```

### Database

From `packages/db/`:

```bash
bun run generate   # Generate migration from schema changes
bun run migrate    # Apply migrations
bun run push       # Push schema directly (dev only)
bun run studio     # Open Drizzle Studio GUI
```

## Environment Variables

### apps/web/.env

```bash
DATABASE_URL="postgresql://..."
BETTER_AUTH_SECRET="your-secret-key-min-32-chars"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### packages/db/.env

```bash
DATABASE_URL="postgresql://..."
```

## Package Documentation

- [`packages/db`](packages/db/README.md) - Database schema and Drizzle ORM setup
- [`packages/ui`](packages/ui/README.md) - Component library documentation
- [`packages/typescript-config`](packages/typescript-config/README.md) - TypeScript configuration guide
