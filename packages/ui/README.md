# @repo/ui

Shared React component library with 300+ production-ready components. Provides consistent, accessible UI elements for the Kiban application and other projects in the monorepo.

## Overview

This package exports a comprehensive collection of components built with:

- **React 19** - Component framework
- **TypeScript** - Full type coverage
- **Tailwind CSS v4** - Styling
- **Radix UI** - Accessible primitives
- **CVA** - Component variants
- **Motion** - Animation support

## Installation

Already installed in the monorepo. Import directly:

```typescript
import { Button } from '@repo/ui/button'
import { Card, CardHeader, CardContent } from '@repo/ui/card'
import { Dialog, DialogContent, DialogTrigger } from '@repo/ui/dialog'
```

## Component Categories

### Buttons & Interactive
- `Button` - Primary button component
- `Link` - Link with button styling
- `Toggle` - Toggle switch

### Forms & Input
- `Input` - Text input field
- `Label` - Form label
- `Form` - Form wrapper (react-hook-form integration)
- `FormField`, `FormItem`, `FormMessage` - Form parts
- `Checkbox` - Checkbox input
- `Radio` - Radio button
- `Switch` - Toggle switch
- `Select` - Dropdown select
- `Textarea` - Multi-line text input

### Layout & Structure
- `Container` - Max-width container
- `Card` - Content card container
- `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` - Card parts
- `Flex` - Flexbox container
- `Grid` - Grid container

### Navigation
- `Tabs` - Tab interface
- `TabsList`, `TabsTrigger`, `TabsContent` - Tab parts
- `NavigationMenu` - Dropdown navigation
- `Breadcrumb` - Navigation breadcrumb
- `Sidebar` - Side navigation panel

### Feedback & Alerts
- `Alert` - Alert message container
- `AlertTitle`, `AlertDescription` - Alert parts
- `Badge` - Status/category indicator
- `Toast` - Toast notification
- `Tooltip` - Hover tooltip
- `Progress` - Progress bar
- `Skeleton` - Loading skeleton

### Modals & Overlays
- `Dialog` - Modal dialog
- `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter` - Dialog parts
- `Popover` - Floating popover
- `PopoverTrigger`, `PopoverContent` - Popover parts
- `Sheet` - Slide-out sheet
- `Drawer` - Drawer navigation
- `Modal` - Full-screen modal

### Data Display
- `Table` - Data table
- `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell` - Table parts
- `List` - List component
- `ListItem` - List item

### Pagination & Scrolling
- `Pagination` - Pagination controls
- `ScrollArea` - Scrollable area with scrollbar

### Dropdowns & Menus
- `DropdownMenu` - Dropdown menu
- `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem` - Menu parts
- `CommandMenu` - Command palette

### 3D & Animation
- `Canvas` - Three.js canvas wrapper (from @react-three/fiber)
- `AnimatedDiv`, `AnimatedButton`, `AnimatedCard` - Motion-wrapped components

## Usage Examples

### Button

```typescript
import { Button } from '@repo/ui/button'

<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button disabled>Disabled</Button>
```

### Card

```typescript
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@repo/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Subtitle or description</CardDescription>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
</Card>
```

### Dialog

```typescript
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@repo/ui/dialog'

<Dialog>
  <DialogTrigger>Open Dialog</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    Content here
  </DialogContent>
</Dialog>
```

### Form

```typescript
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@repo/ui/form'
import { Input } from '@repo/ui/input'
import { useForm } from 'react-hook-form'

const form = useForm()

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">Submit</Button>
  </form>
</Form>
```

### Table

```typescript
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@repo/ui/table'

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Column 1</TableHead>
      <TableHead>Column 2</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map((row) => (
      <TableRow key={row.id}>
        <TableCell>{row.col1}</TableCell>
        <TableCell>{row.col2}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### Tabs

```typescript
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@repo/ui/tabs'

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content for tab 1</TabsContent>
  <TabsContent value="tab2">Content for tab 2</TabsContent>
</Tabs>
```

## Styling

### Using cn() Utility

Merge Tailwind classes intelligently:

```typescript
import { cn } from '@repo/ui/utils'

// Resolves class conflicts
const className = cn(
  'px-4 py-2 bg-blue-500',
  'bg-red-500', // Overrides blue
  condition && 'text-white'
)
```

### Component Variants with CVA

Components use Class Variance Authority for variant management:

```typescript
import { cva } from 'class-variance-authority'

const buttonVariants = cva('px-4 py-2 font-medium', {
  variants: {
    variant: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-200 text-black',
    },
    size: {
      sm: 'text-sm',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'sm',
  },
})

// Usage
<button className={buttonVariants({ variant: 'secondary', size: 'lg' })}>
  Click me
</button>
```

## Accessibility

All components follow WCAG 2.1 guidelines:

- **Keyboard Support** - Full keyboard navigation
- **ARIA Labels** - Proper semantic attributes
- **Focus Management** - Clear focus states
- **Screen Readers** - Compatible with assistive tech

Example:

```typescript
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger aria-label="Open settings">
    <SettingsIcon />
  </DialogTrigger>
  <DialogContent>
    Settings dialog
  </DialogContent>
</Dialog>
```

## Animations

Components integrate with Motion (Framer Motion v12):

```typescript
import { motion } from 'motion/react'
import { Button } from '@repo/ui/button'

const AnimatedButton = motion.create(Button)

<AnimatedButton
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.98 }}
  variant="primary"
>
  Click me
</AnimatedButton>
```

## Adding New Components

### File Structure

```
packages/ui/src/
├── components/
│   └── my-component.tsx
├── lib/
│   └── utils.ts
└── index.tsx
```

### Component Template

```typescript
// packages/ui/src/components/my-component.tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

export interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary'
  size?: 'sm' | 'lg'
}

/**
 * MyComponent description and usage guidelines.
 */
const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant = 'default', size = 'sm', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'base-styles',
        {
          'variant-default': variant === 'default',
          'variant-secondary': variant === 'secondary',
          'size-sm': size === 'sm',
          'size-lg': size === 'lg',
        },
        className
      )}
      {...props}
    />
  )
)
MyComponent.displayName = 'MyComponent'

export { MyComponent }
export type { MyComponentProps }
```

### Export from Library

Add to `packages/ui/src/index.tsx`:

```typescript
export { MyComponent } from './components/my-component'
export type { MyComponentProps } from './components/my-component'
```

## Testing Components

### Unit Test Example

```typescript
import { render, screen } from '@testing-library/react'
import { MyComponent } from './my-component'

describe('MyComponent', () => {
  it('renders with default variant', () => {
    render(<MyComponent>Content</MyComponent>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('applies secondary variant', () => {
    const { container } = render(<MyComponent variant="secondary" />)
    expect(container.firstChild).toHaveClass('variant-secondary')
  })

  it('is keyboard accessible', () => {
    render(<MyComponent role="button" tabIndex={0} />)
    expect(screen.getByRole('button')).toHaveFocus()
  })
})
```

## Component Best Practices

1. **Type Everything** - Use TypeScript for props and return types
2. **Forward Refs** - Support ref forwarding for DOM components
3. **Composition** - Build complex components from simple ones
4. **Accessibility First** - Use Radix UI primitives, add ARIA
5. **Variant Consistency** - Use CVA for all styled variations
6. **No App Dependencies** - Components should work anywhere
7. **Document Clearly** - JSDoc for public APIs
8. **Test Thoroughly** - Unit tests for key functionality

## Performance

- **Tree-shaking**: Unused components removed during build
- **Code Splitting**: Each component is independent
- **Lazy Loading**: Dynamic imports support
- **Bundle Size**: Monitor with `bun run knip`

## Configuration

### Tailwind CSS

Components use Tailwind CSS v4. Configure in your app's `tailwind.config.ts`.

### Motion Setup

Motion (Framer Motion v12) is pre-configured. Use in components:

```typescript
import { motion } from 'motion/react'

const AnimatedComponent = motion.div
```

## Troubleshooting

### Component Not Found

```
Cannot find module '@repo/ui/my-component'
```

**Solution**:
1. Verify component exists in `src/components/`
2. Check export in `src/index.tsx`
3. Restart dev server

### Type Errors

```
Property 'variant' does not exist on type 'MyComponentProps'
```

**Solution**:
1. Check interface definition
2. Verify types are exported
3. Run `bun run check-types`

### Styling Not Applied

```
Component renders but styles missing
```

**Solution**:
1. Verify Tailwind CSS is configured
2. Check class names in component
3. Ensure `cn()` is used for merging
4. Run `bun run format` to organize classes

## Related Documentation

- **COMPONENTS.md** - Complete component catalog with examples
- **ARCHITECTURE.md** - Component library role in system
- **DEVELOPMENT.md** - Setup and development workflow
- **DESIGN_TOKENS.md** - Design system values

## Resources

- [Radix UI Documentation](https://radix-ui.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Class Variance Authority](https://cva.style)
- [Motion (Framer Motion v12)](https://motion.dev)
- [React Documentation](https://react.dev)
