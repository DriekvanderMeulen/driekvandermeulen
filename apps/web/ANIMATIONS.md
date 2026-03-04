# Animation System Guide

Complete guide to animations in the Kiban application, including the Motion (Framer Motion v12) framework, animation patterns, component integration, and design specifications.

## Overview

The application uses **Motion** (Framer Motion v12) for GPU-accelerated animations. Motion provides:

- React 19 compatible animation primitives
- Hardware-accelerated transforms
- Gesture detection (hover, tap, drag)
- Layout animations
- Variant system for complex sequences

**Design Principle**: Animations enhance UX, not distract. Keep animations subtle (200-400ms), purposeful, and accessible.

## Motion Library Basics

### Installation

Motion is configured in the monorepo dependencies:

```bash
bun install motion
```

### Basic Animation

```typescript
import { motion } from 'motion/react';
import { useState } from 'react';

export function BasicAnimation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => setIsOpen(!isOpen)}
    >
      Click to toggle
    </motion.div>
  );
}
```

## Animation Patterns

### 1. Entrance Animation

**Use case**: Fade in content on mount

```typescript
export function FadeInOnMount({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
```

**Timing**: 300-400ms fade-in

---

### 2. Hover Effects

**Use case**: Interactive feedback on button/card hover

```typescript
export function HoverCard() {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="cursor-pointer"
    >
      Hover me
    </motion.div>
  );
}
```

**Timing**: Spring animation for snappy feel
**Distance**: 4-8px upward on hover

---

### 3. Staggered List Animation

**Use case**: Animate items in sequence

```typescript
import { motion } from 'motion/react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function AnimatedList({ items }) {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {items.map((item) => (
        <motion.li key={item.id} variants={itemVariants}>
          {item.name}
        </motion.li>
      ))}
    </motion.ul>
  );
}
```

**Timing**: 100ms stagger between items, 200ms delay before start

---

### 4. Modal/Dialog Animation

**Use case**: Smooth dialog entrance and exit

```typescript
export function AnimatedDialog({ isOpen, onClose, children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/50"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
```

**Timing**: 200ms fade, 300ms spring for dialog box

---

### 5. Page Transition

**Use case**: Smooth transition between page routes

```typescript
export function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
```

**Timing**: 300ms fade + slide

---

### 6. Drag and Drop

**Use case**: Draggable UI elements

```typescript
export function DraggableBox() {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      dragElastic={0.2}
      dragTransition={{ power: 0.3, restDelta: 0.001 }}
      whileDrag={{ scale: 1.1 }}
      className="w-24 h-24 bg-blue-500 rounded cursor-grab"
    />
  );
}
```

**Tips**: Set `dragConstraints` to limit movement, adjust `dragElastic` for bounce

---

## Transition Timing

### Transition Types

**Instant** - No animation, immediate change
```typescript
transition={{ duration: 0 }}
```

**Linear** - Constant speed (60-80ms for quick feedback)
```typescript
transition={{ duration: 0.2, ease: 'linear' }}
```

**Easing** - Acceleration/deceleration (200-400ms)
```typescript
transition={{ duration: 0.3, ease: 'easeInOut' }}
```

**Spring** - Bouncy, natural motion (300-500ms)
```typescript
transition={{ type: 'spring', stiffness: 300, damping: 20 }}
```

### Recommended Timings

| Animation | Duration | Type |
|-----------|----------|------|
| Button hover | 150ms | easeOut |
| Fade in/out | 200-300ms | easeInOut |
| Modal entrance | 300ms | spring |
| Page transition | 300-400ms | easeInOut |
| Loading spinner | Infinite | linear |
| Stagger delay | 100-150ms | - |

## Gesture Animations

### Hover State

```typescript
<motion.button
  whileHover={{ backgroundColor: '#0066cc', scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: 'spring', stiffness: 300 }}
>
  Click me
</motion.button>
```

### Focus State (Keyboard)

```typescript
<motion.input
  whileFocus={{ borderColor: '#0066cc', boxShadow: '0 0 0 3px rgba(0, 102, 204, 0.1)' }}
  transition={{ duration: 0.2 }}
/>
```

## Component Wrappers

### Creating Animated Components

Wrap components to add animation support:

```typescript
import { motion } from 'motion/react';
import { Button } from '@repo/ui/button';

const AnimatedButton = motion.create(Button);

export function MyButton() {
  return (
    <AnimatedButton
      whileHover={{ scale: 1.05 }}
      variant="primary"
    >
      Click me
    </AnimatedButton>
  );
}
```

## Animation Design Specs

### Entrance Animations

**Fade + Slide Down**
```typescript
initial={{ opacity: 0, y: -10 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.3 }}
```

**Fade + Scale**
```typescript
initial={{ opacity: 0, scale: 0.95 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.25 }}
```

**Slide In from Left**
```typescript
initial={{ opacity: 0, x: -20 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.3 }}
```

### Exit Animations

**Fade + Slide Up**
```typescript
exit={{ opacity: 0, y: 10 }}
transition={{ duration: 0.2 }}
```

**Fade + Scale Out**
```typescript
exit={{ opacity: 0, scale: 0.9 }}
transition={{ duration: 0.2 }}
```

### Loading States

**Spinning Loader**
```typescript
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
>
  <Loader />
</motion.div>
```

**Pulsing Skeleton**
```typescript
<motion.div
  animate={{ opacity: [0.5, 1, 0.5] }}
  transition={{ duration: 1.5, repeat: Infinity }}
  className="h-12 bg-gray-200 rounded"
/>
```

## Performance Considerations

### GPU-Accelerated Animations

Animate only these properties for best performance:
- `opacity`
- `transform` (scale, rotate, x, y)
- `filter`

Avoid animating:
- `width`, `height` (use scale instead)
- `top`, `left` (use x, y instead)
- `color` (if possible, use opacity + pre-colored layers)

### Using `will-change`

For heavy animations, add CSS hint:

```typescript
<motion.div
  style={{ willChange: 'transform' }}
  animate={{ x: 100 }}
/>
```

### Reduce Motion Preference

Respect user accessibility settings:

```typescript
import { useReducedMotion } from 'motion/react';

export function AnimatedButton() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      animate={{ scale: 1.05 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
    >
      Click
    </motion.button>
  );
}
```

## Layout Animations

### Automatic Layout Animations

Motion can animate layout shifts automatically:

```typescript
<motion.div layout>
  {items.map((item) => (
    <motion.div key={item.id} layout>
      {item.name}
    </motion.div>
  ))}
</motion.div>
```

When items are added/removed, Motion animates the layout change.

## Motion vs GSAP Decision Matrix

| Feature | Motion | GSAP |
|---------|--------|------|
| React Integration | Excellent | Good |
| Learning Curve | Easy | Medium |
| Bundle Size | Small (~50KB) | Large (~100KB) |
| Animations | Web standard | Advanced |
| Gesture Support | Built-in | Plugin |
| TypeScript | Full support | Partial |

**Use Motion for**: Standard UI animations, React-first, smaller bundles
**Use GSAP for**: Complex timeline sequences, SVG animations, advanced controls

**Current Choice**: Motion (Framer Motion v12) for all UI animations

## Best Practices

1. **Keep it Brief** - Most animations should complete in 200-400ms
2. **Purposeful Motion** - Only animate when it improves UX
3. **Consistent Easing** - Use same easing across similar interactions
4. **Test with Performance Profiler** - Ensure animations run at 60fps
5. **Respect Accessibility** - Always check `prefers-reduced-motion`
6. **Use Spring for Natural Feel** - Spring animations feel more organic
7. **Group Related Animations** - Use variants to coordinate multiple elements
8. **Avoid Animating Layout** - Use transform (scale, x, y) instead

## Related Documentation

- **DESIGN_TOKENS.md** - Timing and easing values
- **THREE.md** - 3D animations in Three.js scenes
- **packages/ui/COMPONENTS.md** - Component animation patterns
- **ARCHITECTURE.md** - Animation role in system design
