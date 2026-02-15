# Kiban

A modern web application built with Next.js 16, React 19, and Three.js featuring immersive 3D scenes, authentication, and a comprehensive shared component library.

## Monorepo Structure

```
apps/
  web/              # Main Next.js application (port 3000)
packages/
  db/               # Drizzle ORM database layer (PostgreSQL)
  ui/               # Shared React component library (300+ components)
  eslint-config/    # Shared ESLint configuration
  typescript-config/# Shared TypeScript configuration
```

## Quick Start

### Prerequisites

- [Bun](https://bun.sh/) 1.2.20+
- [PostgreSQL](https://www.postgresql.org/) database
- Node.js 18+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd driek-studio-website

# Install dependencies
bun install

# Set up environment variables
cp apps/web/.env.example apps/web/.env
cp packages/db/.env.example packages/db/.env
# Edit .env files with your configuration

# Push database schema (development)
cd packages/db && bun run push && cd ../..

# Start development server
bun dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Development Commands

| Command               | Description                                                     |
| --------------------- | --------------------------------------------------------------- |
| `bun dev`             | Start all apps in development mode                              |
| `bun run build`       | Build all apps and packages (includes format + dead code check) |
| `bun run lint`        | Run ESLint across all workspaces                                |
| `bun run check-types` | Run TypeScript type checking                                    |
| `bun run format`      | Format code with Prettier                                       |
| `bun run knip`        | Check for unused code and exports                               |

### Targeting Specific Workspaces

```bash
turbo dev --filter=web       # Run only the web app
turbo build --filter=@repo/ui # Build only the UI package
```

## Architecture

### Authentication

- **Provider**: [Better Auth](https://www.better-auth.com/) with Drizzle adapter
- **Social Login**: Google OAuth
- **Configuration**: `apps/web/lib/auth.ts` (server), `apps/web/lib/auth-client.ts` (client)

### Database

- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) with PostgreSQL
- **Schema**: User, session, account, and verification tables for authentication
- **Package**: `@repo/db` - see [packages/db/README.md](./packages/db/README.md)

### 3D Integration

- **Libraries**: @react-three/fiber, @react-three/drei, @react-three/rapier (physics)
- **Assets**: GLB models in `apps/web/public/three/`
- **Features**: Collision detection, physics simulation, camera controls

### Component Library

- **Package**: `@repo/ui` with 300+ components
- **Styling**: Tailwind CSS + CVA (class-variance-authority)
- **Base**: Radix UI primitives
- See [packages/ui/README.md](./packages/ui/README.md)

## Environment Variables

### apps/web

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/kiban"
BETTER_AUTH_SECRET="your-secret-key-here-min-32-chars"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### packages/db

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/kiban"
```

## Code Quality

The project enforces strict code quality standards:

- **Zero warnings**: ESLint configured with max-warnings 0
- **Dead code detection**: [Knip](https://knip.dev/) runs during build and fails if deletable files are found
- **Auto-formatting**: Prettier with import sorting and Tailwind class ordering

## Package Documentation

- [apps/web](./apps/web/README.md) - Main Next.js application
- [packages/db](./packages/db/README.md) - Database layer
- [packages/ui](./packages/ui/README.md) - Component library
- [packages/eslint-config](./packages/eslint-config/README.md) - ESLint configuration
- [packages/typescript-config](./packages/typescript-config/README.md) - TypeScript configuration

## License

Private - All rights reserved.
