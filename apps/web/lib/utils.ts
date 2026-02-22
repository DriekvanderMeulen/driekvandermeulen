import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges class names using clsx and tailwind-merge.
 *
 * Combines multiple class values into a single string, intelligently
 * merging Tailwind CSS classes to avoid conflicts (e.g., `p-4 p-2` becomes `p-2`).
 *
 * @param inputs - Class values to merge (strings, arrays, objects, or conditional values)
 * @returns Merged class string with Tailwind conflicts resolved
 *
 * @example
 * ```typescript
 * // Basic usage
 * cn('px-4 py-2', 'bg-blue-500')
 * // => 'px-4 py-2 bg-blue-500'
 *
 * // Conditional classes
 * cn('btn', isActive && 'btn-active', isDisabled && 'opacity-50')
 *
 * // Tailwind conflict resolution
 * cn('p-4', 'p-2')
 * // => 'p-2' (later value wins)
 *
 * // With CVA variants
 * cn(buttonVariants({ variant, size }), className)
 * ```
 */
export function cn(...inputs: Array<ClassValue>) {
	return twMerge(clsx(inputs))
}
