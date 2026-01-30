/** @type {import("prettier").Config} */
module.exports = {
	printWidth: 80,
	tabWidth: 2,
	useTabs: true,
	trailingComma: 'all',
	semi: false,
	singleQuote: true,
	importOrder: ['<THIRD_PARTY_MODULES>', '^@/(.*)$', '^[./]'],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	tailwindStylesheet: './apps/web/app/globals.css',
	plugins: [
		require.resolve('@trivago/prettier-plugin-sort-imports'),
		require.resolve('prettier-plugin-tailwindcss'),
	],
	tailwindFunctions: ['cva', 'cn', 'clsx', 'tw'],
}
