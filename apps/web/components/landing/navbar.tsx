'use client'

import { Button } from '@repo/ui/button'
import {
	AnimatePresence,
	motion,
	useMotionValueEvent,
	useScroll,
} from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import type { NavbarData } from '@/types/landing'

interface LandingNavbarProps {
	data: NavbarData
}

export function LandingNavbar({ data }: LandingNavbarProps) {
	const { scrollYProgress } = useScroll()
	const [visible, setVisible] = useState(false)

	useMotionValueEvent(scrollYProgress, 'change', (current) => {
		if (typeof current === 'number') {
			const direction = current - (scrollYProgress.getPrevious() ?? 0)

			if (scrollYProgress.get() < 0.05) {
				setVisible(false)
			} else {
				setVisible(direction < 0)
			}
		}
	})

	return (
		<AnimatePresence mode="wait">
			<motion.nav
				initial={{ opacity: 0, y: -100 }}
				animate={{
					y: visible ? 0 : -100,
					opacity: visible ? 1 : 0,
				}}
				transition={{ duration: 0.2 }}
				className="fixed inset-x-0 top-6 z-[5000] mx-auto flex max-w-fit items-center justify-center gap-6 rounded-full border border-studio-dark/30 bg-studio-darkest/80 px-6 py-2.5 backdrop-blur-md"
			>
				<Link href="/" className="font-quantico text-sm font-bold text-studio">
					{data.brand}
				</Link>

				<div className="hidden items-center gap-4 sm:flex">
					{data.items.map((item) => (
						<a
							key={item.href}
							href={item.href}
							className="text-sm text-foreground/70 transition-colors hover:text-studio"
						>
							{item.label}
						</a>
					))}
				</div>

				<Button
					asChild
					size="sm"
					className="rounded-full bg-studio text-background hover:bg-studio-light"
				>
					<Link href={data.cta.href}>
						{data.cta.text}
						<ArrowRight className="ml-1 h-3 w-3" />
					</Link>
				</Button>
			</motion.nav>
		</AnimatePresence>
	)
}
