/**
 * Database connection and Drizzle ORM instance.
 *
 * Uses postgres-js driver with `prepare: false` for compatibility with
 * transaction pool mode (Supabase, PgBouncer, etc.). The schema is
 * automatically loaded for relation queries.
 *
 * @example
 * ```ts
 * import { db } from "@repo/db";
 * import { user } from "@repo/db/schema";
 *
 * const users = await db.query.user.findMany();
 * ```
 * @module
 */
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from './schema'

const connectionString = process.env.DATABASE_URL!

/**
 * PostgreSQL client configured for transaction pool mode.
 * `prepare: false` disables prepared statements for PgBouncer/Supabase compatibility.
 */
const client = postgres(connectionString, { prepare: false })

/** Drizzle ORM instance with schema for type-safe queries and relations */
export const db = drizzle(client, { schema })
