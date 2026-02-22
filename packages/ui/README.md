# @repo/ui

Shared React component library for the Kiban monorepo featuring 300+ components built with Radix UI primitives, Tailwind CSS, and Motion animations.

## Overview

This package provides a comprehensive UI component library following the shadcn/ui pattern. Components are built with:

- **Radix UI** - Accessible, unstyled primitives
- **Tailwind CSS** - Utility-first styling
- **CVA (class-variance-authority)** - Variant management
- **Motion (Framer Motion v12)** - Animations

## Installation

This package is a workspace dependency. Add it to your app's dependencies:

```json
{
  "dependencies": {
    "@repo/ui": "*"
  }
}
```

## Usage

Import components directly:

```typescript
import { Button } from '@repo/ui/button'
import { Card, CardHeader, CardContent } from '@repo/ui/card'
import { Dialog, DialogTrigger, DialogContent } from '@repo/ui/dialog'
```

Import utilities:

```typescript
import { cn } from '@repo/ui/utils'
```

## Component Categories

### Core Components

Standard UI primitives for building interfaces:

- `button`, `badge`, `card`, `avatar`
- `input`, `textarea`, `checkbox`, `radio-group`
- `select`, `switch`, `slider`, `toggle`
- `label`, `separator`, `aspect-ratio`

### Layout

Structural and navigation components:

- `accordion`, `tabs`, `collapsible`
- `navigation-menu`, `menubar`, `breadcrumb`
- `sidebar`, `resizable-panels`
- `scroll-area`, `carousel`

### Overlays

Modal and popup components:

- `dialog`, `drawer`, `sheet`
- `alert-dialog`, `popover`, `tooltip`
- `dropdown-menu`, `context-menu`
- `hover-card`, `command` (command palette)

### Data Display

Tables, charts, and data visualization:

- `table`, `data-table`
- `chart` (Recharts integration)
- `calendar`, `progress`

### Feedback

User feedback and notifications:

- `alert`, `toast` (Sonner)
- `skeleton`, `spinner`

### Forms

Form handling with React Hook Form integration:

- `form`, `input-otp`
- `file-upload`

### Animation Components

Motion-powered animated components:

- `animated-beam`, `animated-modal`, `animated-text`
- `animated-tooltip`, `animated-testimonials`
- `background-beams`, `background-gradient`
- `aurora-background`, `sparkles`
- `flip-card`, `3d-card`, `3d-pin`

### Specialty Components

Domain-specific and advanced components:

- `code-block`, `file-tree`
- `chatbot`, `agent`
- `bento-grid`, `masonry`
- `globe`, `world-map`

## Styling

Components use Tailwind CSS with the `cn()` utility for class merging:

```typescript
import { cn } from '@repo/ui/utils'

<Button className={cn('custom-class', isActive && 'active-state')} />
```

### Variants

Components support variants via CVA:

```typescript
<Button variant="outline" size="sm">Click me</Button>
<Badge variant="destructive">Error</Badge>
```

## Scripts

```bash
# Run linting
bun run lint

# Type check
bun run check-types

# Generate new component (via Turbo)
bun run generate:component
```

## Dependencies

Key dependencies include:

- `@radix-ui/*` - Accessible primitives
- `class-variance-authority` - Variant management
- `clsx` + `tailwind-merge` - Class utilities
- `motion` - Animations
- `lucide-react` - Icons
- `recharts` - Charts
- `sonner` - Toast notifications
- `vaul` - Drawer component
- `cmdk` - Command palette
- `embla-carousel-react` - Carousel

## Adding Components

1. Create component in `src/[component-name].tsx`
2. Follow existing patterns with Radix primitives and CVA
3. Export from component file (auto-available via exports config)
4. Run `bun run check-types` to verify
