import { createAuthClient } from 'better-auth/react'

/**
 * Client-side authentication client using Better Auth.
 *
 * Provides React hooks and methods for authentication flows:
 * - useSession(): Get current user session
 * - signIn(): Redirect to sign-in page
 * - signUp(): Redirect to sign-up page
 * - signOut(): Clear session and sign out
 * - oauth(): OAuth provider sign-in (Google, GitHub, etc)
 *
 * Configuration:
 * - baseURL: Points to auth API endpoint (NEXT_PUBLIC_BETTER_AUTH_URL env var)
 * - Uses server-side auth config from apps/web/lib/auth.ts
 *
 * @example
 * import { authClient } from '@/lib/auth-client'
 * import { useEffect, useState } from 'react'
 *
 * export function AuthButton() {
 *   const [session, setSession] = useState(null)
 *
 *   useEffect(() => {
 *     authClient.getSession().then(({ data }) => {
 *       setSession(data)
 *     })
 *   }, [])
 *
 *   if (!session) {
 *     return <button onClick={() => authClient.signIn()}>Sign In</button>
 *   }
 *
 *   return (
 *     <div>
 *       Welcome, {session.user.email}
 *       <button onClick={() => authClient.signOut()}>Sign Out</button>
 *     </div>
 *   )
 * }
 *
 * @see apps/web/lib/auth.ts - Server-side authentication configuration
 * @see packages/db/src/schema.ts - User and session tables
 */
export const authClient = createAuthClient({
	baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
})
