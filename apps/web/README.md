# Kiban Web Application

The main Next.js application featuring 3D office exploration, zone interactions, and authentication.

## Overview

This Next.js 16 application provides:
- **3D Office Scene**: Interactive Three.js environment with Rapier physics
- **Zone System**: Click zones to view location content
- **User Authentication**: Google OAuth and email/password via Better Auth
- **Responsive UI**: Mobile-friendly interface with Tailwind CSS

## Getting Started

### Quick Start

```bash
# From project root
bun dev

# Or run only this app (faster)
bun dev --filter=web

# Open http://localhost:3000
```

### Environment Setup

Copy environment template:
```bash
cp .env.example .env.local
```

Required variables:
```bash
DATABASE_URL="postgresql://..."
BETTER_AUTH_SECRET="your-secret-32-chars-or-more"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-secret"
```

## Project Structure

```
apps/web/
├── app/                           # Next.js App Router
│   ├── api/
│   │   └── auth/[...all]/         # Better Auth endpoints
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Landing page (/)
│   └── office/
│       └── page.tsx               # Office scene (/office)
│
├── components/
│   ├── office-scene.tsx           # Main 3D scene
│   ├── zone-trigger.tsx           # Collision zone trigger
│   ├── zone-panel.tsx             # Content display panel
│   └── [other components]/
│
├── hooks/
│   └── use-zone-interaction.ts    # Zone state management
│
├── lib/
│   ├── auth.ts                    # Server-side auth config
│   ├── auth-client.ts             # Client-side auth hooks
│   ├── utils.ts                   # Helper functions (cn, etc)
│   └── [other utilities]/
│
├── data/
│   ├── zones.json                 # Zone definitions
│   └── landing.json               # Landing page content
│
├── public/
│   └── three/                     # 3D GLB models (Git LFS)
│
├── .env.example                   # Environment variables template
├── package.json
└── README.md
```

## Key Features

### 3D Office Scene (`/office`)

Interactive 3D exploration with:
- **Three.js** rendering with @react-three/fiber
- **Rapier Physics** for collision detection
- **Zone Triggers** that display content when entered
- **Keyboard Controls** for player movement (WASD)
- **Post-processing Effects** (optional bloom, tone mapping)

**Scene Components:**
- `OfficeScene.tsx` - Main scene setup
- `OfficeEnvironment.tsx` - GLB model loader
- `Player.tsx` - Player control and physics
- `ZoneTrigger.tsx` - Collision trigger volumes
- `ZonePanel.tsx` - Content display UI

### Authentication

**Features:**
- Google OAuth sign-in with automatic account creation
- Email/password sign-up and login
- Session management with secure cookies
- User profile information stored in database

**Configuration:**
- `lib/auth.ts` - Server-side auth setup with Better Auth
- `lib/auth-client.ts` - Client-side hooks for auth state
- `app/api/auth/[...all]/route.ts` - Auth endpoints
- Database tables: users, sessions, accounts, verifications

### Zone Interaction System

**How It Works:**
1. Player enters 3D scene
2. Collision with zone trigger volume detected
3. Zone content loaded and displayed in side panel
4. Content persists until entering different zone

**Data Structure:**
- Zones defined in `data/zones.json`
- Type definition in `types/zones.ts`
- Hook: `use-zone-interaction.ts` manages state
- See [CONTENT.md](CONTENT.md) for detailed documentation

### Landing Page

Home page at `/` with:
- Hero section with call-to-action
- Feature highlights
- Links to 3D office
- Responsive mobile design

Content configurable in `data/landing.json`

## API Routes

### Authentication Endpoints

```
POST   /api/auth/sign-in        - Sign in with credentials
POST   /api/auth/sign-up        - Create new account
POST   /api/auth/sign-out       - Sign out current user
POST   /api/auth/oauth/*        - OAuth provider endpoints
GET    /api/auth/session        - Get current session
```

Handled by Better Auth - see `lib/auth.ts`

### Custom API Routes

Add new routes in `app/api/`:

```typescript
// app/api/zones/route.ts
export async function GET() {
  return Response.json({ zones: [...] })
}
```

## Development Commands

```bash
# Type checking
bun run check-types

# Linting
bun run lint

# Formatting
bun run format

# Dead code detection
bun run knip:unused

# Build
bun run build
```

## Database Integration

This app uses `@repo/db` for database access:

```typescript
import { db } from '@repo/db'

// Query users
const users = await db.query.users.findMany()

// Create session
await db.insert(sessions).values({...})
```

See [packages/db/README.md](../../packages/db/README.md) for database documentation.

## Component Library

Uses `@repo/ui` for shared components:

```tsx
import { Button, Card, Input } from '@repo/ui'

<Card>
  <Input type="email" />
  <Button variant="primary">Submit</Button>
</Card>
```

See [packages/ui/COMPONENTS.md](../../packages/ui/COMPONENTS.md) for component catalog.

## Styling

**Tailwind CSS v4** with custom configuration:
- Custom color palette from design tokens
- Responsive breakpoints (sm, md, lg, xl, 2xl)
- Custom spacing and sizing scales
- Animation utilities

**Key Utilities:**
- `cn()` in `lib/utils.ts` - Merge Tailwind classes
- CVA for component variants
- Motion for animations

## 3D Assets

GLB models stored in `public/three/`:
- `office.glb` - Main environment
- `logo.glb` - Logo/brand element
- Other models as needed

**Git LFS:** Large files tracked with Git LFS. Install with:
```bash
git lfs install
git lfs pull
```

## Testing

Currently no tests configured. To add:

1. Install Jest or Vitest
2. Create `.test.tsx` files
3. Run `bun test`

Example test:
```typescript
import { render, screen } from '@testing-library/react'
import { Home } from './page'

describe('Home page', () => {
  it('renders heading', () => {
    render(<Home />)
    expect(screen.getByRole('heading')).toBeInTheDocument()
  })
})
```

## Performance

### Optimization Techniques

1. **Next.js Image**: Use `next/image` for automatic optimization
2. **Code Splitting**: Components lazy load via dynamic imports
3. **CSS**: Tailwind tree-shaking removes unused styles
4. **3D**: GLB models optimized, LOD systems for distance
5. **Caching**: HTTP caching headers for static assets

### Monitoring

- Chrome DevTools Lighthouse for performance scores
- Vercel Analytics for production metrics
- React DevTools for component profiling

## Security

- **Environment variables** never logged or exposed
- **Authentication** handled by Better Auth (production-ready)
- **Database queries** use parameterized statements (Drizzle ORM)
- **CORS** configured for same-origin requests
- **CSP** headers configured in Next.js

See [CONTRIBUTING.md](../../CONTRIBUTING.md#security-practices) for detailed security practices.

## Deployment

### Vercel Deployment (Recommended)

```bash
# Push to GitHub
git push origin main

# Vercel automatically deploys
# Production: https://kiban.vercel.app
```

### Manual Deployment

```bash
# Build
bun run build

# Start server
bun start

# Server runs on http://localhost:3000
```

## Troubleshooting

### 3D Scene Not Loading
- Check browser console for errors
- Verify GLB files are downloaded (git lfs pull)
- Ensure WebGL is supported in browser
- Check GPU acceleration is enabled

### Authentication Failing
- Verify env vars in .env.local
- Check Google OAuth credentials
- Database connection working?
- Check browser console for auth errors

### Database Connection Error
- PostgreSQL running? (Docker or local)
- DATABASE_URL correct?
- Network connectivity to database host?
- Try direct psql connection: `psql $DATABASE_URL`

### Performance Issues
- Disable post-processing effects
- Use Lighthouse to identify bottlenecks
- Check Network tab for large assets
- Profile with React DevTools

## Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Better Auth](https://www.better-auth.com/docs)

## Related Documentation

- [ARCHITECTURE.md](../../ARCHITECTURE.md) - System design
- [DEVELOPMENT.md](../../DEVELOPMENT.md) - Local setup
- [CONTRIBUTING.md](../../CONTRIBUTING.md) - Code standards
- [THREE.md](THREE.md) - 3D scene details
- [ANIMATIONS.md](ANIMATIONS.md) - Animation patterns
- [CONTENT.md](CONTENT.md) - Zone system
- [../../docs/DESIGN_TOKENS.md](../../docs/DESIGN_TOKENS.md) - Design tokens

---

**Next:** Check out [DEVELOPMENT.md](../../DEVELOPMENT.md) for extended setup instructions.
