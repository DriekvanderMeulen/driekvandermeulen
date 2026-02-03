'use client'

import { Badge } from '@repo/ui/badge'
import { Button } from '@repo/ui/button'
import { Card, CardContent } from '@repo/ui/card'
import { Separator } from '@repo/ui/separator'
import { motion } from 'framer-motion'
import Link from 'next/link'

import { IconFromName } from '@/components/icon-map'
import type { AboutData } from '@/types/landing'

import { SectionHeader } from './section-header'

interface AboutSectionProps {
	data: AboutData
}

export function AboutSection({ data }: AboutSectionProps) {
	return (
		<section id="about" className="py-24 md:py-32 lg:py-40">
			<div className="mx-auto max-w-6xl px-6 sm:px-8 md:px-12 lg:px-16">
				<SectionHeader title={data.title} subtitle={data.subtitle} />

				{/* Image + Bio Split */}
				<div className="mb-20 grid grid-cols-1 gap-12 md:mb-28 lg:grid-cols-2 lg:gap-16">
					{/* Image placeholder */}
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-sidebar-border bg-sidebar/40"
					>
						<div className="flex h-full w-full items-center justify-center text-studio-light/30">
							<span className="font-quantico text-lg tracking-wider">
								[ Photo ]
							</span>
						</div>

						<Badge className="absolute bottom-6 left-6 rounded-full border-0 bg-studio/90 px-4 py-2 text-sm font-bold text-background backdrop-blur-sm">
							{data.availableBadge}
						</Badge>
					</motion.div>

					{/* Bio Text */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="flex flex-col justify-center"
					>
						<h3 className="font-quantico mb-6 text-xl font-bold text-foreground md:text-2xl">
							{data.bioTitle}
						</h3>

						<div className="font-inter space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
							{data.bioparagraphs.map((paragraph, i) => (
								<p key={i}>{paragraph}</p>
							))}
						</div>

						<Separator className="my-10 bg-sidebar-border" />

						<div className="flex gap-4">
							<Button
								asChild
								className="font-quantico rounded-lg bg-studio px-6 py-3 text-sm font-bold text-background hover:bg-studio-light"
							>
								<Link href={data.ctas.primary.href}>
									{data.ctas.primary.text}
								</Link>
							</Button>
							<Button
								asChild
								variant="outline"
								className="font-quantico rounded-lg border-studio px-6 py-3 text-sm font-bold text-studio hover:bg-studio hover:text-background"
							>
								<a href={data.ctas.secondary.href}>
									{data.ctas.secondary.text}
								</a>
							</Button>
						</div>
					</motion.div>
				</div>

				{/* Accomplishments Grid */}
				<div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
					{data.accomplishments.map((item, index) => (
						<motion.div
							key={item.label}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
						>
							<Card className="group border-sidebar-border bg-sidebar/60 transition-colors hover:border-studio">
								<CardContent className="flex flex-col items-center p-6 text-center md:p-8">
									<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-studio-darker text-studio transition-colors group-hover:bg-studio group-hover:text-background">
										<IconFromName name={item.icon} className="h-5 w-5" />
									</div>
									<div className="font-quantico mb-1 text-2xl font-bold text-foreground md:text-3xl">
										{item.value}
									</div>
									<div className="font-inter text-xs text-muted-foreground md:text-sm">
										{item.label}
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
