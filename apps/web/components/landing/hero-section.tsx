'use client'

import { Button } from '@repo/ui/button'
import { Spotlight } from '@repo/ui/spotlight-new'
import { TextGenerateEffect } from '@repo/ui/text-generate-effect'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import Link from 'next/link'

import type { HeroData } from '@/types/landing'

interface HeroSectionProps {
	data: HeroData
}

export function HeroSection({ data }: HeroSectionProps) {
	const scrollToContent = () => {
		window.scrollTo({
			top: window.innerHeight,
			behavior: 'smooth',
		})
	}

	return (
		<section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background">
			{/* Spotlight effect */}
			<Spotlight
				gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(195, 80%, 60%, .08) 0, hsla(195, 80%, 45%, .02) 50%, hsla(195, 80%, 35%, 0) 80%)"
				gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(195, 80%, 60%, .06) 0, hsla(195, 80%, 45%, .02) 80%, transparent 100%)"
				gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(195, 80%, 60%, .04) 0, hsla(195, 80%, 35%, .02) 80%, transparent 100%)"
			/>

			{/* Main Content */}
			<div className="z-10 mb-16 flex flex-col items-center gap-6 text-center select-none">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: 'easeOut' }}
					className="flex flex-col items-center"
				>
					<div className="font-quantico mb-6 text-base tracking-widest text-studio opacity-80 md:text-lg">
						{data.greeting}
					</div>
					<h1 className="font-quantico text-5xl font-bold tracking-tight text-foreground md:text-7xl">
						{data.name}
					</h1>

					<div className="mt-6 max-w-lg">
						<TextGenerateEffect
							words={data.tagline}
							className="font-inter text-base text-muted-foreground md:text-lg"
							duration={0.4}
						/>
					</div>

					<Button
						asChild
						variant="ghost"
						className="mt-8 rounded-lg border border-studio/30 px-5 py-2.5 text-studio-light/80 hover:border-studio hover:text-studio-light"
					>
						<Link href={data.studioLink.href}>{data.studioLink.text}</Link>
					</Button>
				</motion.div>
			</div>

			<motion.button
				onClick={scrollToContent}
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					duration: 1,
					delay: 1.5,
					repeat: Infinity,
					repeatType: 'reverse',
				}}
				className="absolute bottom-12 flex cursor-pointer flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-studio"
			>
				<span className="font-inter text-xs tracking-widest uppercase">
					{data.scrollLabel}
				</span>
				<ArrowDown className="h-5 w-5" />
			</motion.button>

			{/* Brand indicator */}
			<div className="font-quantico pointer-events-none absolute top-1/2 -right-8 hidden -translate-y-1/2 -rotate-90 transform text-sm tracking-widest text-studio-dark md:block">
				{data.brandIndicator}
			</div>
		</section>
	)
}
