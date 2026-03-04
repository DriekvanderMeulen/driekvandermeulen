import { createAuthClient } from 'better-auth/react'

/**
 * Client-side authentication instance for Better Auth.
 *
 * Provides React hooks and utilities for authentication operations on the client side.
 * This instance connects to the authentication API configured in the environment.
 *
 * @example
 * ```ts
 * // In a React component
 * import { authClient } from '@/lib/auth-client'
 *
 * export function LoginForm() {
 *   const handleLogin = async (email: string, password: string) => {
 *     const { data, error } = await authClient.signIn.email(
 *       { email, password },
 *       { onSuccess: () => router.push('/dashboard') }
 *     )
 *   }
 * }
 * ```
 *
 * @see {@link apps/web/lib/auth.ts} for server-side configuration
 * @see Better Auth documentation for available hooks and methods
 */
export const authClient = createAuthClient({
	baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
})
