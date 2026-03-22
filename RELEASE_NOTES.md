# Release Notes — Kiban v0.1.0

> First release of the Kiban monorepo, covering all work from the initial commit (`911d8f8`) through `d4a7941` on `main`.

---

## Features

### 3D Office Scene
- Interactive 3D office environment built with React Three Fiber, Drei, and Rapier physics
- Player movement with collision detection and configurable camera controls
- GLB model assets (office, logo) managed via Git LFS
- Loading screen component for scene initialization
- Post-processing effects pipeline

### Authentication
- Better Auth integration with Drizzle ORM adapter
- Google OAuth social login support
- Server-side auth configuration (`lib/auth.ts`) and client-side hooks (`lib/auth-client.ts`)
- Session and user management with dedicated database tables

### Landing Page
- Styled landing page with Three.js elements
- Scroll-velocity and shuffle animation components
- Product showcase section

### Shared Component Library (`@repo/ui`)
- 300+ reusable React components built on Radix UI primitives
- CVA (class-variance-authority) variant system
- Tailwind CSS styling with custom animations

---

## Infrastructure

### Turborepo Monorepo
- Initial scaffolding via `create-turbo`
- Workspace structure: `apps/web`, `packages/db`, `packages/ui`, `packages/eslint-config`, `packages/typescript-config`, `packages/brand`
- Bun 1.2.20 as the package manager

### Next.js & Turbopack
- Next.js 16 with React 19 and Turbopack dev server
- Monorepo root configured for proper workspace dependency resolution

### Code Quality Tooling
- **ESLint**: Shared config in `packages/eslint-config`, strict zero-warning enforcement
- **Prettier**: Tab-based formatting with import sorting (`@trivago/prettier-plugin-sort-imports`) and Tailwind class sorting
- **Knip**: Dead-code and unused-export detection integrated into the build pipeline

### Styling
- Tailwind CSS v4 with PostCSS
- Custom fonts and design tokens in `packages/brand`
- Motion (Framer Motion v12) animation library

---

## Database

- **Drizzle ORM** with PostgreSQL via `postgres-js`
- Schema includes `user`, `session`, `account`, and `verification` tables
- Migration generation (`drizzle-kit generate`) and push workflow
- Drizzle Studio for database inspection

---

## Documentation

- Design plan documents in `docs/plans/` (e.g., navbar Motion animation spec)
- `CLAUDE.md` project instructions for AI-assisted development
- Environment variable templates (`.env.example` files)

---

## Chores

- `.gitignore` updates for build outputs, worktrees, and agent folders
- Workspace cleanup and dependency alignment
- Git LFS configuration for large binary assets
