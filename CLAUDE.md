# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Turborepo monorepo for "Kiban" - a Next.js web application with Three.js 3D scenes, authentication, and a shared component library. The project uses Bun as the package manager and features a React 19/Next.js 16 stack with modern tooling.

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

## Development Commands

### Running the Application

```bash
# Start all apps in development mode
bun dev

# Start specific app only
turbo dev --filter=web

# Build all apps and packages (with formatting and dead code checks)
bun run build

# Build specific package
turbo build --filter=web
```

### Code Quality

```bash
# Run linting across all workspaces
bun run lint

# Run type checking across all workspaces
bun run check-types

# Format all code (auto-runs before build)
bun run format

# Check for unused code/exports
bun run knip

# Generate knip report (happens during build)
bun run knip:unused
```

### Database Commands

Navigate to `packages/db/` first, then:

```bash
# Generate migrations from schema changes
bun run generate

# Run migrations
bun run migrate

# Push schema directly to database (dev only)
bun run push

# Open Drizzle Studio (database GUI)
bun run studio
```

## Architecture & Key Patterns

### Authentication (Better Auth)

- **Provider**: Better Auth with Drizzle adapter
- **Location**: `apps/web/lib/auth.ts` (server config), `apps/web/lib/auth-client.ts` (client)
- **API Route**: `apps/web/app/api/auth/[...all]/route.ts`
- **Database**: User/session tables in `packages/db/src/schema.ts`
- **Social Auth**: Google OAuth (requires `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`)

### Database Layer (@repo/db)

- **ORM**: Drizzle ORM with PostgreSQL
- **Schema**: `packages/db/src/schema.ts` - includes user, session, account, and verification tables
- **Connection**: Uses `postgres-js` with `prepare: false` for transaction pool mode compatibility
- **Configuration**: `drizzle.config.ts` points to schema and migrations directory
- **Usage**: Import `db` from `@repo/db` in web app

### Three.js Integration

- **Libraries**: @react-three/fiber, @react-three/drei, @react-three/rapier (physics), @react-three/postprocessing
- **Assets**: GLB models stored in `apps/web/public/three/` (office.glb, logo.glb)
- **Main Scene**: `apps/web/components/office-scene.tsx` - features collision detection, physics, camera controls
- **Pages**:
  - `/office` - 3D office scene with player movement
  - `/` - Landing page with Three.js elements

### Component Library (@repo/ui)

- **Count**: 300+ components in `packages/ui/src/`
- **Styling**: Tailwind CSS with CVA (class-variance-authority)
- **Types**: Radix UI primitives, custom animations, 3D components
- **Note**: Entire package ignored by Knip (see knip.json)

### Styling & UI

- **Framework**: Tailwind CSS v4 with PostCSS
- **Utilities**: `cn()` helper in `apps/web/lib/utils.ts` (tailwind-merge + clsx)
- **Animations**: Motion (framer-motion v12) for animations - see `docs/plans/` for animation design patterns
- **Components**: shadcn/ui-style components with Radix UI primitives
- **Fonts**: Custom fonts in `apps/web/app/fonts/`

### Turbopack Configuration

Next.js is configured to use Turbopack with the monorepo root set to `../../` from the web app (`next.config.js`). This enables proper resolution of workspace dependencies.

## Environment Variables

### Required for apps/web:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/kiban"
BETTER_AUTH_SECRET="your-secret-key-here-min-32-chars"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

See `apps/web/.env.example` and `packages/db/.env.example` for templates.

## Code Quality & Standards

### Knip Configuration

- **Enabled**: Runs during build and fails if deletable files found
- **Ignored**: UI package, config files, public assets, build outputs
- **Entry points**: Defined per workspace in `knip.json`
- Build command auto-formats, checks for dead code, then builds if clean

### Prettier Configuration

- **Tabs**: Yes (tabWidth: 2)
- **Import Sorting**: Auto-sorted with @trivago/prettier-plugin-sort-imports
- **Tailwind**: Classes sorted with prettier-plugin-tailwindcss
- **Tailwind Functions**: Handles `cva`, `cn`, `clsx`, `tw`
- **Import Order**: Third-party → `@/` imports → relative imports

### ESLint

- Root config in `eslint.config.mjs` extends `packages/eslint-config/base.js`
- Max warnings: 0 (strict enforcement)
- Ignores: node_modules, .next, dist, build, knip-report.json, bun.lock

## Package Manager

**Bun 1.2.20** - Use `bun` commands instead of npm/yarn/pnpm. The repository enforces this via `packageManager` field in root package.json.

## Design Documentation

Design plans and technical specifications are stored in `docs/plans/` with the naming pattern `YYYY-MM-DD-feature-name.md`. These documents include:

- Detailed animation specifications (timing, easing, stagger patterns)
- Component architecture decisions
- Implementation requirements and success criteria

Review existing plans before implementing similar features to maintain consistency.

## Git Worktrees

The project uses git worktrees for feature isolation. Worktrees are stored in `.worktrees/` directory (ignored by git).

## Testing & Verification

- **Type Checking**: Run `bun run check-types` before committing
- **Linting**: Enforced at 0 warnings via `bun run lint`
- **Dead Code**: Knip checks run automatically during build
- **Format**: Auto-formats during build, or run `bun run format` manually

## Common Workflows

### Adding a New Component

1. Add to `packages/ui/src/` (if shared) or `apps/web/components/` (if app-specific)
2. Follow existing patterns: Radix UI primitives + CVA variants + Tailwind
3. Export from `packages/ui/src/index.tsx` if shared
4. Run `bun run check-types` to verify

### Modifying Database Schema

1. Edit `packages/db/src/schema.ts`
2. Run `bun run generate` in packages/db/ to create migration
3. Run `bun run migrate` to apply (or `bun run push` for dev)
4. Update types will auto-generate

### Adding Authentication Features

1. Modify `apps/web/lib/auth.ts` for server-side auth config
2. Use `apps/web/lib/auth-client.ts` for client-side hooks
3. Better Auth uses Drizzle adapter - schema changes go through db package
4. Reference session/user types: `Session` and `User` exported from auth.ts
