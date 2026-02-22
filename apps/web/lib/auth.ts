import { db } from '@repo/db'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

/**
 * Server-side Better Auth instance configured with Drizzle adapter.
 *
 * Provides authentication functionality including:
 * - Session management
 * - Google OAuth social login
 * - User/account persistence via PostgreSQL
 *
 * @example
 * ```typescript
 * // In API route or server component
 * import { auth } from '@/lib/auth'
 *
 * const session = await auth.api.getSession({ headers })
 * ```
 *
 * @see {@link https://better-auth.com/docs Better Auth Documentation}
 */
export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg',
	}),
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},
})

/**
 * Session type inferred from the auth configuration.
 * Contains user information and session metadata.
 */
export type Session = typeof auth.$Infer.Session

/**
 * User type inferred from the auth configuration.
 * Contains user profile data (id, name, email, image, etc.).
 */
export type User = typeof auth.$Infer.Session.user
