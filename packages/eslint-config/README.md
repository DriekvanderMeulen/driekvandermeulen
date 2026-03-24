# @repo/eslint-config

Shared ESLint configurations for the Kiban monorepo.

## Exported Configs

### `base` (`./base.js`)

Foundation config for all workspaces. Includes:

- `@eslint/js` recommended rules
- `typescript-eslint` recommended rules
- `eslint-config-prettier` to disable formatting conflicts
- `eslint-plugin-turbo` — warns on undeclared env vars
- `eslint-plugin-check-file` — enforces kebab-case filenames and folder structure for `.tsx` files
- `eslint-plugin-import-x` — restricts importing actions from API routes
- `eslint-plugin-only-warn` — downgrades errors to warnings (CI uses `--max-warnings 0`)
- Unused vars allowed when prefixed with `_`
- Arrays must use generic syntax (`Array<T>`)

### `next-js` (`./next.js`)

Extends `base` for Next.js applications. Adds:

- `@next/eslint-plugin-next` (recommended + core-web-vitals rules)
- `eslint-plugin-react` and `eslint-plugin-react-hooks`
- JSX leak protection (`react/jsx-no-leaked-render` — ternary only)
- Ignores `.next/`, `out/`, `build/`, `next-env.d.ts`

### `react-internal` (`./react-internal.js`)

Extends `base` for internal React library packages. Adds:

- `eslint-plugin-react` and `eslint-plugin-react-hooks`
- Browser and service-worker globals
- Same JSX rules as `next-js`

## Usage

Add `@repo/eslint-config` as a dev dependency, then import in your `eslint.config.mjs`:

```js
import { nextJsConfig } from "@repo/eslint-config/next-js";

export default [...nextJsConfig];
```

Available imports:

- `@repo/eslint-config/base` — `{ config }`
- `@repo/eslint-config/next-js` — `{ nextJsConfig }`
- `@repo/eslint-config/react-internal` — `{ config }`
