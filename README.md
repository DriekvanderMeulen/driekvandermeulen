# Kiban

Interactive 3D web application built with React 19, Next.js 16, and Three.js. Features immersive environments, zone-based interactions, and a shared component library.

## Quick Start

### Prerequisites

- **Bun** 1.2.20+ (package manager)
- **Node.js** 18.17+
- **PostgreSQL** 13+
- **Git** 2.30+

### Setup (5 minutes)

```bash
# 1. Clone and install
git clone https://github.com/your-org/kiban.git
cd kiban
bun install

# 2. Configure database
# Create .env files (see DEVELOPMENT.md for details)
cp apps/web/.env.example apps/web/.env.local
cp packages/db/.env.example packages/db/.env

# 3. Start PostgreSQL and initialize database
docker run --name kiban-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=kiban \
  -p 5432:5432 \
  -d postgres:16

cd packages/db
bun run generate && bun run migrate
cd ../..

# 4. Start development server
bun dev

# Open http://localhost:3000
```

## Project Structure

```
Kiban (Monorepo)
├── apps/
│   └── web/                    # Main Next.js application
│       ├── app/                # App directory (routes, layouts)
│       ├── components/         # React components
│       ├── hooks/              # Custom hooks
│       ├── lib/                # Utilities
│       ├── data/               # Content (zones.json, landing.json)
│       └── public/three/       # 3D assets (GLB models)
├── packages/
│   ├── db/                     # Database layer (Drizzle ORM)
│   ├── ui/                     # Shared component library (300+ components)
│   ├── eslint-config/          # ESLint rules
│   ├── typescript-config/      # TypeScript config
│   └── brand/                  # Design tokens
└── docs/                       # Documentation and design specs
```

## Features

- **3D Environments** - React Three Fiber with Rapier physics
- **Interactive Zones** - Zone-based content triggered by player collision
- **Component Library** - 300+ production-ready components
- **Database** - Type-safe PostgreSQL via Drizzle ORM
- **Authentication** - Better Auth with Google OAuth
- **Animations** - Motion (Framer Motion v12) for GPU-accelerated effects
- **Styling** - Tailwind CSS v4 with PostCSS
- **Code Quality** - TypeScript, ESLint, Prettier, Knip

## Common Commands

```bash
# Development
bun dev                         # Start all dev servers
bun dev --filter=web            # Start web app only

# Building
bun run build                   # Build all (with checks)
turbo build --filter=web        # Build web only

# Code Quality
bun run check-types             # TypeScript check
bun run lint                    # ESLint check
bun run format                  # Auto-format code
bun run knip                    # Dead code detection

# Database
cd packages/db
bun run generate                # Create migrations
bun run migrate                 # Apply migrations
bun run studio                  # Open Drizzle Studio (GUI)

# Testing
bun test                        # Run tests
bun test --watch                # Watch mode
```

## Technology Stack

### Frontend
- **React 19** - Component framework
- **Next.js 16** - Server-side rendering
- **Three.js** - 3D graphics
- **Motion** - Animations (Framer Motion v12)
- **Tailwind CSS v4** - Styling
- **CVA** - Component variants
- **Radix UI** - Accessible primitives

### Backend
- **Node.js** - Runtime
- **PostgreSQL** - Database
- **Drizzle ORM** - Type-safe queries
- **Better Auth** - Authentication

### Tooling
- **Bun** - Package manager and runtime
- **Turborepo** - Monorepo orchestration
- **TypeScript** - Type safety
- **Turbopack** - Fast bundler

## Documentation

### Getting Started
- **DEVELOPMENT.md** - Detailed setup and daily workflow
- **ARCHITECTURE.md** - System design and data flow

### Building
- **CONTRIBUTING.md** - Code standards and PR process
- **packages/db/README.md** - Database schema and migrations
- **packages/ui/COMPONENTS.md** - Component catalog (300+ components)

### Features
- **apps/web/THREE.md** - 3D scene setup and asset pipeline
- **apps/web/ANIMATIONS.md** - Animation patterns and timing
- **apps/web/CONTENT.md** - Content management and zone system
- **docs/DESIGN_TOKENS.md** - Design system values

## Architecture Highlights

### Monorepo Benefits
- Single dependency tree
- Shared configuration
- Type-safe cross-package imports
- Optimized build caching

### Database
- Type-safe queries via Drizzle
- Auto-generated TypeScript types
- PostgreSQL with prepared statements
- Better Auth integration

### UI System
- 300+ pre-built components
- Accessible (Radix UI primitives)
- Consistent styling (Tailwind + CVA)
- Zero external dependencies

### 3D System
- React Three Fiber for component-based 3D
- Rapier physics for collision and movement
- Zone-based interaction triggers
- GLB models via Git LFS

## Performance

- **Bundle Size** - Optimized with tree-shaking and code splitting
- **Animations** - GPU-accelerated via Motion/CSS transforms
- **Database** - Efficient queries with Drizzle relations
- **Rendering** - React 19 automatic batching

## Code Quality

- **TypeScript** - Full type coverage
- **Linting** - ESLint with 0 warnings
- **Formatting** - Prettier with import/class sorting
- **Dead Code** - Knip detects unused exports

## Development Workflow

1. **Create feature branch** - `git checkout -b feature/description`
2. **Make changes** - Write code following standards
3. **Run checks** - `bun run check-types && bun run lint && bun run format`
4. **Commit** - Clear message describing changes
5. **Open PR** - Include context and testing steps
6. **Review** - Address feedback
7. **Merge** - Squash and merge to main

See CONTRIBUTING.md for details.

## Deployment

The application is ready for deployment to Vercel or similar platforms supporting Next.js.

### Environment Variables (Production)
```bash
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=... (min 32 characters)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for code standards, review process, and guidelines.

## Troubleshooting

### Build Issues
- Clear cache: `rm -rf .turbo node_modules`
- Reinstall: `bun install`
- Check Node version: `node --version` (18.17+)

### Database Issues
- Verify PostgreSQL running: `psql -U postgres`
- Check DATABASE_URL in .env files
- Reset database: `cd packages/db && bun run push`

### Type Errors
- Run: `bun run check-types`
- Rebuild: `turbo build --force`
- Clear cache: `rm -rf .next`

See [DEVELOPMENT.md](./DEVELOPMENT.md) for more troubleshooting.

## License

[Your License Here]

## Support

- **Documentation**: See docs/ and markdown files in root
- **Issues**: Create issue on GitHub
- **Discussions**: Use GitHub Discussions

## Related Links

- [Turborepo Docs](https://turborepo.dev)
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Three.js Docs](https://threejs.org/docs)
- [Drizzle ORM](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [Better Auth](https://www.better-auth.com)
