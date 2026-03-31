import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";
import checkFile from "eslint-plugin-check-file";
import importX from "eslint-plugin-import-x";
import globals from "globals";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    plugins: {
      turbo: turboPlugin,
      "check-file": checkFile,
      "import-x": importX,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
      "func-style": ["error", "declaration", { allowArrowFunctions: true }],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/array-type": ["error", { default: "generic" }],
      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.{ts,tsx}": "KEBAB_CASE",
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      "check-file/folder-match-with-fex": [
        "error",
        {
          "**/*.tsx": "**/{components,app,src}/**",
        },
      ],
      "import-x/no-restricted-paths": [
        "error",
        {
          zones: [
            {
              target: "**/api/**/*",
              from: "**/actions/**/*",
              message: "Database actions should be in src/actions/, never in /api",
            },
          ],
        },
      ],
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    files: ["**/3d-*.{ts,tsx}"],
    rules: {
      "check-file/filename-naming-convention": "off",
    },
  },
  {
    ignores: ["dist/**", ".next/**", "build/**"],
  },
];
