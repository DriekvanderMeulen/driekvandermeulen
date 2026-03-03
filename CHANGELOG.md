# Changelog

All notable changes to the Kiban/Driek Studio project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.2.0] - 2026-03-03

### Added

#### V2 Landing Page Redesign

- **Dark Mode Support**: Full light/dark theme switching with persistent state
  - Smooth color transitions across all UI elements
  - Semantic color variables for consistent theming
  - Support for `prefers-color-scheme` and manual toggle via sun/moon icons
  - Light theme: slate-50 background with slate-900 text
  - Dark theme: slate-950 background with white text

- **Command Center**: Keyboard-driven command interface
  - Open with `⌘K` (Mac) or `Ctrl+K` (Windows/Linux)
  - Search-ready modal with backdrop blur effect
  - Responsive design with mobile consideration
  - Accessible dialog implementation with Escape key close
  - Ready for command indexing and execution

- **Enhanced Navigation Header**:
  - Sticky header with glassmorphism effect (`backdrop-blur-lg`)
  - Version badge display (v2.8.8)
  - Responsive layout: stacked on mobile, inline on desktop
  - Navigation links for: about, products, blog, contact
  - Theme toggle button with accessible labels

- **Hero Section**:
  - Large, bold heading: "driek studio"
  - Subtitle: "where creative design meets thoughtful engineering."
  - Centered content layout for strong visual hierarchy
  - Responsive typography scaling

- **V2 Component Library** (`apps/web/components/v2/`):
  - `dark-veil.tsx`: Dark mode overlay component
  - Foundation for future v2 component system

#### Styling Updates

- **Global CSS Enhancements**:
  - Background color variable changed from studio-darkest (#0d1f28) to deep dark (#000000)
  - Updated to match v2 design system requirements
  - Enhanced color palette for light and dark mode variants
  - Improved contrast ratios for accessibility

- **Layout Integration**:
  - Root background color now applied via CSS custom property
  - Enhanced antialiasing for text rendering
  - Improved overflow handling for responsive design

#### Build Configuration

- **Turbo Configuration Updates**:
  - Added environment variables to lint task: `DATABASE_URL`, `NEXT_PUBLIC_OPENAI_API_KEY`
  - Ensures proper environment context during linting

#### Components.json Configuration

- **shadcn/ui Integration**:
  - Configured default component style ("default")
  - RSC (React Server Component) support enabled
  - TypeScript and TSX output configured
  - Base color set to neutral with CSS variables enabled
  - Aliases configured for component, utils, ui, lib, and hooks paths
  - Component registries: @ai-elements, @8starlabs-ui, @aceternity, @bundui, @react-bits

### Changed

- **Landing Page Route**: Introduced `/v2` route for new landing page implementation
- **Global Styling Architecture**: Migrated to CSS custom properties for theming
- **Navigation Structure**: Updated to support new header design with controls and navigation items

### Fixed

- **Layout Background**: Properly applied background color to root layout using CSS variable fallback

## [Unreleased]

### Added

#### Landing Page

- **Hero Section**: Full-screen hero with GSAP-powered text shuffle animation
  - Uses `SplitText` for character-level manipulation
  - Configurable shuffle direction, timing, stagger patterns, and loop behavior
  - Scroll-triggered activation with IntersectionObserver
  - Hover-triggered replay support
  - Respects `prefers-reduced-motion` accessibility preference

- **Light Rays Effect**: WebGL-powered volumetric light rays using OGL
  - Configurable ray origin (8 positions: corners, centers, sides)
  - Mouse-following behavior with smooth interpolation
  - Adjustable parameters: speed, spread, length, pulsation, saturation
  - Intersection Observer for performance optimization (pauses when off-screen)
  - Custom shader with noise and distortion options

- **Staggered Menu Navigation**: Animated side navigation with cascade effects
  - Fixed position menu with toggle button
  - Configurable accent colors and numbering display
  - Social media links integration

- **Content Sections**:
  - About section
  - Skills section
  - Experience section
  - Education section
  - Products section
  - Open Source section

#### 3D Office Scene (`/office`)

- **Immersive 3D Environment**: First-person walkable office space
  - GLB model loading with GLTFLoader
  - Collision detection using Rapier physics (TrimeshCollider for complex geometry)
  - Player physics with CapsuleCollider, jumping, and linear damping
  - PointerLockControls for mouse-look navigation
  - WASD/Arrow key movement with configurable walk speed

- **Trigger Zones**: Automatic detection of named zones in 3D space
  - World-space bounding box calculation
  - Enter/exit event callbacks
  - Zone detail panel overlay

- **Visual Effects**:
  - Bloom post-processing with configurable luminance threshold
  - Physical bulb lights with emissive materials
  - Shadow casting with hemisphere and directional lighting
  - High-performance WebGL rendering with adaptive DPR

- **Loading Experience**:
  - Progress bar during asset loading
  - Click-to-start overlay with control instructions
  - Smooth transition after load completion

#### Authentication

- **Better Auth Integration**: Session-based authentication system
  - Drizzle ORM adapter for PostgreSQL
  - Google OAuth social provider support
  - Server and client-side auth utilities
  - Type-safe session and user exports

#### Database

- **Drizzle ORM Schema**: PostgreSQL database layer
  - User table with email verification
  - Session table with token management and device tracking
  - Account table for OAuth provider linking
  - Verification table for email/token verification flows
  - Proper foreign key relationships with cascade deletes
  - Indexed columns for query optimization

#### Component Library (`@repo/ui`)

- 300+ reusable React components
- Radix UI primitives with CVA (class-variance-authority) for variants
- Tailwind CSS styling with `cn()` utility (tailwind-merge + clsx)
- Motion (framer-motion v12) for animations

#### Developer Experience

- **Turborepo Monorepo**: Efficient multi-package workspace
  - `apps/web`: Main Next.js application
  - `packages/db`: Shared database layer
  - `packages/ui`: Shared component library
  - `packages/eslint-config`: Shared ESLint configuration
  - `packages/typescript-config`: Shared TypeScript configuration
  - `packages/brand`: Brand assets and design tokens

- **Turbopack**: Fast development builds with monorepo root configuration

- **Code Quality Tools**:
  - Knip for dead code detection (fails build on deletable files)
  - Prettier with import sorting (@trivago/prettier-plugin-sort-imports)
  - Tailwind class sorting (prettier-plugin-tailwindcss)
  - ESLint with zero-warning enforcement

- **Bun**: Fast JavaScript runtime and package manager (v1.2.20)

### Design Documentation

- **Navbar Motion Animations Design** (`docs/plans/2026-02-02-navbar-motion-animations-design.md`)
  - Approved design for Motion-based navbar animations
  - 200ms duration with ease-out timing
  - Staggered link animations (25ms cascade delay)
  - Logo morph transition between image and text states
  - Layout-based navbar shrink/grow behavior

## Technical Stack

- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS v4 with PostCSS
- **3D Graphics**: Three.js with @react-three/fiber ecosystem
- **Physics**: @react-three/rapier
- **Animation**: GSAP (ScrollTrigger, SplitText), Motion (framer-motion)
- **WebGL Effects**: OGL
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth
- **Build System**: Turborepo with Turbopack
- **Runtime**: Bun 1.2.20
