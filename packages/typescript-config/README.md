# @repo/typescript-config

Shared TypeScript configurations for the Kiban monorepo. Provides base configs that can be extended by apps and packages.

## Available Configs

### base.json

Foundation config with strict TypeScript settings. Use for Node.js packages and libraries.

```json
{
  "extends": "@repo/typescript-config/base.json"
}
```

Settings:

- ES2022 target and module system
- Strict type checking enabled
- `noUncheckedIndexedAccess` for safer array/object access
- Declaration files generated

### nextjs.json

Extended config for Next.js applications. Use in `apps/web` and other Next.js apps.

```json
{
  "extends": "@repo/typescript-config/nextjs.json"
}
```

Adds:

- Next.js plugin for enhanced type checking
- Bundler module resolution
- JSX preservation for Next.js compilation
- `noEmit` since Next.js handles compilation

### react-library.json

Extended config for React component libraries. Use in `packages/ui` and similar packages.

```json
{
  "extends": "@repo/typescript-config/react-library.json"
}
```

Adds:

- `react-jsx` transform for modern JSX

## Usage

In your package's `tsconfig.json`:

```json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

## Which Config to Use

| Package Type      | Config             |
| ----------------- | ------------------ |
| Next.js app       | `nextjs.json`      |
| React library     | `react-library.json` |
| Node.js package   | `base.json`        |
| CLI tools         | `base.json`        |
| Database/API      | `base.json`        |
