import ScrollFade from '@/registry/8starlabs-ui/blocks/scroll-fade'

export default function ScrollFadeDemo() {
	return (
		<ScrollFade className="max-w-full">
			<div className="flex min-w-[700px] space-x-4 px-4 py-2">
				{[...Array(12).keys()].map((num) => (
					<div
						key={num}
						className="flex h-24 w-24 items-center justify-center rounded-md bg-muted text-muted-foreground"
					>
						Item {num + 1}
					</div>
				))}
			</div>
		</ScrollFade>
	)
}
