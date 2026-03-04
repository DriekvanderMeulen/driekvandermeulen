import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges multiple CSS class values with intelligent conflict resolution.
 *
 * Combines clsx for conditional class handling with tailwind-merge for resolving
 * conflicting Tailwind CSS classes. This is essential for component variants and
 * dynamic styling where classes might override each other.
 *
 * @param inputs - Variable number of class values (strings, objects, arrays)
 * @returns Merged class string with conflicts resolved
 *
 * @example
 * ```ts
 * cn('px-4 py-2', 'px-8')  // Result: 'px-8 py-2'
 * cn('text-red-500', isActive && 'text-blue-500')  // Conditional classes
 * cn(buttonVariants({ variant: 'primary' }), customClass)  // CVA integration
 * ```
 */
export function cn(...inputs: Array<ClassValue>) {
	return twMerge(clsx(inputs))
}
