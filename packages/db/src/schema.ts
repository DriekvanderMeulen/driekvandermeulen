import { relations } from 'drizzle-orm'
import { boolean, index, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

/**
 * User table - core user accounts for authentication.
 *
 * @property id - Unique user identifier (primary key)
 * @property name - User's display name
 * @property email - Unique email address for login
 * @property emailVerified - Whether the email has been verified
 * @property image - Optional profile image URL
 * @property createdAt - Account creation timestamp
 * @property updatedAt - Last update timestamp (auto-updates on change)
 */
export const user = pgTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: boolean('email_verified').default(false).notNull(),
	image: text('image'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
})

/**
 * Session table - active user sessions with authentication tokens.
 * Sessions are deleted when the associated user is deleted (cascade).
 *
 * @property id - Unique session identifier (primary key)
 * @property expiresAt - Session expiration timestamp
 * @property token - Unique session token for authentication
 * @property createdAt - Session creation timestamp
 * @property updatedAt - Last activity timestamp (auto-updates on change)
 * @property ipAddress - Client IP address (optional)
 * @property userAgent - Client user agent string (optional)
 * @property userId - Foreign key to user table
 */
export const session = pgTable(
	'session',
	{
		id: text('id').primaryKey(),
		expiresAt: timestamp('expires_at').notNull(),
		token: text('token').notNull().unique(),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.$onUpdate(() => new Date())
			.notNull(),
		ipAddress: text('ip_address'),
		userAgent: text('user_agent'),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
	},
	(table) => [index('session_userId_idx').on(table.userId)],
)

/**
 * Account table - OAuth provider accounts linked to users.
 * Stores tokens and metadata for social login providers (Google, etc.).
 * Accounts are deleted when the associated user is deleted (cascade).
 *
 * @property id - Unique account identifier (primary key)
 * @property accountId - Provider-specific account ID
 * @property providerId - OAuth provider identifier (e.g., 'google')
 * @property userId - Foreign key to user table
 * @property accessToken - OAuth access token (optional)
 * @property refreshToken - OAuth refresh token (optional)
 * @property idToken - OAuth ID token (optional)
 * @property accessTokenExpiresAt - Access token expiration (optional)
 * @property refreshTokenExpiresAt - Refresh token expiration (optional)
 * @property scope - OAuth scopes granted (optional)
 * @property password - Hashed password for credential-based auth (optional)
 * @property createdAt - Account link creation timestamp
 * @property updatedAt - Last update timestamp (auto-updates on change)
 */
export const account = pgTable(
	'account',
	{
		id: text('id').primaryKey(),
		accountId: text('account_id').notNull(),
		providerId: text('provider_id').notNull(),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		accessToken: text('access_token'),
		refreshToken: text('refresh_token'),
		idToken: text('id_token'),
		accessTokenExpiresAt: timestamp('access_token_expires_at'),
		refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
		scope: text('scope'),
		password: text('password'),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [index('account_userId_idx').on(table.userId)],
)

/**
 * Verification table - stores verification tokens for email confirmation and password reset.
 * Tokens have an expiration time and are identified by a unique identifier (typically email).
 *
 * @property id - Unique verification record identifier (primary key)
 * @property identifier - Target identifier (typically email address)
 * @property value - Verification token value
 * @property expiresAt - Token expiration timestamp
 * @property createdAt - Record creation timestamp
 * @property updatedAt - Last update timestamp (auto-updates on change)
 */
export const verification = pgTable(
	'verification',
	{
		id: text('id').primaryKey(),
		identifier: text('identifier').notNull(),
		value: text('value').notNull(),
		expiresAt: timestamp('expires_at').notNull(),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
	},
	(table) => [index('verification_identifier_idx').on(table.identifier)],
)

/**
 * User relations - defines one-to-many relationships from user to sessions and accounts.
 */
export const userRelations = relations(user, ({ many }) => ({
	sessions: many(session),
	accounts: many(account),
}))

/**
 * Session relations - defines many-to-one relationship from session to user.
 */
export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id],
	}),
}))

/**
 * Account relations - defines many-to-one relationship from account to user.
 */
export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id],
	}),
}))
