# Navbar Motion Animations Design

**Date:** 2026-02-02
**Status:** Approved

## Overview

Refactor the navbar component to use Motion (framer-motion) library for fluid animations. Replace CSS transitions with choreographed animations for the navbar shrink/grow behavior, logo morph transition, and link appearance/disappearance.

## Design Decisions

### Animation Timing
- **Duration:** 200ms (fast and snappy)
- **Easing:** ease-out for all animations
- **Stagger:** 25ms delay between individual links for cascade effect

### Animation Architecture

#### 1. Motion Integration
- Replace static elements with `motion.*` components
- Use `AnimatePresence` for enter/exit animations
- Define reusable animation variants for each element type
- Use `layout` prop for automatic size transitions

#### 2. Component Structure
```
motion.nav (with layout prop)
└── container
    ├── logo column
    │   ├── AnimatePresence
    │   │   ├── logo image (motion.div)
    │   │   └── logo text (motion.div)
    ├── content columns (×3)
    │   ├── heading
    │   └── AnimatePresence
    │       └── links container (motion.div with stagger)
    │           ├── link 1 (motion wrapper)
    │           └── link 2 (motion wrapper)
```

## Animation Specifications

### Logo Morph Transition

**Logo Image:**
- Expanded state: `opacity: 1, scale: 1`
- Exit (scrolling down): `opacity: 0, scale: 0.5`
- Transform origin: `top left`

**Logo Text:**
- Initial (appearing): `opacity: 0, scale: 0.5`
- Compact state: `opacity: 1, scale: 1`
- Exit (scrolling up): `opacity: 0, scale: 0.5`
- Transform origin: `top left`

**Behavior:** Logo image shrinks and fades while text simultaneously grows and fades in, creating smooth morphing effect.

### Links Staggered Animation

**Container (motion.div):**
- Variants with `staggerChildren: 0.025` (25ms)
- Controls cascade timing for child links

**Individual Links:**
- Visible state: `opacity: 1, y: 0`
- Hidden state: `opacity: 0, y: -8`
- Slight upward slide adds directionality
- Each link starts animation 25ms after previous

**Flow:**
- Scrolling down: First link fades/slides, then second after 25ms
- Scrolling up: Reverse cascade with same timing
- Total animation completes within 200ms window

### Navbar Shrink/Grow

**Container Animation:**
- Use `layout` prop on `motion.nav`
- Automatically animates padding changes:
  - Expanded: `padding: 0.75rem 2rem`
  - Compact: `padding: 0.5rem 2rem`
- Transition: `duration: 0.2, ease: "easeOut"`

## Implementation Details

### Scroll Detection
- Keep existing scroll logic unchanged
- State changes at scrollY <= 10 and scrollY > 100
- State triggers all Motion animations simultaneously

### Performance Optimizations
- Add `will-change: transform, opacity` for animating elements
- Keep `passive: true` on scroll listener
- Optional: Use `layoutId` for transforming elements

### CSS Cleanup
Remove CSS transitions (Motion handles all animations):
- Remove `transition: color 0.2s ease` from `.column`
- Remove `transition: color 0.2s ease` from `.link`
- Consider moving hover effects to Motion gestures or keep instant

## Technical Requirements

- Motion library: Already installed (`motion: ^12.29.2`)
- No additional dependencies needed
- TypeScript compatibility maintained
- Next.js Image component preserved

## Testing Considerations

- Fast 200ms timing requires testing on slower devices
- Can adjust to 250ms if animations feel too abrupt
- Verify smooth performance during rapid scrolling
- Test cascade effect visibility

## Success Criteria

- [ ] All navbar size changes animate smoothly
- [ ] Logo morphs seamlessly between image and text
- [ ] Links cascade with visible but fast stagger
- [ ] No layout shift during animations
- [ ] Maintains 60fps performance during scroll
- [ ] Animations feel responsive and polished
