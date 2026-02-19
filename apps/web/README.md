# Kiban Web

Main Next.js application for the Kiban monorepo. Features 3D scenes with Three.js, Better Auth authentication, and a comprehensive component library.

## Development

From the monorepo root:

```bash
# Start the web app (recommended)
bun dev

# Or start only this app
turbo dev --filter=web
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Features

### 3D Scenes

Built with @react-three/fiber and related libraries:

- **Office Scene** (`/office`): Interactive 3D office with physics, collision detection, and player movement
- **Landing Page**: 3D elements integrated into the main page

GLB models are stored in `public/three/` (office.glb, logo.glb).

### Authentication

Better Auth handles user authentication:

- **Server config**: `lib/auth.ts`
- **Client hooks**: `lib/auth-client.ts`
- **API routes**: `app/api/auth/[...all]/route.ts`

Supports Google OAuth and email/password authentication.

### Styling

- Tailwind CSS v4 with PostCSS
- Component variants via CVA
- `cn()` utility in `lib/utils.ts` for class merging
- Custom fonts in `app/fonts/`

## Project Structure

```
app/
  api/auth/        # Better Auth API routes
  office/          # 3D office scene page
  page.tsx         # Landing page
components/        # App-specific components
  office-scene.tsx # Main 3D scene
lib/
  auth.ts          # Better Auth server config
  auth-client.ts   # Better Auth client hooks
  utils.ts         # Utility functions (cn, etc.)
public/
  three/           # GLB models and 3D assets
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
DATABASE_URL="postgresql://..."
BETTER_AUTH_SECRET="your-secret-key-min-32-chars"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## Using Shared Packages

Import from workspace packages:

```tsx
// Components from @repo/ui
import { Button } from "@repo/ui/button";
import { cn } from "@repo/ui/utils";

// Database access from @repo/db
import { db } from "@repo/db";
import { user } from "@repo/db/schema";
```

## Configuration

- **Turbopack**: Enabled with monorepo root set to `../../` for proper workspace resolution
- **PostCSS**: Configured for Tailwind CSS v4
- **TypeScript**: Extends `@repo/typescript-config/nextjs.json`
