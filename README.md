# Kiban - 3D Office Experience

A modern, interactive 3D office exploration application built with Next.js, Three.js, and PostgreSQL.

[![Build Status](https://img.shields.io/github/actions/workflow/status/yourusername/kiban/ci.yml)](https://github.com/yourusername/kiban/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.17-green)](https://nodejs.org/)

## 🚀 Quick Start

### Prerequisites

- **Bun** 1.2.20+ (package manager)
- **PostgreSQL** 14+ (database)
- **Node.js** 18.17+ (runtime)

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/kiban.git
cd kiban

# Install dependencies (Bun)
bun install

# Copy environment templates
cp apps/web/.env.example apps/web/.env.local
cp packages/db/.env.example packages/db/.env.local

# Configure environment variables in .env.local
# At minimum: DATABASE_URL, BETTER_AUTH_SECRET, Google OAuth credentials

# Run database migrations
cd packages/db
bun run migrate
cd ../..

# Start development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📋 What's Inside?

### **apps/web**
Main Next.js application featuring:
- **3D Office Scene**: Explore office with Three.js + Rapier physics
- **Zone Interactions**: Click zones to view content
- **Authentication**: Google OAuth via Better Auth
- **Responsive UI**: Tailwind CSS + custom components

### **packages/db**
PostgreSQL database layer:
- **Drizzle ORM**: Type-safe database access
- **Schema**: User, session, OAuth, and verification tables
- **Migrations**: Version-controlled schema changes

### **packages/ui**
300+ reusable React components:
- **Radix UI Primitives**: Accessible base components
- **Tailwind CSS**: Utility-first styling
- **CVA Variants**: Type-safe component variants
- **Framer Motion**: Smooth animations

## 🎯 Key Features

### 3D Exploration
- Real-time 3D office rendering with Three.js
- Physics simulation with Rapier (walking, collision detection)
- Interactive zones trigger content display
- GLB model assets with Git LFS

### Interactive Content
- Zone-based information system
- Markdown content support
- Category filtering (public, private, meeting, break, outdoor)
- Real-time zone metadata updates

### Authentication
- Google OAuth sign-in
- Email/password authentication
- Better Auth framework with Drizzle adapter
- Secure session management

### Developer Experience
- TypeScript for type safety
- ESLint with 0-warning policy
- Prettier auto-formatting
- Automated dead code detection (Knip)
- Hot module reloading (Turbopack)

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│         Browser / Client                │
│  (React 19 + Next.js 16 + Three.js)     │
└──────────────┬──────────────────────────┘
               │
               ├─→ API Routes /api/auth/*
               ├─→ Server Actions
               └─→ WebSocket (future)
               │
┌──────────────▼──────────────────────────┐
│      Next.js Server (localhost:3000)    │
│  - Authentication (Better Auth)         │
│  - API endpoints                        │
│  - Server-side rendering                │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│     PostgreSQL Database                 │
│  (Drizzle ORM, tables: users, sessions) │
└─────────────────────────────────────────┘
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed system design.

## 📚 Documentation

- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System design and data flow
- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Local setup and debugging
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Code standards and workflow
- **[packages/db/README.md](packages/db/README.md)** - Database schema
- **[packages/ui/COMPONENTS.md](packages/ui/COMPONENTS.md)** - Component catalog
- **[apps/web/README.md](apps/web/README.md)** - Web app details
- **[apps/web/THREE.md](apps/web/THREE.md)** - 3D scene setup
- **[apps/web/ANIMATIONS.md](apps/web/ANIMATIONS.md)** - Animation patterns
- **[apps/web/CONTENT.md](apps/web/CONTENT.md)** - Zone system and content
- **[docs/DESIGN_TOKENS.md](docs/DESIGN_TOKENS.md)** - Design tokens

## 💻 Development Commands

```bash
# Start development server (port 3000)
bun dev

# Run specific app only
bun dev --filter=web

# Check types
bun run check-types

# Run linting
bun run lint

# Format code
bun run format

# Check for dead code
bun run knip:unused

# Build production
bun run build

# Database commands (from packages/db/)
cd packages/db
bun run migrate      # Apply migrations
bun run generate     # Create migration from schema changes
bun run push         # Direct schema push (dev only)
bun run studio       # Open Drizzle Studio UI
```

## 🗂️ Project Structure

```
kiban/
├── apps/web/                 # Main Next.js application
│   ├── app/                  # App Router pages & layouts
│   ├── components/           # React components
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utilities, auth, database client
│   ├── data/                 # Zone and content JSON files
│   └── public/three/         # 3D GLB model assets
│
├── packages/
│   ├── db/                   # Database (Drizzle ORM + PostgreSQL)
│   │   ├── src/schema.ts     # Database schema definitions
│   │   └── migrations/       # SQL migration files
│   │
│   ├── ui/                   # Component library (300+ components)
│   │
│   ├── eslint-config/        # Shared ESLint configuration
│   ├── typescript-config/    # Shared TypeScript configuration
│   └── brand/                # Design tokens and branding
│
├── docs/
│   ├── plans/                # Architecture decision documents
│   └── DESIGN_TOKENS.md      # Color, spacing, typography
│
└── .worktrees/               # Git worktrees for feature isolation
```

## 🔧 Environment Variables

Create `apps/web/.env.local`:

```bash
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/kiban"

# Authentication (generate with: openssl rand -base64 32)
BETTER_AUTH_SECRET="your-32-character-secret"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth (get from Google Cloud Console)
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-secret"
```

See `.env.example` files for all available options.

## 🧪 Testing

```bash
# Run tests
bun test

# Run with coverage
bun test --coverage

# Watch mode
bun test --watch
```

## 🚀 Deployment

### Staging
Automatically deploys on push to `main` branch.

### Production
Create a tagged release to deploy to production:

```bash
git tag v1.2.3
git push origin v1.2.3
```

## 📊 Performance

- **Lighthouse Score**: 90+
- **Largest Contentful Paint**: < 2.5s
- **First Input Delay**: < 100ms
- **Cumulative Layout Shift**: < 0.1

Monitor with: Chrome DevTools → Lighthouse

## 🔒 Security

- Password hashing via Better Auth
- XSS protection with React/Next.js
- CSRF tokens for state-changing operations
- Environment-based secret management
- SQL injection prevention (Drizzle ORM)

See [CONTRIBUTING.md](CONTRIBUTING.md#security-practices) for security guidelines.

## 🎨 Design System

- **Framework**: Tailwind CSS v4
- **Components**: Radix UI primitives
- **Animations**: Framer Motion v12
- **Icons**: [Lucide Icons](https://lucide.dev/)

See [docs/DESIGN_TOKENS.md](docs/DESIGN_TOKENS.md) for design tokens.

## 🤝 Contributing

We welcome contributions! Please follow our guidelines:

1. Read [CONTRIBUTING.md](CONTRIBUTING.md)
2. Create feature branch: `git checkout -b feat/my-feature`
3. Make atomic commits with conventional format
4. Pass all checks: `bun run check-types && bun run lint && bun run build`
5. Open pull request with clear description

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 👥 Team

- **Questions**: Open GitHub issues or discussions

## 🔗 Useful Links

- [GitHub Issues](https://github.com/yourusername/kiban/issues) - Bug reports
- [Discussions](https://github.com/yourusername/kiban/discussions) - Questions
- [Changelog](CHANGELOG.md) - Version history

## 🏁 Getting Started

```bash
# 1. Clone and setup
git clone https://github.com/yourusername/kiban.git
cd kiban
bun install

# 2. Configure environment
cp apps/web/.env.example apps/web/.env.local
# Edit .env.local with your database URL and OAuth credentials

# 3. Setup database
cd packages/db && bun run migrate && cd ../..

# 4. Start development
bun dev

# 5. Open browser
# Visit http://localhost:3000
```

**First time?** Start with [DEVELOPMENT.md](DEVELOPMENT.md) for detailed setup.

---

**Made with ❤️ using Next.js, Three.js, and PostgreSQL**
