# Kiban

A Next.js web application featuring interactive 3D scenes, authentication, and a comprehensive shared component library. Built as a Turborepo monorepo.

## Tech Stack

- **Framework**: Next.js 16 with React 19
- **3D Graphics**: Three.js with @react-three/fiber, drei, rapier (physics), and postprocessing
- **Authentication**: Better Auth with Drizzle adapter
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS v4 with Motion (Framer Motion v12)
- **Package Manager**: Bun

## Monorepo Structure

```
apps/
  web/              # Main Next.js application (port 3000)

packages/
  db/               # Drizzle ORM database layer
  ui/               # 300+ shared React components
  brand/            # Brand assets and design tokens
  eslint-config/    # Shared ESLint configuration
  typescript-config/# Shared TypeScript configuration
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.2.20 or later)
- PostgreSQL database

### Installation

```bash
# Install dependencies
bun install

# Set up environment variables
cp apps/web/.env.example apps/web/.env
cp packages/db/.env.example packages/db/.env
# Edit .env files with your configuration
```

### Development

```bash
# Start all apps in development mode
bun dev

# Start specific app only
turbo dev --filter=web
```

### Database

```bash
# Navigate to db package
cd packages/db

# Push schema to database (development)
bun run push

# Or run migrations (production)
bun run migrate

# Open Drizzle Studio
bun run studio
```

## Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start development servers |
| `bun run build` | Build all apps and packages |
| `bun run lint` | Run ESLint across all workspaces |
| `bun run check-types` | Type check all workspaces |
| `bun run format` | Format code with Prettier |
| `bun run knip` | Check for unused code |

## Environment Variables

### apps/web

```bash
DATABASE_URL="postgresql://..."
BETTER_AUTH_SECRET="your-32-char-secret"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

See `apps/web/.env.example` for full template.

## Features

### 3D Scenes

The application includes interactive Three.js scenes with:
- Physics simulation via Rapier
- Custom camera controls
- GLB model loading
- Post-processing effects

### Authentication

Built with Better Auth supporting:
- Google OAuth
- Session management
- Secure token handling

### Component Library

300+ reusable components including:
- Radix UI primitives (dialogs, menus, forms)
- Animated components (beams, gradients, cards)
- Data visualization (charts, tables)
- Specialty components (code blocks, file trees)

## Code Quality

- **Formatting**: Prettier with import sorting
- **Linting**: ESLint with strict rules (0 warnings allowed)
- **Dead Code**: Knip checks during build
- **Types**: Strict TypeScript throughout

## Documentation

- Design plans: `docs/plans/`
- Package documentation: See individual package READMEs
- Configuration: `CLAUDE.md` contains detailed project guidelines
