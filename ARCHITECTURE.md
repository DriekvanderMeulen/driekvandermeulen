# Kiban Architecture

## System Overview

Kiban is a modern web application built on a Turborepo monorepo structure, combining Next.js 16 for server-side rendering with React 19 for interactive components. The architecture emphasizes separation of concerns through distinct packages while maintaining tight integration through shared utilities and UI components.

## Monorepo Structure

```
kiban/
├── apps/
│   └── web/              # Main Next.js application (port 3000)
├── packages/
│   ├── db/               # Drizzle ORM database layer (PostgreSQL)
│   ├── ui/               # Shared React component library (300+ components)
│   ├── eslint-config/    # Shared ESLint configuration
│   ├── typescript-config/# Shared TypeScript configuration
│   └── brand/            # Brand assets and design tokens
├── docs/                 # Documentation and design specs
└── .worktrees/           # Git worktree workspace (ignored by git)
```

## Core Architectural Decisions

### 1. **Turborepo for Monorepo Management**
- Single source of truth for dependencies
- Shared configuration and tooling
- Optimized build pipeline with caching
- Clear workspace boundaries and dependencies

### 2. **Database Layer Abstraction (@repo/db)**
- Drizzle ORM provides type-safe database access
- PostgreSQL as the primary data store
- Migrations managed within the db package
- Database types automatically generated from schema
- Centralized user/session management for authentication

### 3. **Shared Component Library (@repo/ui)**
- 300+ components following shadcn/ui patterns
- Radix UI primitives for accessibility
- Class Variance Authority (CVA) for component variants
- Tailwind CSS for styling consistency
- No dependencies on app-specific features (pure React components)

### 4. **Authentication with Better Auth**
- Server-side configuration in `apps/web/lib/auth.ts`
- Client-side hooks in `apps/web/lib/auth-client.ts`
- Drizzle adapter for session/user management
- Social login via Google OAuth
- Session stored in PostgreSQL database

### 5. **Three.js Integration**
- React Three Fiber for component-based 3D rendering
- Rapier for physics simulation (collision detection, movement)
- Postprocessing for visual effects
- GLB assets loaded from public directory via Git LFS
- Player controls and camera management

### 6. **Content Management System**
- Static JSON files in `apps/web/data/` directory
- `zones.json` defines interactive 3D environments and metadata
- `landing.json` manages landing page content
- `content-parser.ts` utility for type-safe content access
- Content updates don't require code rebuilds

## Data Flow

### Authentication Flow
```
User → Next.js Route → Better Auth API → Database (Drizzle)
    ↓
auth-client Hook → React State → Protected Components
```

### Content Interaction Flow
```
3D Scene (Three.js/Rapier) → Zone Collision Detection
    ↓
useZoneInteraction Hook → Zone Metadata Lookup (zones.json)
    ↓
Display Zone Content → Update UI State
```

### Database Schema Flow
```
Schema Definition (schema.ts) → Migration Generation → Database Sync
    ↓
TypeScript Types Auto-Generated ← Drizzle
    ↓
Type-Safe Database Queries
```

## Key Components and Their Relationships

### apps/web (Main Application)
- **Entry Points**: `app/page.tsx` (landing), `app/office/page.tsx` (3D scene)
- **Authentication**: Routes protected via Better Auth middleware
- **3D Rendering**: `components/office-scene.tsx` manages Three.js scene setup
- **Content Management**: `hooks/use-zone-interaction.ts` loads zone metadata
- **Styling**: Global Tailwind setup in `app/globals.css`

### packages/db (Database Layer)
- **Schema**: `src/schema.ts` defines all tables and relationships
- **Migrations**: Auto-generated from schema changes
- **Connection**: PostgreSQL with prepared statements disabled for transaction pools
- **Types**: Auto-generated TypeScript types for all models

### packages/ui (Component Library)
- **Organization**: Components organized by category (buttons, forms, layouts, 3D)
- **Exports**: Central `src/index.tsx` for public API
- **Styling**: Tailwind + CVA with custom animation utilities
- **Accessibility**: Radix UI primitives ensure WCAG compliance

## Code Quality & Standards

### Type Safety
- Full TypeScript across all packages
- Auto-generated database types via Drizzle
- Strict tsconfig settings
- Type checking enforced in build pipeline

### Linting & Formatting
- ESLint with max warnings = 0 (strict)
- Prettier with import sorting (by trivago plugin)
- Tailwind class sorting in CSS and JSX
- Auto-format on build via pre-commit hook

### Dead Code Detection
- Knip scans for unused exports and files
- Runs on every build, blocks if issues found
- UI package ignored (too many valid patterns)
- Entry points defined per workspace

### Testing & Verification
- Jest for unit tests (configured but optional)
- Playwright for E2E tests (recommended)
- Type checking: `bun run check-types`
- Lint check: `bun run lint`
- Format check: `bun run format`

## Development Workflow

### Local Development
1. Install dependencies: `bun install`
2. Set up environment variables (see DEVELOPMENT.md)
3. Initialize database: `bun run migrate` (from packages/db)
4. Start dev server: `bun dev`
5. Open http://localhost:3000

### Feature Development
- Create feature branch from `main`
- Implement changes following code standards
- Verify types, linting, formatting
- Commit with descriptive messages
- Open PR with context and testing notes
- Code review and merge

### Branching Strategy
- `main` - production-ready code
- `feature/...` - feature development
- `fix/...` - bug fixes
- `.worktrees/` - isolated feature work (optional)

## Performance Optimizations

### Bundle Optimization
- Turbopack for fast builds
- Next.js Code Splitting by route
- Dynamic imports for heavy libraries
- Tree-shaking via ESM

### Runtime Performance
- React 19 with automatic batching
- Motion (Framer Motion v12) for GPU-accelerated animations
- Three.js scene optimization (LOD, culling)
- Drizzle query optimization

### Asset Handling
- Static assets in `public/` directory
- GLB models via Git LFS
- Image optimization via Next.js Image component
- Font optimization via next/font

## Security Considerations

### Authentication & Authorization
- Session-based auth with Better Auth
- Secure cookies for session storage
- OAuth for social login
- CSRF protection (Better Auth handles)

### Data Protection
- Database credentials in environment variables
- No secrets in version control
- Type-safe database access prevents SQL injection
- Input validation at API boundaries

### Frontend Security
- Content Security Policy ready
- XSS prevention via React escaping
- Third-party library audits
- Regular dependency updates

## Future Extensibility

### Adding New Features
1. **New API endpoints**: Add route in `apps/web/app/api/`
2. **New database tables**: Modify `packages/db/src/schema.ts`, generate migration
3. **New UI components**: Add to `packages/ui/src/`, export from index
4. **New 3D elements**: Add to Three.js scene, integrate with zone system

### Scaling Considerations
- Database: PostgreSQL handles typical SaaS scale
- Frontend: Next.js can be deployed to Vercel with edge functions
- Static assets: Cloud storage (S3, R2) for GLB models
- Real-time: WebSocket support (Drizzle compatible)

## Related Documentation

- **DEVELOPMENT.md** - Setup and daily development workflow
- **CLAUDE.md** - AI assistant guidelines for this codebase
- **packages/db/README.md** - Database schema and migration details
- **packages/ui/COMPONENTS.md** - Component library catalog
- **apps/web/THREE.md** - Three.js integration specifics
- **apps/web/ANIMATIONS.md** - Animation system and patterns
- **apps/web/CONTENT.md** - Content structure and management
- **docs/DESIGN_TOKENS.md** - Design system values
