# @repo/typescript-config

Shared TypeScript configurations for the Kiban monorepo.

## Available Configurations

This package provides three TypeScript configurations optimized for different use cases:

### base.json

The foundational configuration that other configs extend. Provides strict TypeScript settings suitable for modern Node.js and browser environments.

```json
{
	"extends": "@repo/typescript-config/base.json"
}
```

**Key settings:**

- `strict: true` - Enables all strict type-checking options
- `target: ES2022` - Modern JavaScript target
- `module: NodeNext` - Node.js ESM module system
- `moduleResolution: NodeNext` - Node.js module resolution
- `noUncheckedIndexedAccess: true` - Safer index access
- `isolatedModules: true` - Required for bundlers

### react-library.json

Configuration for React component libraries. Extends base with JSX support.

```json
{
	"extends": "@repo/typescript-config/react-library.json"
}
```

**Key settings:**

- Extends `base.json`
- `jsx: react-jsx` - React 17+ JSX transform

**Used by:** `@repo/ui`

### nextjs.json

Configuration optimized for Next.js applications.

```json
{
	"extends": "@repo/typescript-config/nextjs.json"
}
```

**Key settings:**

- Extends `base.json`
- `plugins: [{ "name": "next" }]` - Next.js TypeScript plugin
- `module: ESNext` - ESM modules for bundler
- `moduleResolution: Bundler` - Bundler-style resolution
- `allowJs: true` - Allow JavaScript files
- `jsx: preserve` - JSX preserved for Next.js compilation
- `noEmit: true` - Next.js handles output

**Used by:** `apps/web`

## Usage

In your workspace's `tsconfig.json`:

```json
{
	"extends": "@repo/typescript-config/nextjs.json",
	"compilerOptions": {
		"baseUrl": ".",
		"paths": {
			"@/*": ["./src/*"]
		}
	},
	"include": ["src/**/*", "next-env.d.ts"],
	"exclude": ["node_modules"]
}
```

## Configuration Hierarchy

```
base.json
├── react-library.json (for @repo/ui)
└── nextjs.json (for apps/web)
```

All configurations share the same strict base settings while customizing module and JSX handling for their specific environments.
