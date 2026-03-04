# @repo/ui - Component Library

A comprehensive React component library with 300+ components built on Radix UI, Tailwind CSS, and CVA.

## Features

- **300+ Components**: Form inputs, layouts, modals, navigation, data display
- **Accessible**: Built on Radix UI primitives with ARIA compliance
- **Type Safe**: Full TypeScript support with CVA variants
- **Themeable**: Tailwind CSS with custom design tokens
- **Animated**: Framer Motion integration for smooth interactions

## Installation

```bash
# Already installed as a workspace
npm install @repo/ui
```

## Usage

```tsx
import {
  Button,
  Card,
  Input,
  Select,
} from '@repo/ui'

export function MyComponent() {
  return (
    <Card>
      <Input type="email" placeholder="Enter email" />
      <Button variant="primary">Submit</Button>
    </Card>
  )
}
```

## Component Categories

### Form Components
- Input, Textarea, Select, Checkbox, Radio, Switch
- Label, FormField, Form validation hooks

### Layout Components
- Container, Flex, Grid, Stack
- Sidebar, Header, Footer
- Section, Article

### Overlay Components
- Dialog/Modal, Popover, Tooltip
- AlertDialog, DropdownMenu

### Data Display
- Card, Badge, Avatar, Progress
- Table, Skeleton, Empty State

### Navigation
- Tabs, Breadcrumb, Pagination
- Navbar, Menu

### Feedback
- Toast, Alert, Loading
- Notification

### 3D Components
- Canvas, Model, Lights
- Effects (Bloom, Vignette, etc)

See [COMPONENTS.md](COMPONENTS.md) for full catalog and examples.

## Styling

All components use:
- **Tailwind CSS v4** - Utility classes
- **CVA** - Variant management
- **cn() helper** - Class merging with conflict resolution

## Adding New Components

1. Create component in `src/component-name.tsx`
2. Export from `src/index.tsx`
3. Follow CVA pattern for variants
4. Add JSDoc comments
5. Update COMPONENTS.md if major component
6. Test in app using it

Example:

```typescript
// packages/ui/src/button.tsx

import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center font-medium transition',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 hover:bg-gray-300',
      },
      size: {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
)
Button.displayName = 'Button'
```

## Accessibility

All components follow WAI-ARIA guidelines:
- Semantic HTML
- Keyboard navigation
- Screen reader support
- Focus management
- Color contrast compliance

## Testing

Components include unit tests:

```bash
# Run tests
bun test

# Watch mode
bun test --watch

# Coverage
bun test --coverage
```

## Related Documentation

- [COMPONENTS.md](COMPONENTS.md) - Full component catalog
- [../../ARCHITECTURE.md](../../ARCHITECTURE.md) - System design
- [../../docs/DESIGN_TOKENS.md](../../docs/DESIGN_TOKENS.md) - Design system
- Radix UI: https://www.radix-ui.com/
- CVA: https://cva.style/
- Tailwind CSS: https://tailwindcss.com/
