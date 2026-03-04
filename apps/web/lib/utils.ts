import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes intelligently.
 *
 * Combines class values using clsx and resolves Tailwind conflicts using twMerge.
 * Useful for merging component classes with user-provided overrides.
 *
 * @example
 * // Resolves conflicting Tailwind classes
 * cn('px-2 py-1', 'px-4')  // Result: 'px-4 py-1'
 *
 * @example
 * // Combines conditional classes
 * cn(
 *   'base-class',
 *   isActive && 'active-class',
 *   disabled ? 'disabled-class' : 'enabled-class'
 * )
 *
 * @param inputs - Array of class values (strings, booleans, objects, or arrays)
 * @returns Merged and deduplicated class string
 */
export function cn(...inputs: Array<ClassValue>) {
	return twMerge(clsx(inputs))
}
