# @repo/ui Component Library

Comprehensive catalog of 300+ React components for the Kiban application. All components follow shadcn/ui patterns with Radix UI primitives and Tailwind CSS styling.

## Overview

The component library provides:
- **Base UI Components** - buttons, inputs, forms, modals
- **Layout Components** - containers, grids, navigation
- **Data Display** - tables, lists, cards
- **3D Components** - Three.js integrations
- **Animation Wrappers** - Motion integration patterns

All components are:
- Fully typed with TypeScript
- Accessible (WCAG 2.1 compliant via Radix UI)
- Customizable via CVA variants
- Zero external dependencies (pure React)

## Component Categories

### Button Components

**Button** - Basic interactive button with multiple variants.

```typescript
import { Button } from '@repo/ui/button';

<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button disabled>Disabled</Button>
```

**Props:**
- `variant` - "default" | "secondary" | "outline" | "ghost" | "destructive"
- `size` - "default" | "sm" | "lg" | "icon"
- `disabled` - boolean
- `onClick` - React.MouseEventHandler

---

### Form Components

**Input** - Text input field with validation states.

```typescript
import { Input } from '@repo/ui/input';

<Input placeholder="Enter text..." />
<Input type="email" />
<Input disabled />
<Input value="controlled" onChange={(e) => setValue(e.target.value)} />
```

**Props:**
- `type` - HTML input type (text, email, password, etc.)
- `placeholder` - string
- `disabled` - boolean
- `value` - string
- `onChange` - React.ChangeEventHandler

---

**Label** - Form label with accessibility features.

```typescript
import { Label } from '@repo/ui/label';

<Label htmlFor="email">Email Address</Label>
<Input id="email" type="email" />
```

---

**Form** - Composable form wrapper with validation.

```typescript
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@repo/ui/form';
import { useForm } from 'react-hook-form';

const form = useForm();

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </form>
</Form>
```

---

### Dialog & Modal Components

**Dialog** - Modal dialog for focused interactions.

```typescript
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@repo/ui/dialog';

<Dialog>
  <DialogTrigger>Open Dialog</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description here</DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

---

**Popover** - Floating content relative to trigger.

```typescript
import { Popover, PopoverTrigger, PopoverContent } from '@repo/ui/popover';

<Popover>
  <PopoverTrigger>More Options</PopoverTrigger>
  <PopoverContent>Popover content</PopoverContent>
</Popover>
```

---

### Layout Components

**Card** - Container for grouped content.

```typescript
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@repo/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Subtitle or description</CardDescription>
  </CardHeader>
  <CardContent>Content goes here</CardContent>
  <CardFooter>Footer content</CardFooter>
</Card>
```

---

**Container** - Responsive max-width container.

```typescript
import { Container } from '@repo/ui/container';

<Container>
  <h1>Content constrained to max-width</h1>
</Container>
```

---

### Navigation Components

**Tabs** - Tab interface for switching content.

```typescript
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@repo/ui/tabs';

<Tabs value="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content for tab 1</TabsContent>
  <TabsContent value="tab2">Content for tab 2</TabsContent>
</Tabs>
```

---

**Navigation Menu** - Accessible dropdown navigation.

```typescript
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from '@repo/ui/navigation-menu';

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/link">Link</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

---

### Data Display

**Table** - Accessible data table with sorting and filtering.

```typescript
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@repo/ui/table';

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Column 1</TableHead>
      <TableHead>Column 2</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Data 1</TableCell>
      <TableCell>Data 2</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

**Badge** - Status or category indicator.

```typescript
import { Badge } from '@repo/ui/badge';

<Badge>New</Badge>
<Badge variant="secondary">Active</Badge>
<Badge variant="destructive">Alert</Badge>
```

---

**Alert** - Important message or notification.

```typescript
import { Alert, AlertTitle, AlertDescription } from '@repo/ui/alert';

<Alert>
  <AlertTitle>Attention</AlertTitle>
  <AlertDescription>This is an important message</AlertDescription>
</Alert>
```

---

### 3D Components

**Canvas** - Three.js canvas wrapper for 3D scenes.

```typescript
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

<Canvas>
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="blue" />
  </mesh>
  <OrbitControls />
</Canvas>
```

---

**Physics** - Rapier physics integration.

```typescript
import { Physics, RigidBody } from '@react-three/rapier';

<Physics>
  <RigidBody>
    <mesh>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  </RigidBody>
</Physics>
```

---

## Styling Patterns

### Using CVA for Variants

Components use Class Variance Authority (CVA) for variant management:

```typescript
import { cva } from 'class-variance-authority';
import { cn } from '@repo/ui/utils';

const buttonVariants = cva(
  'px-4 py-2 rounded font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-blue-500 text-white hover:bg-blue-600',
        outline: 'border border-gray-300 hover:bg-gray-50',
      },
      size: {
        sm: 'px-2 py-1 text-sm',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  }
);

export const Button = ({ variant, size, ...props }) => (
  <button className={buttonVariants({ variant, size })} {...props} />
);
```

### Merging Classes

Use the `cn()` utility to merge Tailwind classes with smart conflict resolution:

```typescript
import { cn } from '@repo/ui/utils';

// cn merges and resolves conflicts
const className = cn(
  'px-4 py-2 bg-blue-500',
  customClasses, // May override bg-blue-500
  conditionalClass && 'text-white'
);
```

## Animation Patterns

Components integrate with Motion (Framer Motion v12) for animations:

```typescript
import { motion } from 'motion/react';

export const AnimatedCard = motion.create(Card);

<AnimatedCard
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</AnimatedCard>
```

## Accessibility

All components follow WCAG 2.1 guidelines:

- **Keyboard Navigation** - Full keyboard support via Radix UI
- **ARIA Labels** - Proper semantic HTML and ARIA attributes
- **Focus Management** - Clear focus indicators
- **Screen Readers** - Compatible with assistive technology

Example:

```typescript
<Button aria-label="Close dialog">×</Button>
<Dialog open={isOpen} onOpenChange={setIsOpen}>
```

## Adding New Components

### Template Structure

```typescript
// src/components/my-component.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary';
}

const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <div
      ref={ref}
      className={cn('base-styles', {
        'variant-styles': variant === 'default',
      }, className)}
      {...props}
    />
  )
);
MyComponent.displayName = 'MyComponent';

export { MyComponent };
```

### Export from Library

Add to `packages/ui/src/index.tsx`:

```typescript
export { MyComponent } from './components/my-component';
export type { MyComponentProps } from './components/my-component';
```

### Testing Pattern

```typescript
import { render, screen } from '@testing-library/react';
import { MyComponent } from './my-component';

describe('MyComponent', () => {
  it('renders with default variant', () => {
    render(<MyComponent>Content</MyComponent>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies secondary variant', () => {
    const { container } = render(<MyComponent variant="secondary" />);
    expect(container.firstChild).toHaveClass('variant-styles');
  });
});
```

## Best Practices

1. **Type Everything** - Use TypeScript for all props and state
2. **Forward Refs** - Components accepting DOM props should forward refs
3. **Composition** - Build complex components from simple ones
4. **Accessibility First** - Use Radix UI primitives, add ARIA as needed
5. **Variant Consistency** - Use CVA for all styled variations
6. **No App Dependencies** - Components should work in any React app

## Related Documentation

- **DESIGN_TOKENS.md** - Color palette, spacing, typography
- **ARCHITECTURE.md** - Component library role in system
- **DEVELOPMENT.md** - Setup and development workflow
