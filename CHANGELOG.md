# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-02-21

### Overview

Initial release of **Kiban** - a Next.js web application with immersive 3D scenes, modern authentication, and a comprehensive shared component library. The project evolved from a basic Turborepo starter into a full-featured application stack.

### Features

#### 3D Office Scene

- Interactive 3D office environment built with React Three Fiber
- Physics-based collision detection using Rapier physics engine
- Player movement with WASD/arrow key controls
- Dynamic camera positioning and smooth transitions
- Loading screen with progress indicator
- GLB model assets for office environment and branding (`office.glb`, `logo.glb`)
- Post-processing effects via `@react-three/postprocessing`

#### Authentication System

- Better Auth integration with Drizzle ORM adapter
- Google OAuth social authentication support
- Server-side auth configuration (`lib/auth.ts`)
- Client-side auth hooks (`lib/auth-client.ts`)
- User, session, account, and verification database tables
- Secure session management

#### Landing Page

- Modern landing page with Three.js elements
- Custom typography with project fonts
- Responsive design with Tailwind CSS v4

### Infrastructure

#### Monorepo Architecture

- Turborepo configuration with optimized build pipelines
- Workspace packages:
  - `apps/web` - Main Next.js 16 application
  - `packages/db` - Drizzle ORM database layer (PostgreSQL)
  - `packages/ui` - Shared React component library (300+ components)
  - `packages/eslint-config` - Shared ESLint configuration
  - `packages/typescript-config` - Shared TypeScript configuration
  - `packages/brand` - Brand assets and design tokens

#### Build & Development

- Turbopack configuration for fast development builds
- Bun 1.2.20 as the package manager
- Automated code formatting with Prettier on build
- Import sorting via `@trivago/prettier-plugin-sort-imports`
- Tailwind class sorting via `prettier-plugin-tailwindcss`

#### Code Quality

- Knip integration for dead code detection
- Build fails if deletable files are detected
- ESLint with zero warnings policy
- TypeScript 5.9 with strict type checking

#### Database Layer

- Drizzle ORM with PostgreSQL
- Migration generation and management
- Drizzle Studio for database GUI
- Transaction pool mode compatibility

### Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16.1.0 |
| React | React 19.2.0 |
| 3D Graphics | Three.js 0.182.0, React Three Fiber 9.5.0 |
| Physics | Rapier 2.2.0 |
| Animation | Motion (Framer Motion) 12.29.2, GSAP 3.14.2 |
| Styling | Tailwind CSS 4.0.0 |
| Database | PostgreSQL with Drizzle ORM 0.45.1 |
| Auth | Better Auth 1.4.18 |
| Package Manager | Bun 1.2.20 |
| Monorepo | Turborepo 2.8.1 |

### Documentation

- Comprehensive `CLAUDE.md` with project guidance
- Design documentation in `docs/plans/`
  - Navbar Motion animations specification (`2026-02-02-navbar-motion-animations-design.md`)
- Environment variable templates (`.env.example` files)

### Development Workflow

- Git worktrees support for feature isolation (`.worktrees/`)
- Shared ESLint and TypeScript configurations across packages
- Consistent Prettier formatting with custom import ordering

[0.1.0]: https://github.com/driek-studio/driek-studio-website/releases/tag/v0.1.0
