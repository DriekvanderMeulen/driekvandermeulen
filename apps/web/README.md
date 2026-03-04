# Kiban Web App

Main Next.js 16 application for Kiban. Features interactive 3D environments, zone-based interactions, authentication, and responsive design.

## Overview

This is the primary user-facing application built with:

- **Next.js 16** - Server-side rendering and API routes
- **React 19** - Component framework
- **Three.js** - 3D graphics and interactions
- **Tailwind CSS v4** - Styling
- **TypeScript** - Type safety
- **Better Auth** - Authentication

## Quick Start

From repository root:

```bash
# Install dependencies
bun install

# Set up environment variables (see .env.example)
cp .env.example .env.local

# Initialize database (from packages/db)
cd packages/db
bun run migrate
cd ../../

# Start development server
bun dev

# Open http://localhost:3000
```

## Directory Structure

```
apps/web/
├── app/                        # Next.js app directory
│   ├── page.tsx               # Landing page (/)
│   ├── office/
│   │   └── page.tsx           # 3D office scene (/office)
│   ├── api/
│   │   └── auth/              # Authentication API
│   ├── layout.tsx             # Root layout
│   ├── globals.css            # Global styles
│   └── fonts/                 # Custom fonts
├── components/
│   ├── office-scene.tsx       # Main 3D scene
│   ├── v2/                    # V2 components
│   └── [other-components]
├── hooks/
│   └── use-zone-interaction.ts # Zone state management
├── lib/
│   ├── auth.ts                # Server auth config
│   ├── auth-client.ts         # Client auth instance
│   ├── utils.ts               # Utility functions (cn)
│   └── content-parser.ts      # Content utilities
├── types/
│   └── zones.ts               # Zone TypeScript types
├── data/
│   ├── zones.json             # Zone definitions
│   └── landing.json           # Landing page content
├── public/
│   └── three/                 # 3D models (GLB files)
│       ├── office.glb
│       └── logo.glb
├── .env.example              # Environment variables template
├── next.config.js            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## Key Features

### 3D Environments
- Interactive office scene with player movement
- Physics simulation via Rapier
- Collision detection for zone triggers
- First-person camera controls
- Multiple 3D models via GLB assets

See [THREE.md](./THREE.md) for detailed guide.

### Zone System
- Player enters zones on collision
- Zone metadata triggers content display
- Content persists until entering new zone
- Defined in `data/zones.json`

See [CONTENT.md](./CONTENT.md) for detailed guide.

### Animations
- Motion (Framer Motion v12) for UI animations
- GPU-accelerated transforms
- Spring animations for natural feel
- Gesture support (hover, tap, drag)

See [ANIMATIONS.md](./ANIMATIONS.md) for detailed guide.

### Authentication
- Better Auth integration
- Google OAuth login
- Session management via PostgreSQL
- Type-safe auth hooks

See [ARCHITECTURE.md](../../ARCHITECTURE.md) for auth details.

## Development

### Running Dev Server

```bash
# All apps
bun dev

# Web app only
bun dev --filter=web
```

Server runs on http://localhost:3000 with hot reload.

### Environment Variables

Create `.env.local`:

```bash
# Database (required)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/kiban"

# Authentication (required for login)
BETTER_AUTH_SECRET="your-secret-key-min-32-characters"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth (optional for local dev)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### Code Quality

```bash
# Type checking
bun run check-types

# Linting
bun run lint

# Formatting
bun run format

# Dead code detection
bun run knip
```

### Building

```bash
# Build for production
bun run build

# Preview production build
bun run start
```

## Project Components

### Pages

**Landing Page** (`app/page.tsx`)
- Hero section with CTA
- Feature highlights
- Marketing content from `data/landing.json`
- Responsive design

**Office Scene** (`app/office/page.tsx`)
- 3D interactive environment
- Player movement and controls
- Zone-based content display
- Full-screen canvas

### Components

**OfficeScene** (`components/office-scene.tsx`)
- Three.js Canvas setup
- Physics world (Rapier)
- 3D models loading
- Camera controller
- Zone triggers

**ZoneDisplay** (in page/component)
- Displays current zone content
- Updates on zone entry
- Renders CTA buttons

### Hooks

**useZoneInteraction** (`hooks/use-zone-interaction.ts`)
- Manages zone state
- Loads zones.json metadata
- Handles zone entry/exit
- Provides displayedZone state

### Utilities

**cn()** (`lib/utils.ts`)
- Merges CSS classes with conflict resolution
- Essential for component styling
- Works with Tailwind and CVA

**authClient** (`lib/auth-client.ts`)
- Client-side auth instance
- Hooks for login, signup, logout
- Session management

## Styling

### Tailwind CSS v4

Global styles in `app/globals.css`. Configuration in `tailwind.config.ts`.

### Component Styling

Components use Tailwind classes with CVA variants:

```typescript
const buttonVariants = cva('px-4 py-2', {
  variants: {
    variant: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-200 text-black',
    },
  },
})

// Usage
<button className={buttonVariants({ variant: 'primary' })}>
  Click me
</button>
```

### Custom Fonts

Fonts defined in `app/fonts/` and loaded via `next/font`:

```typescript
import { myFont } from '@/app/fonts/my-font'

<div className={myFont.className}>Custom font text</div>
```

## API Routes

### Authentication API

`app/api/auth/[...all]/route.ts`

Handles all Better Auth endpoints:
- `POST /api/auth/sign-in`
- `POST /api/auth/sign-up`
- `POST /api/auth/sign-out`
- `GET /api/auth/session`

## Database Integration

Database queries use Drizzle ORM from `@repo/db`:

```typescript
import { db } from '@repo/db'
import { users } from '@repo/db/schema'
import { eq } from 'drizzle-orm'

// Server component or API route
const user = await db.query.users.findFirst({
  where: eq(users.email, 'user@example.com'),
})
```

See [packages/db/README.md](../../packages/db/README.md) for details.

## Shared Components

This app imports 300+ components from `@repo/ui`:

```typescript
import { Button } from '@repo/ui/button'
import { Card, CardHeader, CardTitle } from '@repo/ui/card'
import { Dialog, DialogContent } from '@repo/ui/dialog'

// All components are pre-styled and accessible
<Button variant="primary">Click me</Button>
```

See [packages/ui/COMPONENTS.md](../../packages/ui/COMPONENTS.md) for catalog.

## Content Management

### zones.json

Defines interactive areas in 3D space:

```json
{
  "zones": [
    {
      "id": "office-entrance",
      "name": "Office Entrance",
      "content": {
        "title": "Welcome",
        "description": "Enter the office",
        "cta": { "text": "Learn More", "href": "/features" }
      }
    }
  ]
}
```

### landing.json

Manages landing page content:

```json
{
  "hero": {
    "title": "Welcome to Kiban",
    "subtitle": "Explore interactive spaces"
  },
  "features": [...]
}
```

See [CONTENT.md](./CONTENT.md) for complete guide.

## Performance Optimization

### Code Splitting
- Automatic route-based splitting in Next.js
- Dynamic imports for heavy libraries
- Image optimization via next/image

### Bundle Size
- Monitor with: `ANALYZE=true bun run build`
- Tree-shaking enabled
- Unused code removed by Knip

### Rendering Performance
- React 19 automatic batching
- Memoization for expensive computations
- LOD (Level of Detail) for 3D models

## Testing

### Unit Tests

Place test files next to source:

```typescript
// components/my-component.test.tsx
import { render, screen } from '@testing-library/react'
import { MyComponent } from './my-component'

describe('MyComponent', () => {
  it('renders', () => {
    render(<MyComponent />)
    expect(screen.getByText(/content/i)).toBeInTheDocument()
  })
})
```

Run tests:

```bash
bun test
bun test --watch
```

## Deployment

### Vercel

Push to GitHub and connect repository to Vercel:

```bash
git push origin feature-branch
# Create PR on GitHub
# Vercel auto-deploys on PR
```

### Environment Variables (Production)

Set in Vercel dashboard:
- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

## Troubleshooting

### 3D Models Not Loading

1. Check model path: `/three/office.glb` (public folder)
2. Verify Git LFS: `git lfs ls-files`
3. Check browser console for errors
4. Ensure model has valid geometry

### Zone Triggers Not Working

1. Verify zone IDs in `data/zones.json`
2. Check physics colliders are set up
3. Ensure `useZoneInteraction` hook is mounted
4. Look for errors in browser console

### Database Connection Error

1. Verify PostgreSQL running
2. Check `DATABASE_URL` in .env.local
3. Run migrations: `cd packages/db && bun run migrate`
4. Clear session data: Reset database

### Type Errors on Import

1. Run: `bun run check-types`
2. Ensure imports use correct paths
3. Check that shared packages are installed
4. Rebuild: `turbo build --force`

## Related Documentation

- [ARCHITECTURE.md](../../ARCHITECTURE.md) - System design
- [DEVELOPMENT.md](../../DEVELOPMENT.md) - Setup and workflow
- [CONTRIBUTING.md](../../CONTRIBUTING.md) - Code standards
- [THREE.md](./THREE.md) - 3D scene guide
- [ANIMATIONS.md](./ANIMATIONS.md) - Animation patterns
- [CONTENT.md](./CONTENT.md) - Content management
- [packages/ui/COMPONENTS.md](../../packages/ui/COMPONENTS.md) - Component library
- [packages/db/README.md](../../packages/db/README.md) - Database guide

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Three.js Documentation](https://threejs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Better Auth](https://www.better-auth.com)
