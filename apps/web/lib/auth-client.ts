import { createAuthClient } from 'better-auth/react'

/**
 * Client-side Better Auth instance for React components.
 *
 * Provides React hooks and utilities for authentication:
 * - `useSession()` - Access current session state
 * - `signIn` - Trigger sign-in flows
 * - `signOut` - End the current session
 *
 * @example
 * ```typescript
 * import { authClient } from '@/lib/auth-client'
 *
 * // In a React component
 * const { data: session, isPending } = authClient.useSession()
 *
 * // Sign in with Google
 * await authClient.signIn.social({ provider: 'google' })
 *
 * // Sign out
 * await authClient.signOut()
 * ```
 *
 * @see {@link https://better-auth.com/docs/react Better Auth React Documentation}
 */
export const authClient = createAuthClient({
	baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
})
