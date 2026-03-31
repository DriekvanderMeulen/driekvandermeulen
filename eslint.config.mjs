import { config } from './packages/eslint-config/base.js'

/** @type {import("eslint").Linter.Config[]} */
export default [
	{
		ignores: [
			'**/node_modules/**',
			'**/.next/**',
			'**/dist/**',
			'**/build/**',
			'**/knip-report.json',
			'**/bun.lock',
			// Packages with their own ESLint configs (linted by turbo)
			'packages/ui/**',
			'packages/db/**',
			'apps/web/**',
		],
	},
	...config,
	{
		files: ['**/*.js', '**/*.mjs', '**/*.ts', '**/*.tsx'],
		rules: {
			// Add root-specific overrides here if needed
		},
	},
]
