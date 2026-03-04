# Development Setup and Workflow

Comprehensive guide to setting up a development environment and daily workflow for the Kiban project. Extends the quick reference in CLAUDE.md with detailed instructions.

## Prerequisites

### System Requirements

- **Node.js**: 18.17+ (or use Bun)
- **Bun**: 1.2.20+ (recommended package manager)
- **Git**: 2.30+
- **PostgreSQL**: 13+ (for local development)
- **RAM**: 4GB minimum (8GB recommended)
- **Disk**: 2GB free space

### Package Manager

This project uses **Bun** exclusively. Do not use npm, yarn, or pnpm.

```bash
# Install Bun (if needed)
curl -fsSL https://bun.sh/install | bash

# Verify installation
bun --version  # Should be 1.2.20+
```

## Project Structure Overview

```
kiban/
├── apps/
│   └── web/                # Main Next.js application
│       ├── app/            # Next.js app directory
│       ├── components/     # React components
│       ├── hooks/          # Custom React hooks
│       ├── lib/            # Utilities and helpers
│       ├── public/         # Static assets
│       ├── data/           # Content (JSON files)
│       └── .env.local      # Local environment variables
├── packages/
│   ├── db/                 # Drizzle ORM database layer
│   │   ├── src/
│   │   ├── migrations/     # Database migrations
│   │   └── .env            # Database configuration
│   ├── ui/                 # Component library (300+ components)
│   ├── eslint-config/      # Shared ESLint rules
│   ├── typescript-config/  # Shared TypeScript config
│   └── brand/              # Design tokens and assets
├── docs/                   # Documentation and design specs
├── .worktrees/             # Git worktrees (ignored by git)
└── turbo.json             # Turborepo configuration
```

## Initial Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-org/kiban.git
cd kiban
```

### 2. Install Dependencies

```bash
bun install
```

This installs all packages across the monorepo.

### 3. Set Up Environment Variables

**PostgreSQL Setup (Local)**

Start a local PostgreSQL instance:

```bash
# Using Docker (recommended)
docker run --name kiban-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=kiban \
  -p 5432:5432 \
  -d postgres:16
```

Or use Homebrew on macOS:

```bash
brew install postgresql
brew services start postgresql
createdb kiban
```

**Configure Environment Variables**

Create `packages/db/.env`:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/kiban"
```

Create `apps/web/.env.local`:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/kiban"
BETTER_AUTH_SECRET="your-secret-key-here-min-32-characters"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

**Note**: For local development, you can use dummy values for Google OAuth. It's only needed if testing Google login.

### 4. Initialize Database

From the repository root:

```bash
cd packages/db
bun run generate   # Create migrations from schema
bun run migrate    # Apply migrations
cd ../..           # Return to root
```

Or use the shortcut from root:

```bash
bun run --cwd packages/db migrate
```

### 5. Start Development Server

```bash
bun dev
```

This starts all apps and packages in watch mode:
- **Web app**: http://localhost:3000
- **Database**: PostgreSQL on localhost:5432

Access the application at http://localhost:3000.

## Daily Development

### Starting Dev Server

```bash
bun dev
```

Starts development servers for all apps. Changes are hot-reloaded automatically.

### Project-Specific Development

Work on specific packages to improve build speed:

```bash
# Web app only
bun dev --filter=web

# Database scripts only
bun dev --filter=db

# Multiple packages
bun dev --filter=web --filter=ui
```

### Running Checks

Before committing:

```bash
# Type checking
bun run check-types

# Linting
bun run lint

# Formatting (auto-fixes)
bun run format

# Check for dead code
bun run knip
```

Or run everything at once:

```bash
bun run check-types && bun run lint && bun run format && bun run knip
```

### Building for Production

```bash
bun run build
```

This:
1. Cleans previous builds
2. Auto-formats code
3. Checks types
4. Runs knip (dead code check)
5. Builds all packages

Build output goes to `.next/` and `dist/` directories.

## Database Development

### Database Schema Management

Schema is defined in `packages/db/src/schema.ts`. After modifying:

```bash
cd packages/db

# Generate migration from schema changes
bun run generate

# Apply migration to database
bun run migrate

# Or push schema directly (development only - overwrites)
bun run push
```

### Viewing Database

**Using Drizzle Studio** (GUI)

```bash
cd packages/db
bun run studio
```

Opens http://localhost:3001 with an interactive database browser.

**Using psql** (CLI)

```bash
psql postgresql://postgres:postgres@localhost:5432/kiban

# View tables
\dt

# View schema for table
\d+ users

# Query
SELECT * FROM users LIMIT 10;
```

### Resetting Database

Start fresh with a clean database:

```bash
# Drop and recreate database
psql -U postgres -c "DROP DATABASE IF EXISTS kiban; CREATE DATABASE kiban;"

# Re-apply migrations
cd packages/db
bun run migrate
```

## Git Workflow

### Creating a Feature Branch

```bash
# Update main
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/short-description
```

### Commit Changes

```bash
# Stage files
git add apps/web/components/my-component.tsx

# Commit with message
git commit -m "feat: add new zone interaction"

# Or use interactive staging
git add -p
```

### Using Git Worktrees (Optional)

For feature isolation:

```bash
# Create worktree
git worktree add .worktrees/my-feature feature/my-feature

# Switch to worktree directory
cd .worktrees/my-feature

# Work normally, changes are isolated

# Remove worktree
cd ../..
git worktree remove .worktrees/my-feature
```

### Opening a Pull Request

```bash
# Push branch
git push origin feature/my-feature

# Create PR via GitHub CLI
gh pr create --title "Add zone interactions" \
  --body "Implements zone-based content display"
```

## Testing

### Running Tests

```bash
# Run all tests
bun test

# Watch mode
bun test --watch

# Specific file
bun test apps/web/components/button.test.tsx
```

### Writing Tests

Place test files next to source files:

```
components/
├── my-component.tsx
└── my-component.test.tsx
```

Example test:

```typescript
import { render, screen } from '@testing-library/react'
import { MyComponent } from './my-component'

describe('MyComponent', () => {
  it('renders with title', () => {
    render(<MyComponent title="Test" />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
```

## Performance & Debugging

### Performance Profiling

**Bundle Analysis**

```bash
# Analyze Next.js bundle
ANALYZE=true bun run build --filter=web

# Opens bundle visualization
```

**DevTools**

- Open http://localhost:3000
- Press F12 for DevTools
- Use Network tab to check asset sizes
- Use Performance tab for rendering analysis

### Debugging

**Server-Side (Node.js)**

```bash
# Add debugger statement in code
debugger

# Run with inspector
bun --inspect-brk dev

# Open chrome://inspect to debug
```

**Client-Side (React)**

```typescript
import { useState } from 'react'

export function MyComponent() {
  const [count, setCount] = useState(0)

  console.log('Current count:', count) // View in console

  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

### Checking Bundle Size

```bash
# Install size analyzer
bun add -D @next/bundle-analyzer

# Use in next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)

# Analyze
ANALYZE=true bun run build
```

## Troubleshooting

### Module Not Found

```
error: Cannot find module '@/components/my-component'
```

**Solution**:
1. Check file exists: `ls apps/web/components/my-component.tsx`
2. Verify export: `export default ...` or `export { ... }`
3. Check import path matches file location
4. Restart dev server: `Ctrl+C`, `bun dev`

### Type Errors

```
error: Property 'foo' does not exist on type 'Bar'
```

**Solution**:
1. Run `bun run check-types` to see all errors
2. Check TypeScript definitions are correct
3. Verify imports are typed properly
4. Use `// @ts-expect-error` only as last resort

### Database Connection Error

```
error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution**:
1. Verify PostgreSQL is running: `psql -U postgres`
2. Check DATABASE_URL is correct
3. Restart PostgreSQL:
   ```bash
   # Docker
   docker restart kiban-postgres

   # Homebrew
   brew services restart postgresql
   ```

### Out of Memory

```
JavaScript heap out of memory
```

**Solution**:
1. Increase Node memory: `NODE_OPTIONS="--max-old-space-size=4096" bun dev`
2. Check for memory leaks in components
3. Use `bun install` instead of `bun i` for full install

### Slow Build

**Solution**:
1. Build only what changed: `turbo build --filter=web`
2. Clear cache: `turbo prune --docker --scope=web`
3. Check for large dependencies: `bun pm ls`
4. Profile build: `turbo build --profile`

## Documentation

### Local Documentation

View these files for guidance:
- **ARCHITECTURE.md** - System design
- **CONTRIBUTING.md** - Code standards
- **packages/db/README.md** - Database guide
- **packages/ui/COMPONENTS.md** - Component catalog
- **apps/web/THREE.md** - 3D scene guide
- **apps/web/ANIMATIONS.md** - Animation patterns
- **apps/web/CONTENT.md** - Content management

### Updating Documentation

When you change code, update related documentation:

```bash
# After adding new component to UI library
# Update packages/ui/COMPONENTS.md with usage example

# After modifying database schema
# Update packages/db/README.md with new fields

# After changing animation patterns
# Update apps/web/ANIMATIONS.md with examples
```

## Useful Commands Summary

```bash
# Development
bun dev                      # Start all dev servers
bun dev --filter=web         # Start web only

# Building
bun run build               # Build all packages
turbo build --filter=web    # Build web only

# Code Quality
bun run check-types         # Type check
bun run lint                # Lint check
bun run format              # Auto-format
bun run knip                # Dead code check

# Database
cd packages/db
bun run generate            # Create migrations
bun run migrate             # Apply migrations
bun run push                # Push schema (dev only)
bun run studio              # Open Drizzle Studio

# Testing
bun test                    # Run tests
bun test --watch            # Watch mode

# Git
git checkout -b feature/name # Create branch
git add .                   # Stage changes
git commit -m "message"     # Commit
git push origin feature/name # Push

# Cleanup
rm -rf node_modules         # Remove dependencies
bun install                 # Reinstall everything
rm -rf .turbo               # Clear Turbo cache
```

## Related Documentation

- **CONTRIBUTING.md** - Code standards and PR process
- **ARCHITECTURE.md** - System design overview
- **CLAUDE.md** - AI assistant guidelines
- **packages/db/README.md** - Database specifics
