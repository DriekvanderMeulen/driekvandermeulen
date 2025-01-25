/** @type {import("prettier").Config} */
module.exports = {
    printWidth: 80,
    tabWidth: 2,
    useTabs: false,
    trailingComma: "all",
    semi: true,
    singleQuote: false,
    importOrder: ["<THIRD_PARTY_MODULES>", "^@/(.*)$", "^[./]"],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
    tailwindConfig: "./tailwind.config.js",
    plugins: [
      require.resolve("@trivago/prettier-plugin-sort-imports"),
      require.resolve("prettier-plugin-tailwindcss"),
    ],
  };
  