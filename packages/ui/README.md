# @repo/ui

A comprehensive React component library with 300+ components built on Radix UI primitives, styled with Tailwind CSS and class-variance-authority (CVA).

## Overview

This package provides the shared UI components used across the Kiban application. Components follow the shadcn/ui architecture pattern, offering unstyled accessible primitives with Tailwind-based styling.

## Installation

This package is used as a workspace dependency:

```json
{
	"dependencies": {
		"@repo/ui": "*"
	}
}
```

## Usage

### Importing Components

```tsx
import { Button } from '@repo/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/card'
import { Dialog, DialogContent, DialogTrigger } from '@repo/ui/dialog'

function MyComponent() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Hello</CardTitle>
			</CardHeader>
			<CardContent>
				<Button variant="default">Click me</Button>
			</CardContent>
		</Card>
	)
}
```

### Importing Utilities

```tsx
import { cn } from '@repo/ui/utils'

// Merge class names with conflict resolution
;<div className={cn('bg-white p-4', isActive && 'bg-blue-500')} />
```

### Importing Hooks

```tsx
import { useMediaQuery } from '@repo/ui/hooks/use-media-query'
```

## Component Categories

### Form Components

- `button` - Buttons with variants (default, destructive, outline, secondary, ghost, link)
- `input` - Text inputs with consistent styling
- `input-otp` - One-time password input
- `checkbox` - Checkbox with label support
- `radio-group` - Radio button groups
- `select` - Dropdown select menus
- `switch` - Toggle switches
- `slider` - Range sliders
- `form` - Form wrapper with react-hook-form integration
- `calendar` - Date picker calendar
- `textarea` - Multi-line text input

### Layout Components

- `card` - Content container with header, content, footer sections
- `accordion` - Expandable content sections
- `tabs` - Tabbed content panels
- `collapsible` - Collapsible sections
- `resizable` - Resizable panels
- `scroll-area` - Custom scrollable areas
- `separator` - Visual dividers
- `aspect-ratio` - Fixed aspect ratio containers

### Overlay Components

- `dialog` - Modal dialogs
- `alert-dialog` - Confirmation dialogs
- `dropdown-menu` - Dropdown menus
- `context-menu` - Right-click context menus
- `popover` - Floating content panels
- `tooltip` - Hover tooltips
- `hover-card` - Rich hover content
- `sheet` - Slide-out panels

### Navigation Components

- `navigation-menu` - Main navigation menus
- `menubar` - Application menu bars
- `breadcrumb` - Breadcrumb navigation
- `pagination` - Page navigation
- `sidebar` - Application sidebars
- `command` - Command palette (cmdk)

### Feedback Components

- `alert` - Alert messages
- `badge` - Status badges
- `progress` - Progress indicators
- `toast` - Toast notifications (sonner)
- `skeleton` - Loading skeletons

### Data Display

- `table` - Data tables
- `avatar` - User avatars
- `chart` - Charts (recharts)
- `carousel` - Image/content carousels

### Animation Components

The library includes specialized animation components:

- `animated-beam` - Animated connecting lines
- `animated-modal` - Modals with entrance animations
- `animated-text` - Text reveal animations
- `animated-tooltip` - Animated tooltips
- `aurora-background` - Aurora gradient backgrounds
- `background-beams` - Animated beam backgrounds
- `background-gradient-animation` - Gradient animations
- `canvas-reveal-effect` - Canvas reveal effects

### 3D Components

- `3d-card` - 3D hover effect cards
- `3d-marquee` - 3D scrolling marquee
- `3d-pin` - 3D location pins

## Styling Approach

### Class Variance Authority (CVA)

Components use CVA for type-safe variant management:

```tsx
import { cva } from 'class-variance-authority'

const buttonVariants = cva(
	'inline-flex items-center justify-center rounded-md text-sm font-medium',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				destructive: 'bg-destructive text-destructive-foreground',
				outline: 'border border-input bg-background hover:bg-accent',
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
)
```

### Tailwind Merge

The `cn()` utility combines `clsx` and `tailwind-merge` for intelligent class merging:

```tsx
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
	return twMerge(clsx(inputs))
}
```

## Dependencies

Key dependencies used by this package:

- **Radix UI** - Accessible component primitives
- **class-variance-authority** - Variant management
- **tailwind-merge** - Class merging
- **motion** - Animations (framer-motion v12)
- **lucide-react** - Icon library
- **recharts** - Charting library
- **sonner** - Toast notifications
- **cmdk** - Command palette
- **embla-carousel-react** - Carousel functionality
- **react-day-picker** - Calendar/date picker
- **react-hook-form** - Form management
- **zod** - Schema validation
