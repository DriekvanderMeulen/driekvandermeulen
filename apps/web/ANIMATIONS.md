# Animation Strategy and Patterns

Comprehensive guide to animation framework selection, component patterns, and best practices for Kiban.

## Framework Decision Matrix

### Motion (framer-motion v12)

**Selected for:** Component-level animations, transitions, and gestures

**Strengths:**
- React-optimized API
- Simple declarative syntax
- Built-in gesture recognition (whileHover, whileTap)
- Layout animations with layoutId
- Smooth performance for most use cases

**Use Cases:**
- Page transitions
- Component entrance/exit
- Hover effects
- Drag interactions
- Staggered children animations
- Toggle animations

**Example:**
```tsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

### GSAP

**Reserved for:** Complex timeline-based sequences (future expansion)

**Why Reserved:**
- Excellent for synchronized multi-element timelines
- Superior performance for complex sequences
- Better stagger control
- Timeline reversibility

**Future Use Cases:**
- Multi-stage choreographed sequences
- Scrubber/timeline UI
- Complex looping sequences

**Current Status:** Not yet integrated; use Motion for now

### Tailwind CSS Animations

**Used for:** Static animations, hover states, utility-driven effects

**Strengths:**
- No JavaScript overhead
- Built into the design system
- Easily discoverable and consistent

**Examples:**
```tsx
<div className="animate-spin">Loading</div>
<div className="transition-all duration-300 hover:scale-105">Hover me</div>
```

### WebGL/Three.js Animations

**Used for:** 3D scene animations

**Frameworks:**
- @react-three/fiber `useFrame` hook for frame-by-frame updates
- Three.js animation mixer for skeletal animations
- GPU-based transforms via vertex shaders

## Animation Patterns

### Page Transitions

Use `AnimatePresence` with `motion` for route changes:

```tsx
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'

export function PageTransition({ children }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

**Usage in Layout:**
```tsx
// app/layout.tsx
export default function Layout({ children }) {
  return <PageTransition>{children}</PageTransition>
}
```

### Staggered Children

Animate multiple children with delays:

```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,  // 100ms between children
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
}

export function List({ items }) {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item) => (
        <motion.li key={item.id} variants={itemVariants}>
          {item.name}
        </motion.li>
      ))}
    </motion.ul>
  )
}
```

### Entrance Animations

Animate in content on first load:

```tsx
const slideInVariants = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

export function HeroSection() {
  return (
    <motion.section
      variants={slideInVariants}
      initial="hidden"
      animate="visible"
    >
      <h1>Welcome to Kiban</h1>
    </motion.section>
  )
}
```

### Gesture Animations

Respond to user interactions:

```tsx
export function InteractiveCard() {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        shadow: '0 10px 30px rgba(0,0,0,0.3)',
      }}
      whileTap={{
        scale: 0.95,
      }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      Click or hover me
    </motion.div>
  )
}
```

### Layout Animations

Smoothly animate layout changes:

```tsx
import { motion } from 'framer-motion'

export function Toggle() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div layout>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close' : 'Open'}
      </button>

      {isOpen && (
        <motion.div
          layoutId="expandable"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Expanded content
        </motion.div>
      )}
    </motion.div>
  )
}
```

### Scroll-Triggered Animations

Animate elements as they enter viewport:

```tsx
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

export function ScrollReveal({ children }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}
```

## Timing Values

### Standard Durations

- **Instant**: 0.1s - Quick feedback (button press)
- **Fast**: 0.2-0.3s - Standard interaction feedback
- **Normal**: 0.3-0.5s - Page transitions, medium animations
- **Slow**: 0.5-1.0s - Emphasized animations, hero elements
- **Very Slow**: 1.0-2.0s - Entrance animations, cinematic effects

### Easing Functions

- **easeIn**: Motion starts slow, accelerates (`easeIn`)
- **easeOut**: Motion starts fast, decelerates (`easeOut`)
- **easeInOut**: Symmetric acceleration/deceleration (`easeInOut`)
- **linear**: Constant speed (rarely used)
- **spring**: Natural bounce (`{ type: 'spring', stiffness: 300 }`)
- **backIn/backOut**: Overshoots target slightly
- **anticipate**: Scales back before releasing

**Default in Framer Motion:**
```tsx
transition={{
  duration: 0.5,
  ease: 'easeInOut',
  type: 'tween',  // or 'spring'
}}
```

## Component Animation Library

### Button Animations

```tsx
export function AnimatedButton({ children, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}
```

### Card Hover Effects

```tsx
const cardVariants = {
  rest: {
    y: 0,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  hover: {
    y: -8,
    boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
  },
}

export function CardComponent() {
  return (
    <motion.div
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      transition={{ duration: 0.3 }}
    >
      Card content
    </motion.div>
  )
}
```

### Modal Entrance

```tsx
export function Modal({ isOpen, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center"
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

### Form Input Focus

```tsx
export function AnimatedInput() {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <motion.div>
      <motion.label
        animate={{
          scale: isFocused ? 0.85 : 1,
          y: isFocused ? -20 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        Email
      </motion.label>
      <input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </motion.div>
  )
}
```

### Loading Spinner

```tsx
export function LoadingSpinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
    />
  )
}
```

## Three.js Animations

### useFrame Hook

Update objects every frame:

```tsx
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export function RotatingBox() {
  const meshRef = useRef()

  useFrame(() => {
    meshRef.current.rotation.x += 0.01
    meshRef.current.rotation.y += 0.01
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  )
}
```

### Skeletal Animation (GLB Models)

```tsx
import { useGLTF, useAnimations } from '@react-three/drei'

export function CharacterModel({ url }) {
  const { scene, animations } = useGLTF(url)
  const { actions } = useAnimations(animations, scene)

  useEffect(() => {
    // Play 'walk' animation
    actions['walk']?.play()
  }, [actions])

  return <primitive object={scene} />
}
```

## Performance Optimization

### Reduce Animation Complexity

```tsx
// ✅ Good: Simple animations
<motion.div
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
/>

// ❌ Avoid: Complex transform chains
<motion.div
  animate={{
    x: 0, y: 0, z: 0,
    rotateX: 0, rotateY: 0, rotateZ: 0,
    scaleX: 1, scaleY: 1, scaleZ: 1,
    skewX: 0, skewY: 0,
  }}
/>
```

### Use GPU-Accelerated Properties

Animations using these properties are fast:
- `transform` (translate, rotate, scale, skew)
- `opacity`
- `filter`

Avoid animating:
- `width`, `height`
- `position`, `margin`, `padding`
- `background-color` (use opacity filters instead)

### Lazy Load Animation Libraries

```tsx
const motion = lazy(() => import('framer-motion'))

<Suspense fallback={<div />}>
  <motion.div>Animated content</motion.div>
</Suspense>
```

### Reduce `will-change` Usage

Only apply to animated elements:

```css
/* Avoid */
* {
  will-change: transform;
}

/* Good */
.animated-element {
  will-change: transform;
}
```

## Accessibility Considerations

### Respect prefers-reduced-motion

```tsx
import { useReducedMotion } from 'framer-motion'

export function AnimatedComponent() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      animate={{ x: 100 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.5,
      }}
    >
      Content
    </motion.div>
  )
}
```

### Meaningful Animations Only

- Don't animate decorative elements excessively
- Ensure animations serve user experience
- Provide instant fallback (no animation) for users who need it

## Testing Animations

### Unit Tests

```tsx
import { render } from '@testing-library/react'
import { AnimatedComponent } from './animated-component'

describe('AnimatedComponent', () => {
  it('renders initial state', () => {
    const { container } = render(<AnimatedComponent />)
    expect(container).toBeInTheDocument()
  })
})
```

### Visual Regression Testing

Use tools like Chromatic for detecting animation changes:

```bash
npx chromatic --skip-build
```

## Debugging Animations

### Browser DevTools

1. Open Chrome DevTools
2. Go to Rendering tab
3. Enable "Paint flashing" to see what's animating
4. Check Performance tab for frame rate issues

### Framer Motion DevTools

```bash
npm install framer-motion-devtools
```

```tsx
import { MotionConfig } from 'framer-motion'
import { useDebugDevtools } from 'framer-motion-devtools'

export function App() {
  useDebugDevtools()
  return <MotionConfig>{/* ... */}</MotionConfig>
}
```

## Common Patterns Reference

### Fade In
```tsx
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.3 }}
```

### Slide Down
```tsx
initial={{ opacity: 0, y: -20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.3 }}
```

### Scale Pop
```tsx
initial={{ opacity: 0, scale: 0.8 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ type: 'spring', stiffness: 300 }}
```

### Rotate Spin
```tsx
animate={{ rotate: 360 }}
transition={{ duration: 2, repeat: Infinity }}
```

## Related Documentation

- `ARCHITECTURE.md` - System design
- `THREE.md` - 3D animations
- `DESIGN_TOKENS.md` - Timing tokens
- Framer Motion: https://www.framer.com/motion/
- GSAP: https://gsap.com/
