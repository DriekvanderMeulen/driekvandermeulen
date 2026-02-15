# @repo/eslint-config

Shared ESLint configurations for the Kiban monorepo using ESLint 9 flat config format.

## Available Configurations

### base.js

The foundational ESLint configuration for all packages. Provides TypeScript and general code quality rules.

```javascript
import { config } from '@repo/eslint-config/base'

export default [...config]
```

**Plugins included:**

- `@eslint/js` - ESLint recommended rules
- `typescript-eslint` - TypeScript support
- `eslint-config-prettier` - Prettier compatibility
- `eslint-plugin-turbo` - Turborepo environment variables
- `eslint-plugin-check-file` - File naming conventions
- `eslint-plugin-import-x` - Import restrictions
- `eslint-plugin-only-warn` - Converts errors to warnings

**Key rules:**

- `func-style: declaration` - Prefer function declarations with arrow function exceptions
- `@typescript-eslint/array-type: generic` - Use `Array<T>` instead of `T[]`
- File naming: `KEBAB_CASE` for `.ts` and `.tsx` files
- TSX files must be in `components/`, `app/`, or `src/` directories
- Import restrictions: No importing from `actions/` in `api/` routes

### next.js

Configuration for Next.js applications. Extends base with React and Next.js specific rules.

```javascript
import { nextJsConfig } from '@repo/eslint-config/next-js'

export default [...nextJsConfig]
```

**Additional plugins:**

- `eslint-plugin-react` - React rules
- `eslint-plugin-react-hooks` - React Hooks rules
- `@next/eslint-plugin-next` - Next.js rules

**Key rules:**

- Next.js recommended and core-web-vitals rules
- `react/react-in-jsx-scope: off` - Not needed with new JSX transform
- `react/jsx-no-leaked-render: ternary` - Prevent leaked renders

**Used by:** `apps/web`

### react-internal.js

Configuration for internal React libraries. Similar to Next.js but without Next.js-specific rules.

```javascript
import { config } from '@repo/eslint-config/react-internal'

export default [...config]
```

**Used by:** `@repo/ui`

## Usage

In your workspace's `eslint.config.mjs`:

```javascript
import { nextJsConfig } from '@repo/eslint-config/next-js'

export default [
	...nextJsConfig,
	{
		// Additional workspace-specific rules
	},
]
```

## Configuration Hierarchy

```
base.js
├── next.js (extends base + React + Next.js rules)
└── react-internal.js (extends base + React rules)
```

## Ignored Paths

All configurations ignore:

- `dist/**`
- `.next/**`
- `build/**`
- `out/**` (Next.js export)
- `next-env.d.ts`
