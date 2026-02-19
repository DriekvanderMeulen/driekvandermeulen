# @repo/ui

Shared React component library for the Kiban monorepo. Contains 300+ components built with Radix UI primitives, Tailwind CSS, and CVA (class-variance-authority).

## Installation

This package is internal to the monorepo. Import components in your app:

```tsx
import { Button } from "@repo/ui/button";
import { Card, CardHeader, CardContent } from "@repo/ui/card";
import { cn } from "@repo/ui/utils";
```

## Usage

### Basic Components

```tsx
import { Button } from "@repo/ui/button";

export function Example() {
  return (
    <Button variant="default" size="lg">
      Click me
    </Button>
  );
}
```

### Utility Function

The `cn()` utility merges Tailwind classes with conflict resolution:

```tsx
import { cn } from "@repo/ui/utils";

<div className={cn("px-4 py-2", isActive && "bg-primary")} />;
```

## Component Categories

### Layout & Structure

- `accordion`, `collapsible`, `tabs`, `separator`
- `card`, `bento-grid`, `resizable`
- `sidebar`, `navigation-menu`, `breadcrumb`

### Forms & Inputs

- `button`, `input`, `textarea`, `checkbox`, `radio-group`
- `select`, `combobox`, `slider`, `switch`, `toggle`
- `form`, `calendar`, `date-picker`, `input-otp`

### Feedback & Overlays

- `dialog`, `alert-dialog`, `sheet`, `drawer`
- `popover`, `tooltip`, `hover-card`, `context-menu`
- `toast` (sonner), `alert`, `badge`, `progress`

### Data Display

- `table`, `data-table`, `carousel`, `avatar`
- `chart` (recharts), `skeleton`

### Animated & 3D

- `3d-card`, `3d-pin`, `3d-marquee`
- `animated-beam`, `animated-modal`, `animated-text`
- `aurora-background`, `background-beams`, `canvas-reveal-effect`
- `sparkles`, `spotlight`, `floating-dock`

### Hooks

Import from `@repo/ui/hooks/*`:

```tsx
import { useMobile } from "@repo/ui/hooks/use-mobile";
```

## Styling

Components use Tailwind CSS with CSS variables for theming. Base styles are defined in `apps/web/app/globals.css`. All components support dark mode through Tailwind's `dark:` variant.

### Variants with CVA

Components use `class-variance-authority` for type-safe variants:

```tsx
import { cva } from "class-variance-authority";

const buttonVariants = cva("base-styles", {
  variants: {
    variant: { default: "...", destructive: "..." },
    size: { sm: "...", md: "...", lg: "..." },
  },
});
```

## Adding Components

### Using shadcn/ui CLI

The package is configured for shadcn/ui. From the repo root:

```bash
npx shadcn@latest add button -c packages/ui
```

### Manual Addition

1. Create component in `packages/ui/src/component-name.tsx`
2. Use Radix UI primitives where applicable
3. Style with Tailwind + CVA
4. Export from the file (no central index needed)

## Dependencies

Key dependencies:

- **Radix UI**: Accessible primitives for dialogs, menus, etc.
- **CVA**: Type-safe component variants
- **Motion**: Animations (framer-motion v12)
- **Recharts**: Charts and data visualization
- **Lucide React**: Icon library
- **React Hook Form + Zod**: Form handling and validation
