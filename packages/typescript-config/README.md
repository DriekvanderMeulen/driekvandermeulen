# @repo/typescript-config

Shared TypeScript configurations for the Kiban monorepo.

## Configurations

### `base.json`

Foundation config used by all other presets. Targets ES2022 with strict mode, `NodeNext` module resolution, and `noUncheckedIndexedAccess` enabled.

### `nextjs.json`

Extends `base.json` for Next.js applications. Uses bundler module resolution, enables the `next` TypeScript plugin, and sets `jsx: "preserve"` with `noEmit: true`.

### `react-library.json`

Extends `base.json` for React library packages. Sets `jsx: "react-jsx"` for the new JSX transform.

## Usage

Add `@repo/typescript-config` as a dev dependency, then extend in your `tsconfig.json`:

```json
{
  "extends": "@repo/typescript-config/nextjs.json",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src"]
}
```

Available presets:

- `@repo/typescript-config/base.json`
- `@repo/typescript-config/nextjs.json`
- `@repo/typescript-config/react-library.json`
