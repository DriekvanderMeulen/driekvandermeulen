# Kiban Web Application

The main Next.js 16 application featuring immersive 3D scenes, authentication, and a modern React 19 architecture.

## Overview

This is a web application built with:

- **Next.js 16** with App Router and Turbopack
- **React 19** with the latest features
- **Three.js** for 3D scenes (via @react-three/fiber)
- **Better Auth** for authentication
- **Tailwind CSS 4** for styling

## Getting Started

### Prerequisites

Ensure you have the monorepo dependencies installed from the root:

```bash
cd ../..
bun install
```

### Environment Setup

Create a `.env` file with the required variables:

```bash
cp .env.example .env
```

Required variables:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/kiban"
BETTER_AUTH_SECRET="your-secret-key-here-min-32-chars"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### Running the Application

From the monorepo root:

```bash
bun dev
```

Or target this app specifically:

```bash
turbo dev --filter=web
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Directory Structure

```
app/
├── api/
│   └── auth/[...all]/    # Better Auth API routes
├── fonts/                 # Custom fonts
├── office/               # 3D office scene page
├── v2/                   # Version 2 page
├── globals.css           # Global styles
├── layout.tsx            # Root layout
└── page.tsx              # Landing page

components/
├── office-scene.tsx      # Main 3D office scene
└── ...                   # Additional components

lib/
├── auth.ts               # Better Auth server config
├── auth-client.ts        # Better Auth client hooks
└── utils.ts              # Utility functions (cn helper)

public/
└── three/                # 3D assets (GLB models)
    ├── office.glb
    └── logo.glb
```

## Key Features

### 3D Scenes

The application includes interactive 3D scenes built with:

- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers and abstractions
- **@react-three/rapier** - Physics engine integration
- **@react-three/postprocessing** - Visual effects

The main 3D scene is at `/office` featuring:

- Collision detection
- Physics simulation
- Camera controls
- Player movement

### Authentication

Authentication is handled by Better Auth with:

- Session management
- Google OAuth integration
- Drizzle ORM adapter for PostgreSQL

**Server-side:**

```typescript
import { auth } from '@/lib/auth'
```

**Client-side:**

```typescript
import { useSession } from '@/lib/auth-client'
```

### Styling

- **Tailwind CSS 4** with PostCSS
- **Motion** (framer-motion v12) for animations
- Components from `@repo/ui` package
- Utility function `cn()` for class merging

## Scripts

| Script                | Description                           |
| --------------------- | ------------------------------------- |
| `bun dev`             | Start development server on port 3000 |
| `bun run build`       | Build for production                  |
| `bun start`           | Start production server               |
| `bun run lint`        | Run ESLint                            |
| `bun run check-types` | TypeScript type checking              |

## Dependencies

This app uses workspace dependencies:

- `@repo/db` - Database layer
- `@repo/ui` - Component library
- `@repo/eslint-config` - ESLint configuration
- `@repo/typescript-config` - TypeScript configuration
