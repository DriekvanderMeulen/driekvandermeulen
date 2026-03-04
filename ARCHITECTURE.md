# Kiban Architecture

## System Overview

Kiban is a full-stack web application built on a Turborepo monorepo structure. It combines a Next.js web application with Three.js 3D visualization, user authentication, and a comprehensive shared component library.

**Core Technologies:**
- **Frontend Framework**: Next.js 16 with React 19
- **3D Graphics**: Three.js with @react-three/fiber
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth with Drizzle adapter
- **UI Components**: Tailwind CSS + Radix UI primitives
- **Package Manager**: Bun 1.2.20
- **Build Tool**: Turborepo with Turbopack

## Monorepo Structure

```
kiban/
├── apps/
│   ├── web/                  # Main Next.js application (port 3000)
│   └── docs/                 # Documentation app (future)
├── packages/
│   ├── db/                   # Drizzle ORM layer with PostgreSQL
│   ├── ui/                   # 300+ shared React components
│   ├── eslint-config/        # Shared ESLint rules
│   ├── typescript-config/    # Shared TypeScript configuration
│   └── brand/                # Design tokens and brand assets
├── docs/
│   └── plans/                # Architecture and design decision docs
└── .worktrees/               # Git worktrees for feature isolation
```

## Data Flow Architecture

### Client → Server → Database

```
User Interaction (Client)
         ↓
React Component / Hook
         ↓
API Route / Server Action (Next.js)
         ↓
Database Query (Drizzle ORM)
         ↓
PostgreSQL
         ↓
[Response flows back through the chain]
```

### Authentication Flow

```
User Login/OAuth
         ↓
Better Auth Server Config (apps/web/lib/auth.ts)
         ↓
Drizzle ORM (User/Session tables)
         ↓
PostgreSQL
         ↓
Auth Client Hook (apps/web/lib/auth-client.ts)
         ↓
Protected Components/Pages
```

## Key Systems

### 1. Authentication System (@repo/db + @repo/web)

**Components:**
- **Server Config**: `apps/web/lib/auth.ts` - Better Auth configuration with Drizzle adapter
- **Client Hook**: `apps/web/lib/auth-client.ts` - React hooks for auth state and actions
- **API Route**: `apps/web/app/api/auth/[...all]/route.ts` - Handles auth endpoints
- **Database Tables**: User, Session, Account, Verification (schema in `@repo/db`)
- **Social Auth**: Google OAuth provider (configurable via env vars)

**Data Structure:**
- Users table: id, email, name, image, emailVerified, createdAt
- Sessions table: id, userId, expiresAt, token
- Accounts table: oauth provider mapping
- Verification table: email verification tokens

### 2. Database Layer (@repo/db)

**Key Files:**
- `packages/db/src/schema.ts` - Drizzle schema definitions
- `packages/db/src/index.ts` - Database client export
- `drizzle.config.ts` - Migration configuration
- `packages/db/migrations/` - SQL migration files

**Database Connection:**
- Uses postgres-js client with `prepare: false` for transaction pool compatibility
- Exports `db` instance for use throughout apps
- Supports migrations and schema pushes

**Usage Pattern:**
```typescript
import { db } from '@repo/db'

// In server components or API routes
const users = await db.query.users.findMany()
```

### 3. Component Library (@repo/ui)

**Architecture:**
- 300+ components organized by category (form, layout, visualization, animation)
- Built with Radix UI primitives for accessibility
- Styled with Tailwind CSS v4 and CVA (class-variance-authority)
- Motion animations with framer-motion v12

**Key Utilities:**
- `cn()` helper: Combines Tailwind classes with twMerge and clsx
- CVA for component variants (button sizes, states, colors)
- Custom animations and transitions

### 4. Three.js Integration

**Entry Points:**
- `apps/web/components/office-scene.tsx` - Main 3D scene component
- `apps/web/app/office/page.tsx` - Office exploration page
- GLB models stored in `apps/web/public/three/` (Git LFS)

**Features:**
- Physics simulation with @react-three/rapier
- Collision detection for zone interaction
- Player movement controls
- Post-processing effects

**Asset Pipeline:**
- Models: office.glb (environment), logo.glb (UI element)
- Stored via Git LFS due to file size
- Loaded via THREE.GLTFLoader

### 5. Content & Zones System

**Data Files:**
- `apps/web/data/zones.json` - Zone definitions and metadata
- `apps/web/data/landing.json` - Landing page content

**Zone Metadata Structure:**
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "position": [x, y, z],
  "content": "markdown or HTML"
}
```

**Interaction System:**
- `apps/web/hooks/use-zone-interaction.ts` - Manages zone state
- Triggers on collision detection in Three.js scene
- Updates displayed content based on active zone

## Styling Architecture

### Design System Layers

1. **Design Tokens** (`docs/DESIGN_TOKENS.md`)
   - Color palette (primary, secondary, neutral, semantic)
   - Spacing scale (4px base unit)
   - Typography scale (font families, sizes, weights)
   - Animation timing and easing

2. **Tailwind CSS v4**
   - Configured in `apps/web/tailwind.config.ts`
   - Custom color variables from design tokens
   - Custom spacing and sizing scales
   - Animation utilities

3. **Component Patterns**
   - Radix UI primitives for unstyled base
   - CVA for variant management
   - Tailwind for styling
   - framer-motion for animations

### Class Merging Utility

The `cn()` helper (in `apps/web/lib/utils.ts`) safely merges Tailwind classes:
```typescript
cn('px-2 py-1', 'px-4')  // Result: 'px-4 py-1'
```

## Animation Strategy

**Framework Decision:**
- **Motion (framer-motion)**: Component-level animations, transitions, gestures
- **GSAP**: Reserved for complex timeline-based animations
- **Tailwind**: Static animations, hover states

**Animation Patterns:**
- Page transitions: framer-motion layoutId
- Component entrance: staggered children animations
- Interactive feedback: gesture-triggered animations
- Content reveals: scroll-triggered or zone-based

## Development Workflow

### Code Organization

**By Feature:**
- Related components, hooks, styles, and types live together
- Shared code goes to `@repo/ui` or utility files
- App-specific code stays in `apps/web`

**File Naming:**
- Components: PascalCase (Button.tsx)
- Hooks: camelCase with use prefix (useZoneInteraction.ts)
- Utilities: camelCase (cn.ts, auth-client.ts)
- Types: PascalCase in types/ folder or co-located

### Code Quality Standards

1. **Type Safety**: Full TypeScript coverage, no `any` types
2. **Linting**: ESLint with max warnings: 0
3. **Formatting**: Prettier with import sorting and Tailwind sorting
4. **Dead Code**: Knip checks during build
5. **Testing**: Component and integration tests (Jest/Vitest)

### Git Workflow

**Branching:**
- Feature branches: `feat/feature-name`
- Bug fixes: `fix/bug-description`
- Docs: `docs/documentation-topic`
- Hotfixes: `hotfix/critical-issue`

**Commits:**
- Atomic commits per logical change
- Conventional commit format: `type(scope): description`
- Trailers for nightshift tasks: `Nightshift-Task: id`, `Nightshift-Ref: url`

**PR Process:**
- Linked to issues via GitHub automation
- Code review required before merge
- Tests must pass
- Linting must pass (0 warnings)

## Performance Considerations

### Build Optimization

- Turbopack for faster development builds
- Monorepo root reference in Turbo config for proper dependency resolution
- Knip dead code elimination pre-build

### Runtime Optimization

- Image optimization via Next.js
- Code splitting and lazy loading
- CSS-in-JS with Tailwind (utility-first, minimal overhead)
- Three.js asset optimization (LOD, culling in post-processing)

## Environment Configuration

**Development Requirements:**
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/kiban
BETTER_AUTH_SECRET=<32+ char secret>
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=<google oauth id>
GOOGLE_CLIENT_SECRET=<google oauth secret>
```

**Key Env Vars:**
- `DATABASE_URL`: PostgreSQL connection string
- `BETTER_AUTH_SECRET`: JWT signing key (production: strong random)
- `BETTER_AUTH_URL`: Origin URL for auth (server)
- `NEXT_PUBLIC_*`: Exposed to browser, use carefully

## Documentation Structure

- `ARCHITECTURE.md` - This file, system design overview
- `DEVELOPMENT.md` - Local setup and development workflow
- `CONTRIBUTING.md` - Code standards and PR process
- `packages/db/README.md` - Database schema and migrations
- `packages/ui/COMPONENTS.md` - Component library catalog
- `apps/web/THREE.md` - 3D scene setup and GLB pipeline
- `apps/web/ANIMATIONS.md` - Animation patterns and decisions
- `apps/web/CONTENT.md` - Content structures and zone system
- `docs/DESIGN_TOKENS.md` - Design system and tokens
- `docs/plans/` - Technical decision documents

## Related Documentation

See DEVELOPMENT.md for local setup instructions, CONTRIBUTING.md for code standards, and docs/plans/ for detailed architecture decisions.
