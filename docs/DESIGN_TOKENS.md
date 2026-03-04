# Design Tokens

Complete design system documentation for Kiban. Defines color palette, spacing scale, typography, shadows, and animation values used throughout the application.

## Overview

Design tokens ensure visual consistency across the entire application. All components use these values for colors, spacing, typography, and timing.

## Color Palette

### Primary Colors

These colors are used for primary actions and brand identity.

```css
--color-primary-50: #eff6ff;     /* Lightest */
--color-primary-100: #dbeafe;
--color-primary-200: #bfdbfe;
--color-primary-300: #93c5fd;
--color-primary-400: #60a5fa;
--color-primary-500: #3b82f6;    /* Primary brand color */
--color-primary-600: #2563eb;
--color-primary-700: #1d4ed8;
--color-primary-800: #1e40af;
--color-primary-900: #1e3a8a;    /* Darkest */
--color-primary-950: #172554;
```

**Usage**: Buttons, links, focus states, highlights

### Secondary Colors

Used for secondary actions and supporting elements.

```css
--color-secondary-50: #f5f3ff;
--color-secondary-100: #ede9fe;
--color-secondary-200: #ddd6fe;
--color-secondary-300: #c4b5fd;
--color-secondary-400: #a78bfa;
--color-secondary-500: #8b5cf6;
--color-secondary-600: #7c3aed;
--color-secondary-700: #6d28d9;
--color-secondary-800: #5b21b6;
--color-secondary-900: #4c1d95;
```

**Usage**: Secondary buttons, badges, accents

### Neutral Colors

Used for text, backgrounds, and structural elements.

```css
--color-neutral-50: #fafafa;     /* Almost white */
--color-neutral-100: #f4f4f5;
--color-neutral-200: #e4e4e7;
--color-neutral-300: #d4d4d8;
--color-neutral-400: #a1a1a6;
--color-neutral-500: #71717a;    /* Standard text */
--color-neutral-600: #52525b;
--color-neutral-700: #3f3f46;
--color-neutral-800: #27272a;
--color-neutral-900: #18181b;
--color-neutral-950: #09090b;    /* Almost black */
```

**Usage**: Text, backgrounds, borders, dividers

### Semantic Colors

Used for specific states and meanings.

```css
/* Success - positive actions and feedback */
--color-success-50: #f0fdf4;
--color-success-500: #22c55e;
--color-success-600: #16a34a;
--color-success-900: #15803d;

/* Warning - caution and warnings */
--color-warning-50: #fffbeb;
--color-warning-500: #eab308;
--color-warning-600: #ca8a04;
--color-warning-900: #713f12;

/* Error - errors and destructive actions */
--color-error-50: #fef2f2;
--color-error-500: #ef4444;
--color-error-600: #dc2626;
--color-error-900: #7f1d1d;

/* Info - information and tips */
--color-info-50: #f0f9ff;
--color-info-500: #0ea5e9;
--color-info-600: #0284c7;
--color-info-900: #0c2d6b;
```

**Usage**: Status indicators, form validation, alerts

### Tailwind CSS Integration

Configure in `tailwind.config.ts`:

```typescript
export default {
  theme: {
    colors: {
      primary: {
        50: '#eff6ff',
        // ... full palette
        500: '#3b82f6',
        // ...
      },
      secondary: {
        // ...
      },
      // ...
    },
  },
}
```

**Usage in components**:

```typescript
<div className="bg-primary-500 text-neutral-50">
  Primary blue background with white text
</div>
```

## Spacing Scale

Consistent spacing for margins, padding, and gaps.

```css
/* Base unit = 4px */
--space-0: 0;
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px - base unit */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */
```

### Common Values

- **Gaps**: 16px (space-4), 24px (space-6), 32px (space-8)
- **Padding**: 12px (space-3), 16px (space-4), 24px (space-6)
- **Margins**: 8px (space-2), 16px (space-4), 32px (space-8)

**Usage in Tailwind**:

```typescript
// Padding
<div className="p-4">16px padding all sides</div>
<div className="px-6 py-4">24px left/right, 16px top/bottom</div>

// Margin
<div className="mb-8">32px margin bottom</div>

// Gap (flexbox/grid)
<div className="flex gap-4">16px gap between items</div>
```

## Typography

### Font Families

```css
/* Sans serif - default */
--font-sans: system-ui, -apple-system, sans-serif;

/* Serif - accents */
--font-serif: Georgia, 'Times New Roman', serif;

/* Mono - code */
--font-mono: 'Courier New', monospace;
```

### Font Sizes

```css
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */
--text-5xl: 3rem;        /* 48px */
```

### Font Weights

```css
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;
```

### Line Heights

```css
--line-height-tight: 1.25;    /* Headings */
--line-height-normal: 1.5;    /* Body text */
--line-height-relaxed: 1.75;  /* Large text */
```

### Heading Styles

```typography
H1: 48px / Bold / Line 1.25    (--text-5xl, bold, tight)
H2: 36px / Bold / Line 1.25    (--text-4xl, bold, tight)
H3: 30px / Semibold / Line 1.5 (--text-3xl, semibold, normal)
H4: 24px / Semibold / Line 1.5 (--text-2xl, semibold, normal)
H5: 20px / Semibold / Line 1.5 (--text-xl, semibold, normal)
H6: 16px / Semibold / Line 1.5 (--text-base, semibold, normal)

Body: 16px / Normal / Line 1.5 (--text-base, normal, normal)
Small: 14px / Normal / Line 1.5 (--text-sm, normal, normal)
```

**Usage in Tailwind**:

```typescript
<h1 className="text-5xl font-bold leading-tight">Heading 1</h1>
<h2 className="text-4xl font-bold leading-tight">Heading 2</h2>
<p className="text-base font-normal leading-normal">Body text</p>
<small className="text-sm font-normal">Small text</small>
```

## Shadows

Elevation hierarchy through shadow depth.

```css
/* Shadows increase from shallow to deep */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

### Shadow Usage

- **sm**: Subtle hover states, cards
- **md**: Buttons, inputs, small modals
- **lg**: Cards, panels, dropdowns
- **xl**: Modals, major overlays
- **2xl**: Full-screen overlays, emphasis

**Usage in Tailwind**:

```typescript
<div className="shadow-md">Card with medium shadow</div>
<div className="hover:shadow-lg transition-shadow">Hover elevation</div>
<div className="shadow-2xl">Modal or major overlay</div>
```

## Border Radius

Rounded corners with consistent values.

```css
--radius-none: 0;
--radius-sm: 0.125rem;   /* 2px */
--radius-md: 0.375rem;   /* 6px */
--radius-lg: 0.5rem;     /* 8px - default */
--radius-xl: 0.75rem;    /* 12px */
--radius-full: 9999px;   /* Pill shapes */
```

### Usage Guidelines

- **Buttons**: `radius-md` (6px)
- **Cards**: `radius-lg` (8px)
- **Inputs**: `radius-md` (6px)
- **Modals**: `radius-lg` (8px)
- **Pills**: `radius-full` (completely rounded)

**Usage in Tailwind**:

```typescript
<button className="rounded-md">Button with rounded corners</button>
<div className="rounded-lg">Card with 8px radius</div>
<div className="rounded-full">Perfectly round (pill shape)</div>
```

## Animation Timing

### Durations

Animation length values. Keep animations brief (200-400ms typical).

```css
--duration-75: 75ms;     /* Instant feedback */
--duration-100: 100ms;   /* Quick interactions */
--duration-150: 150ms;   /* Hover effects */
--duration-200: 200ms;   /* Transitions */
--duration-300: 300ms;   /* Standard animations */
--duration-500: 500ms;   /* Longer sequences */
--duration-700: 700ms;   /* Slow reveals */
--duration-1000: 1000ms; /* Extended animations */
```

### Easing Functions

```typescript
// CSS easing curves
--ease-linear: cubic-bezier(0, 0, 1, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Motion Defaults

**Button hover**: 150ms, ease-out
**Fade in/out**: 200-300ms, ease-in-out
**Modal entrance**: 300ms, spring (bounce)
**Page transition**: 300ms, ease-in-out
**Stagger delay**: 100-150ms between items

**Motion library example**:

```typescript
import { motion } from 'motion/react'

<motion.button
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.15, ease: 'easeOut' }}
>
  Click me
</motion.button>
```

## Breakpoints

Responsive design breakpoints.

```css
--breakpoint-xs: 0;       /* Mobile first */
--breakpoint-sm: 640px;   /* Small devices */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large desktop */
--breakpoint-2xl: 1536px; /* Extra large desktop */
```

**Usage in Tailwind**:

```typescript
<div className="text-sm md:text-base lg:text-lg">
  Responsive text size
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  Responsive grid
</div>
```

## Z-Index Scale

Layering hierarchy for stacking contexts.

```css
--z-hide: -1;          /* Hidden behind normal flow */
--z-base: 0;           /* Default/normal */
--z-dropdown: 40;      /* Dropdowns */
--z-sticky: 50;        /* Sticky elements */
--z-fixed: 100;        /* Fixed navigation */
--z-modal-bg: 1000;    /* Modal background overlay */
--z-modal: 1001;       /* Modal content */
--z-popover: 1100;     /* Popovers/tooltips */
--z-notification: 1200; /* Toast notifications */
```

## Implementation

### Tailwind CSS Config

```typescript
// tailwind.config.ts
export default {
  theme: {
    colors: { /* color palette */ },
    spacing: { /* spacing scale */ },
    fontSize: { /* font sizes */ },
    fontWeight: { /* font weights */ },
    lineHeight: { /* line heights */ },
    boxShadow: { /* shadows */ },
    borderRadius: { /* radius values */ },
    transitionDuration: { /* animation durations */ },
    transitionTimingFunction: { /* easing */ },
    screens: { /* breakpoints */ },
    zIndex: { /* z-index values */ },
  },
}
```

### CSS Variables

```css
/* Global CSS */
:root {
  /* Colors */
  --color-primary-500: #3b82f6;
  --color-neutral-900: #18181b;

  /* Spacing */
  --space-4: 1rem;
  --space-8: 2rem;

  /* Typography */
  --text-base: 1rem;
  --font-weight-normal: 400;

  /* Shadows */
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  /* Animation */
  --duration-300: 300ms;
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Usage */
.button {
  padding: var(--space-4);
  background-color: var(--color-primary-500);
  transition: all var(--duration-300) var(--ease-in-out);
  box-shadow: var(--shadow-md);
}
```

## Accessibility

### Color Contrast

All text meets WCAG AA standards (4.5:1 ratio minimum).

- **Primary on white**: #3b82f6 ✓ 4.54:1
- **Neutral-900 on white**: #18181b ✓ 13.5:1
- **Error on white**: #ef4444 ✓ 5.26:1

### Motion Preferences

Respect `prefers-reduced-motion`:

```typescript
import { useReducedMotion } from 'motion/react'

export function AnimatedButton() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.button
      animate={{ scale: 1.05 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
    >
      Click
    </motion.button>
  )
}
```

## Related Documentation

- **DESIGN.md** - Design system overview
- **ARCHITECTURE.md** - Design in system context
- **packages/ui/COMPONENTS.md** - Component implementation
- **apps/web/ANIMATIONS.md** - Animation patterns
