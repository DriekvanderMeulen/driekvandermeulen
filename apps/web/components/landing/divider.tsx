'use client'

import { useEffect, useRef, useState } from 'react'

import ScrollVelocity from '@/components/landing/bits/scroll-velocity'

interface DividerProps {
	title: string
	textSize?: string
	topMargin?: string
	bottomMargin?: string
}

function Divider({
	title,
	textSize = '50vh',
	topMargin = '0',
	bottomMargin = '0',
}: DividerProps) {
	const [scrollProgress, setScrollProgress] = useState(0)
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleScroll = () => {
			if (!containerRef.current) return

			const rect = containerRef.current.getBoundingClientRect()
			const scrollY = window.scrollY
			const viewportHeight = window.innerHeight

			// Get the divider's position on the page
			const dividerTop = scrollY + rect.top

			// Calculate progress based on how much we've scrolled past the divider
			const scrollPastDivider = Math.max(0, scrollY - dividerTop)
			const triggerPoint = viewportHeight * 0.25
			const progress = Math.min(scrollPastDivider / triggerPoint, 1)

			setScrollProgress(progress)
		}

		window.addEventListener('scroll', handleScroll)
		handleScroll() // Initial check

		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	// Both boxes expand to 100% width at the same rate, completing at 25% scroll
	const saphireWidth = scrollProgress * 100
	const amberWidth = scrollProgress * 100

	return (
		<div
			ref={containerRef}
			className="relative"
			style={{
				marginTop: topMargin,
				marginBottom: bottomMargin,
			}}
		>
			{/* Fixed divider at top 50% of viewport - Saphire box */}
			{scrollProgress > 0 ? <div className="pointer-events-none fixed top-0 right-0 left-0 z-50 h-[50vh] overflow-hidden">
					{/* Saphire box from left */}
					<div
						className="absolute top-0 left-0 flex h-full items-center justify-center overflow-hidden"
						style={{
							width: `${saphireWidth}%`,
							backgroundColor: 'var(--color-pure-black)',
							transition: 'width 0.1s ease-out',
						}}
					>
						<h2
							className="leading-none font-extrabold whitespace-nowrap uppercase"
							style={{
								color: 'var(--color-pure-white)',
								fontSize: textSize,
							}}
						>
							{title}
						</h2>
					</div>
				</div> : null}

			{/* Fixed divider at bottom 50% of viewport - Amber box */}
			{scrollProgress > 0 ? <div className="pointer-events-none fixed right-0 bottom-0 left-0 z-50 h-[50vh] overflow-hidden">
					{/* Amber box from right */}
					<div
						className="absolute right-0 bottom-0 flex h-full flex-col overflow-hidden"
						style={{
							width: `${amberWidth}%`,
							backgroundColor: 'var(--color-pure-black)',
							transition: 'width 0.1s ease-out',
						}}
					>
						{/* Multiple layers of DRIEK.DEV scrolling horizontally */}
						{Array.from({ length: 6 }).map((_, index) => {
							const backgroundColor =
								index % 2 === 0
									? 'var(--color-studio)'
									: 'var(--color-studio-darker)'

							return (
								<div
									key={index}
									className="relative flex-1 overflow-hidden"
									style={{ minHeight: 0 }}
								>
									<ScrollVelocity
										texts={[` - DRIEK STUDIO - ${title}`]}
										velocity={index % 2 === 0 ? -50 : 50}
										className="font-regular"
										parallaxClassName="h-full"
										parallaxStyle={{
											height: '100%',
											width: '100%',
											overflow: 'hidden',
											backgroundColor,
											display: 'flex',
											alignItems: 'center',
										}}
										scrollerStyle={{
											color: 'var(--color-pure-white)',
											fontFamily: 'var(--font-quantico), sans-serif',
										}}
									/>
								</div>
							)
						})}
					</div>
				</div> : null}
		</div>
	)
}

export default Divider
