import Link from 'next/link'

export default function Home() {
	return (
		<div className="grid min-h-svh place-items-center p-[var(--page-padding)]">
			<main className="flex flex-col items-center gap-[var(--main-gap)] text-center">
				<h1 className="font-[family-name:var(--font-quantico)] text-2xl font-bold">
					Welcome
				</h1>
				<Link
					href="/office"
					className="text-foreground [text-underline-offset:var(--underline-offset)] hover:underline"
				>
					Office
				</Link>
			</main>
		</div>
	)
}
