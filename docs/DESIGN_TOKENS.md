# Design Tokens

Design system documentation including color palette, spacing, typography, and animation timing.

## Color Palette

### Primary Colors
- **Blue**: `#3b82f6` - Primary action color
- **Blue Dark**: `#1e40af` - Hover state, darker accent
- **Blue Light**: `#93c5fd` - Disabled, secondary state

### Secondary Colors
- **Purple**: `#8b5cf6` - Alternative action
- **Pink**: `#ec4899` - Attention, warnings
- **Cyan**: `#06b6d4` - Info, highlights

### Neutral Colors
- **White**: `#ffffff` - Background, text on dark
- **Gray 50**: `#f9fafb` - Light background
- **Gray 100**: `#f3f4f6` - Input background
- **Gray 200**: `#e5e7eb` - Border, subtle divider
- **Gray 500**: `#6b7280` - Secondary text
- **Gray 900**: `#111827` - Primary text, dark background

### Semantic Colors
- **Success**: `#10b981` - Positive actions, confirmations
- **Error**: `#ef4444` - Errors, destructive actions
- **Warning**: `#f59e0b` - Warnings, attention
- **Info**: `#0ea5e9` - Information, neutral messages

## Spacing Scale

Based on 4px base unit (Tailwind default):

```
0    = 0
1    = 4px
2    = 8px
3    = 12px
4    = 16px (0.25rem)
6    = 24px
8    = 32px
12   = 48px
16   = 64px
20   = 80px
24   = 96px
32   = 128px
```

**Usage:**
- **Padding**: `p-4` = 16px padding
- **Margin**: `m-2` = 8px margin
- **Gap**: `gap-6` = 24px gap between children

## Typography

### Font Families
- **Sans**: Inter (default)
  - Used for UI text, body, headings
- **Mono**: Fira Code (developer preference)
  - Used in code snippets, terminal, technical content

### Font Sizes

```
xs  = 12px (0.75rem)
sm  = 14px (0.875rem)
base = 16px (1rem)
lg  = 18px (1.125rem)
xl  = 20px (1.25rem)
2xl = 24px (1.5rem)
3xl = 30px (1.875rem)
4xl = 36px (2.25rem)
5xl = 48px (3rem)
```

### Font Weights

- **Light**: 300 - Thin, less emphasis
- **Normal**: 400 - Default text, body
- **Medium**: 500 - Form labels, slightly emphasized
- **Semibold**: 600 - Subheadings, buttons
- **Bold**: 700 - Headings, strong emphasis

### Line Heights

```
tight    = 1.25
snug     = 1.375
normal   = 1.5 (default)
relaxed  = 1.625
loose    = 2
```

### Type Scale

**Headings:**
```
h1: 36px | Semibold | Line height 1.2
h2: 30px | Semibold | Line height 1.3
h3: 24px | Semibold | Line height 1.4
h4: 20px | Semibold | Line height 1.4
h5: 18px | Medium   | Line height 1.5
h6: 16px | Medium   | Line height 1.5
```

**Body:**
```
Large:  18px | Normal | Line height 1.6
Base:   16px | Normal | Line height 1.6 (default)
Small:  14px | Normal | Line height 1.5
Extra Small: 12px | Normal | Line height 1.5
```

## Animation Timing

### Durations

```
instant = 0ms      - No delay
fast    = 150ms    - Quick feedback
normal  = 300ms    - Standard transition
slow    = 500ms    - Emphasized
slower  = 1000ms   - Cinematic
```

### Easing Functions

```
linear       - Constant speed
easeIn       - Slow start, fast end
easeOut      - Fast start, slow end
easeInOut    - Symmetric acceleration
spring       - Bouncy, natural motion
```

**CSS Variables:**
```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Animation Timing Examples

```
Button hover: 150ms easeOut
Page transition: 300ms easeInOut
Modal entrance: 300ms easeOut
Fade in: 300ms easeOut
Slide in: 400ms easeOut
Stagger children: 100ms delay between
```

## Shadows

```
xs   = 0 1px 2px rgba(0,0,0,0.05)
sm   = 0 1px 3px rgba(0,0,0,0.1)
base = 0 4px 6px rgba(0,0,0,0.1)
md   = 0 10px 15px rgba(0,0,0,0.1)
lg   = 0 20px 25px rgba(0,0,0,0.1)
xl   = 0 25px 50px rgba(0,0,0,0.1)
2xl  = 0 25px 50px rgba(0,0,0,0.25)
```

**Usage:** `shadow-lg` on hover effects

## Border Radius

```
none = 0
sm   = 2px
base = 4px
md   = 6px
lg   = 8px
xl   = 12px
2xl  = 16px
full = 9999px (circle/pill)
```

**Usage:**
- Buttons: `rounded-md`
- Cards: `rounded-lg`
- Pills: `rounded-full`
- Slight rounding: `rounded-sm`

## Breakpoints

Responsive design breakpoints:

```
sm   = 640px   - Small phones
md   = 768px   - Tablets
lg   = 1024px  - Desktops
xl   = 1280px  - Large screens
2xl  = 1536px  - Extra large
```

**Usage:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* 1 column on mobile, 2 on tablet, 3 on desktop */}
</div>
```

## Opacity

```
0    = transparent
5    = 0.05
10   = 0.1
20   = 0.2
...
100  = 1 (opaque)
```

**Usage:** `opacity-50` for 50% transparency

## Z-Index Scale

```
0     = auto (default)
10    = dropdown menu, tooltips
20    = sticky header, sidebar
30    = modal backdrop
40    = modal/dialog
50    = popover, tooltip (above modal)
```

## Implementation

### Using Tokens in Components

**Colors:**
```tsx
<div className="bg-blue-600 text-white">Primary button</div>
<div className="bg-gray-100 text-gray-900">Default background</div>
```

**Spacing:**
```tsx
<div className="p-4 m-2 gap-6">Content with spacing</div>
```

**Typography:**
```tsx
<h1 className="text-4xl font-semibold leading-tight">Heading</h1>
<p className="text-base font-normal leading-relaxed">Body text</p>
```

**Animations:**
```tsx
<motion.div
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3, ease: 'easeOut' }}
>
  Animated content
</motion.div>
```

## Design Consistency

### Principles

1. **Use tokens consistently** - Don't use arbitrary values
2. **Maintain hierarchy** - Scale spacing and sizing systematically
3. **Respect contrast** - Ensure WCAG AA compliance (4.5:1 for text)
4. **Intentional motion** - Animate only to enhance UX, not distract
5. **Mobile first** - Design for small screens, enhance for larger

### Accessibility

- **Color**: Don't rely on color alone; use text, icons, or patterns
- **Contrast**: Text should have 4.5:1 ratio minimum
- **Motion**: Respect `prefers-reduced-motion` setting
- **Touch**: Interactive targets should be 44x44px minimum

## Related Documentation

- [ARCHITECTURE.md](../ARCHITECTURE.md) - System design
- [packages/ui/COMPONENTS.md](../packages/ui/COMPONENTS.md) - Component library
- [apps/web/ANIMATIONS.md](../apps/web/ANIMATIONS.md) - Animation patterns
- Tailwind CSS Docs: https://tailwindcss.com/docs
- Radix Color: https://www.radix-ui.com/colors
