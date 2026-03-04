# Development Setup Guide

Extended local setup instructions, debugging, and development environment configuration for Kiban.

## System Requirements

- **Node.js**: 18.17 or higher
- **Bun**: 1.2.20 or higher
- **PostgreSQL**: 14 or higher
- **Git**: 2.39 or higher (with LFS support)
- **OS**: macOS, Linux, or Windows (WSL2)

## Initial Setup

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/kiban.git
cd kiban
```

### 2. Install Bun

If you don't have Bun installed:

```bash
# macOS/Linux
curl -fsSL https://bun.sh/install | bash

# Windows
powershell -c "$(curl -fsSL https://bun.sh/install.ps1)"

# Verify installation
bun --version
# Should output: 1.2.20 or higher
```

### 3. Install Git LFS

Large binary files (GLB models) use Git LFS:

```bash
# macOS
brew install git-lfs

# Linux (Ubuntu/Debian)
sudo apt-get install git-lfs

# Windows
choco install git-lfs

# Initialize LFS
git lfs install
```

### 4. Install Project Dependencies

```bash
bun install
```

This installs dependencies for:
- `apps/web` - Main application
- `packages/db` - Database layer
- `packages/ui` - Component library
- All shared configurations

### 5. Environment Configuration

Copy environment templates and configure:

```bash
# Web app configuration
cp apps/web/.env.example apps/web/.env.local

# Database configuration
cp packages/db/.env.example packages/db/.env.local
```

**Required Environment Variables:**

```bash
# apps/web/.env.local

# Database connection
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/kiban"

# Authentication (generate a strong secret, min 32 chars)
BETTER_AUTH_SECRET="your-random-secret-here-at-least-32-characters-long"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth (get from Google Cloud Console)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

```bash
# packages/db/.env.local

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/kiban"
```

### 6. PostgreSQL Setup

**Option A: Docker (Recommended)**

```bash
# Start PostgreSQL container
docker run -d \
  --name kiban-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=kiban \
  -p 5432:5432 \
  postgres:16-alpine

# Container will persist data in Docker volume
```

**Option B: Local PostgreSQL Installation**

```bash
# macOS
brew install postgresql

# Start PostgreSQL service
brew services start postgresql

# Create database
createdb -U postgres kiban

# Verify connection
psql -U postgres -d kiban -c "SELECT 1"
```

**Option C: Cloud Database (Development)**

Use a cloud provider like Vercel PostgreSQL or Supabase:

```bash
# Update DATABASE_URL in .env.local
DATABASE_URL="postgresql://user:password@host:5432/kiban"
```

### 7. Database Migration

Apply initial schema:

```bash
cd packages/db
bun run migrate

# Verify migration
bun run studio  # Opens Drizzle Studio at http://localhost:3001
```

### 8. Start Development Server

```bash
# From project root
bun dev

# Opens http://localhost:3000
```

**What This Starts:**
- Next.js dev server (port 3000)
- Turbopack for fast rebuilds
- Hot module reloading
- API routes in `/app/api`

### 9. Verify Setup

Visit http://localhost:3000 and verify:
- Landing page loads
- No console errors
- `/office` page accessible
- 3D scene renders (if GLB assets loaded)

## Google OAuth Setup (Optional but Recommended)

To enable social authentication:

1. **Create Google OAuth Credentials:**
   - Go to https://console.cloud.google.com/
   - Create new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials (Web application)
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google`
     - Your production domain

2. **Update Environment Variables:**
   ```bash
   GOOGLE_CLIENT_ID="xxx.apps.googleusercontent.com"
   GOOGLE_CLIENT_SECRET="xxxxx"
   ```

3. **Test:**
   - Visit http://localhost:3000
   - Click "Sign in with Google" (if auth UI implemented)
   - Verify callback and session creation

## Common Development Tasks

### Running Specific App

```bash
# Run only the web app (faster)
bun dev --filter=web

# Run only the database
cd packages/db
bun run studio  # Opens Drizzle Studio
```

### Type Checking

```bash
# Check all workspaces
bun run check-types

# Fails if any TypeScript errors exist
```

### Linting

```bash
# Check all workspaces
bun run lint

# Fix auto-fixable issues
bun run lint -- --fix

# Must have 0 warnings
```

### Code Formatting

```bash
# Format all code
bun run format

# Checks are run automatically during build
```

### Dead Code Detection

```bash
# Generate unused code report
bun run knip:unused

# View report
open knip-report.json
```

### Building for Production

```bash
# Build all apps and packages
bun run build

# Runs: format, type-check, knip checks, then builds
# Fails if any check fails (0 warnings policy)
```

## Database Tasks

### Creating New Tables

1. **Edit schema:**
   ```bash
   vi packages/db/src/schema.ts
   ```

2. **Generate migration:**
   ```bash
   cd packages/db
   bun run generate
   ```
   Creates file in `packages/db/migrations/`

3. **Review migration:**
   ```bash
   cat migrations/YYYYMMDDHHMMSS_table_name.sql
   ```

4. **Run migration:**
   ```bash
   bun run migrate
   ```

5. **Verify:**
   ```bash
   bun run studio  # Check in Drizzle Studio
   ```

### Modifying Existing Tables

Same process as creating tables - Drizzle generates ALTER statements.

### Resetting Database

```bash
# ⚠️ WARNING: Deletes all data

# Drop all tables
bun run migrate:reset

# Reapply all migrations
bun run migrate
```

### Viewing Database

```bash
cd packages/db
bun run studio

# Opens http://localhost:3001
# Browse tables, run queries, edit records
```

## Debugging

### Browser DevTools

1. Open http://localhost:3000
2. Right-click → Inspect (or F12)
3. Check Console tab for errors
4. Use Sources tab for breakpoints
5. Use Network tab for API calls

### React DevTools

```bash
# Install browser extension
# Chrome: React Developer Tools
# Firefox: React Developer Tools

# Inspect component tree, props, hooks
```

### Next.js Debug Mode

```bash
# Start with debugging enabled
NODE_OPTIONS='--inspect' bun dev

# Connect Chrome: chrome://inspect
```

### Database Queries

```bash
# View actual SQL in Drizzle Studio
cd packages/db
bun run studio

# Or log queries in code:
console.log(db.select().from(users).toSQL())
```

### Three.js Debugging

Add debug helpers to scene:

```tsx
import { GridHelper, AxesHelper } from 'three'

<Canvas>
  <gridHelper args={[100, 100]} />
  <axesHelper args={[50]} />
  {/* Scene content */}
</Canvas>
```

Enable Rapier debug mode:

```tsx
<Physics debug>
  {/* Shows collision shapes */}
</Physics>
```

### Performance Monitoring

```bash
# Chrome DevTools Performance tab
# 1. Open DevTools (F12)
# 2. Go to Performance tab
# 3. Click record, interact, stop
# 4. Analyze flame graph

# Or use r3f Perf monitor in 3D scenes
<Canvas>
  <Perf />  {/* Shows FPS, memory, etc */}
</Canvas>
```

## File Structure Reference

```
kiban/
├── apps/web/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Landing page
│   │   └── office/            # Office page
│   ├── components/            # React components
│   ├── hooks/                 # Custom hooks
│   ├── lib/                   # Utilities and config
│   │   ├── auth.ts           # Server auth config
│   │   └── auth-client.ts    # Client auth hook
│   ├── data/                  # JSON data files
│   │   ├── zones.json        # Zone definitions
│   │   └── landing.json      # Landing content
│   ├── public/                # Static assets
│   │   └── three/            # 3D models (GLB)
│   └── .env.example          # Template env vars
│
├── packages/
│   ├── db/
│   │   ├── src/
│   │   │   ├── schema.ts     # Database schema
│   │   │   └── index.ts      # DB client export
│   │   ├── migrations/        # SQL migrations
│   │   └── drizzle.config.ts # ORM config
│   │
│   ├── ui/
│   │   ├── src/              # 300+ components
│   │   └── index.tsx         # Component exports
│   │
│   ├── eslint-config/
│   └── typescript-config/
│
├── docs/
│   ├── plans/                 # Design documents
│   └── DESIGN_TOKENS.md      # Design system
│
├── ARCHITECTURE.md            # System design
├── CONTRIBUTING.md            # Code standards
├── DEVELOPMENT.md             # This file
└── CLAUDE.md                  # Project instructions for Claude
```

## Environment-Specific Setup

### Production

```bash
# Set to production
NODE_ENV=production

# Use production database
DATABASE_URL="postgresql://user:pass@prod-host/kiban"

# Generate a strong secret
BETTER_AUTH_SECRET="$(openssl rand -base64 32)"

# Use production auth URL
BETTER_AUTH_URL="https://yourdomain.com"
NEXT_PUBLIC_BETTER_AUTH_URL="https://yourdomain.com"

# Production OAuth credentials from Google Cloud Console
GOOGLE_CLIENT_ID="production-client-id"
GOOGLE_CLIENT_SECRET="production-client-secret"
```

### Staging

Similar to production but with staging domain.

### Local Development (Default)

Already configured in `.env.example` - use localhost URLs and test credentials.

## Troubleshooting

### "Cannot find module @repo/db"

The monorepo workspace isn't installed:
```bash
# From project root
bun install
```

### "DATABASE_URL not found"

Environment variables not loaded:
```bash
# Check .env.local exists
ls apps/web/.env.local

# If missing:
cp apps/web/.env.example apps/web/.env.local
```

### Database connection failed

PostgreSQL not running:
```bash
# Check if running (macOS)
brew services list | grep postgres

# Start if stopped
brew services start postgresql

# Or verify Docker container
docker ps | grep kiban-db
```

### Port 3000 already in use

```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
PORT=3001 bun dev
```

### LFS files not downloading

```bash
# Install LFS globally
git lfs install

# In repo, pull LFS files
git lfs pull

# Verify GLB file size (should be > 1MB)
ls -lh apps/web/public/three/office.glb
```

### Build fails with "unused exports"

Knip found dead code:
```bash
bun run knip:unused  # See report
# Remove or export unused code
```

### Type errors after schema change

Schema types auto-generate but need rebuild:
```bash
# Run migration first
cd packages/db
bun run migrate

# Then type-check from root
bun run check-types
```

## Performance Tips

1. **Incremental Development:**
   - Use `bun dev --filter=web` for faster reloads
   - Don't rebuild everything if only changing one app

2. **Faster Type Checking:**
   - Use VS Code Pylance extension for instant feedback
   - Don't wait for `bun run check-types` before testing

3. **Database Optimization:**
   - Use `bun run studio` instead of CLI for quick edits
   - Cache frequently accessed data

4. **3D Performance:**
   - Disable post-processing effects in dev: `debug={true}`
   - Use lower polygon models while developing
   - Test performance on actual device before shipping

## IDE Setup

### VS Code (Recommended)

**Extensions:**
- TypeScript Vue Plugin (for Vue components if used)
- ESLint - Microsoft
- Prettier - Code formatter
- Tailwind CSS IntelliSense
- Thunder Client (or Postman) for API testing
- Drizzle ORM (unofficial)

**Settings:**
```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### Other IDEs

WebStorm, Vim/Neovim, and Emacs all work. Use Bun's LSP support for type checking.

## Getting Help

- **Architecture questions**: See `ARCHITECTURE.md`
- **Code standards**: See `CONTRIBUTING.md`
- **Component library**: See `packages/ui/COMPONENTS.md`
- **Database**: See `packages/db/README.md`
- **3D/Three.js**: See `apps/web/THREE.md`
- **Animations**: See `apps/web/ANIMATIONS.md`
- **Content/Zones**: See `apps/web/CONTENT.md`

## Next Steps

After setup:

1. Read `ARCHITECTURE.md` to understand system design
2. Check `CONTRIBUTING.md` for code standards
3. Review `apps/web/README.md` for app-specific info
4. Start with a small task or issue
5. Ask questions if stuck!

Welcome to the team! 🎉
