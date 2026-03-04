# @repo/ui - Component Catalog

A comprehensive library of 300+ React components built with Radix UI primitives, Tailwind CSS, and framer-motion for animations.

## Overview

The UI component library provides reusable, accessible, and customizable components for building user interfaces. All components follow consistent patterns: Radix UI for structure and accessibility, Tailwind CSS for styling, and CVA for variant management.

## Component Categories

### Form Components

Input controls and form-related components for user data entry.

**Common Components:**
- **Input**: Text field with placeholder, disabled, and error states
  ```tsx
  <Input
    type="email"
    placeholder="Enter email"
    disabled={false}
    className="w-full"
  />
  ```

- **Button**: Primary action control with multiple variants
  ```tsx
  <Button variant="primary" size="lg">
    Click me
  </Button>
  ```
  Variants: primary, secondary, outline, ghost
  Sizes: sm, md, lg

- **Select**: Dropdown list selection
- **Checkbox**: Toggle selection
- **Radio**: Single choice from multiple options
- **Textarea**: Multi-line text input
- **Label**: Form field labeling with accessibility
- **Switch**: Toggle boolean state

**Usage Pattern:**
```tsx
import { Input, Button, Label } from '@repo/ui'

export function LoginForm() {
  return (
    <form>
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" />
      <Button type="submit">Login</Button>
    </form>
  )
}
```

### Layout Components

Structure and container components for page layouts.

- **Container**: Responsive width wrapper
- **Flex**: Flexbox layout utility
- **Grid**: CSS Grid layout
- **Stack**: Vertical or horizontal stacking with gap
- **Sidebar**: Navigation sidebar with collapsible sections
- **Header**: Page header with navigation
- **Footer**: Page footer

**Example:**
```tsx
import { Container, Flex, Stack } from '@repo/ui'

<Container>
  <Stack gap="lg">
    <Header />
    <Flex gap="md">
      <Sidebar />
      <main>{children}</main>
    </Flex>
    <Footer />
  </Stack>
</Container>
```

### Overlay Components

Modal dialogs, popups, and overlays.

- **Dialog/Modal**: Full-screen overlay with content
- **Popover**: Floating popup anchored to trigger
- **Tooltip**: Information popover on hover
- **AlertDialog**: Confirmation dialog

**Usage:**
```tsx
import { Dialog, DialogContent, DialogTitle } from '@repo/ui'

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogTitle>Confirm action</DialogTitle>
    <p>Are you sure?</p>
  </DialogContent>
</Dialog>
```

### Navigation Components

Navigation and menu controls.

- **Tabs**: Tabbed content navigation
- **Breadcrumb**: Hierarchical navigation path
- **Navbar**: Horizontal navigation menu
- **Pagination**: Page-by-page navigation
- **Dropdown Menu**: Action menu

**Example:**
```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui'

<Tabs>
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

### Data Display Components

Components for displaying data and information.

- **Card**: Content container with optional header/footer
- **Table**: Data table with sorting and filtering
- **Badge**: Label or status indicator
- **Avatar**: User profile image
- **Progress**: Progress bar or circular indicator
- **Skeleton**: Loading placeholder
- **Empty State**: Message when no data available

**Usage:**
```tsx
import { Card, Badge, Avatar } from '@repo/ui'

<Card>
  <div className="flex gap-4">
    <Avatar src="/profile.png" />
    <div>
      <h3>User Name</h3>
      <Badge variant="success">Active</Badge>
    </div>
  </div>
</Card>
```

### Feedback Components

Components for user feedback and notifications.

- **Toast**: Temporary notification
- **Alert**: Important message or warning
- **Loading**: Spinner or loading indicator
- **Notification**: Persistent notification UI

**Example:**
```tsx
import { useToast } from '@repo/ui'

export function MyComponent() {
  const { toast } = useToast()

  const handleClick = () => {
    toast({
      title: 'Success',
      description: 'Action completed',
      variant: 'success',
    })
  }

  return <button onClick={handleClick}>Action</button>
}
```

### 3D Components

Components for Three.js integration and 3D visualization.

- **Canvas**: Three.js scene container
- **Model**: GLB model loader
- **Lights**: Lighting setup components
- **Effects**: Post-processing effects (bloom, tone mapping, etc.)

**Usage:**
```tsx
import { Canvas } from '@react-three/fiber'
import { Model, OrbitControls, Lights } from '@repo/ui'

<Canvas>
  <Lights />
  <Model url="/models/scene.glb" />
  <OrbitControls />
</Canvas>
```

## Component Patterns

### CVA (Class Variance Authority) Variants

All components use CVA for consistent variant management:

```typescript
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        outline: 'border border-gray-300 hover:bg-gray-50',
        ghost: 'hover:bg-gray-100',
      },
      size: {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}
```

### Composition Pattern

Components are built to be composable:

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content goes here</CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Accessibility

All components follow WAI-ARIA guidelines:
- Semantic HTML (buttons, links, form controls)
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Color contrast requirements

## Styling

### Tailwind CSS Integration

All components use Tailwind CSS v4 for styling:

```tsx
<div className="flex gap-4 px-4 py-2 rounded-lg bg-white border border-gray-200">
  Content
</div>
```

### Responsive Design

Components support responsive utilities:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Auto-responsive grid */}
</div>
```

### Dark Mode

Dark mode support via Tailwind's dark mode variant:

```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content adapts to theme
</div>
```

## Animation Integration

Components support framer-motion animations:

```tsx
import { motion } from 'framer-motion'

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function AnimatedCard() {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.3 }}
    >
      <Card>Content</Card>
    </motion.div>
  )
}
```

## Adding New Components

### Step 1: Create Component File

```typescript
// packages/ui/src/button.tsx

import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(/* ... */)

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
)
Button.displayName = 'Button'
```

### Step 2: Export from Index

```typescript
// packages/ui/src/index.tsx

export { Button, type ButtonProps } from './button'
```

### Step 3: Add to Storybook (if used)

Document component usage in Storybook stories.

### Step 4: Verify Types

Run type checking:
```bash
bun run check-types
```

## Performance Considerations

### Code Splitting

Import only needed components:
```tsx
// Good
import { Button } from '@repo/ui'

// Avoid
import * as UI from '@repo/ui'
```

### Lazy Loading

For heavy components, use React.lazy:
```tsx
const HeavyComponent = lazy(() => import('@repo/ui/heavy-component'))

<Suspense fallback={<Skeleton />}>
  <HeavyComponent />
</Suspense>
```

### Bundle Size

Components are designed to be tree-shakeable. Unused components won't be bundled.

## Testing

Components should include:

1. **Unit Tests** - Component rendering and props
2. **Integration Tests** - Component interaction
3. **Accessibility Tests** - ARIA compliance

```typescript
import { render, screen } from '@testing-library/react'
import { Button } from '@repo/ui'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick}>Click</Button>)
    screen.getByRole('button').click()
    expect(onClick).toHaveBeenCalled()
  })
})
```

## Utility Functions

### cn() - Class Merging

Safely merge Tailwind classes with conflict resolution:

```typescript
import { cn } from '@/lib/utils'

cn('px-2 py-1', 'px-4')  // Result: px-4 py-1
```

## Related Documentation

- `packages/ui/README.md` - Package overview
- `ARCHITECTURE.md` - System design
- `docs/DESIGN_TOKENS.md` - Design tokens and theming
- Radix UI: https://www.radix-ui.com/docs/primitives/overview/introduction
- CVA: https://cva.style/docs
- Tailwind CSS: https://tailwindcss.com/docs
