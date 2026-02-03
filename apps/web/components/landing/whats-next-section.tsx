'use client'

import { Button } from '@repo/ui/button'
import { Card } from '@repo/ui/card'
import { WobbleCard } from '@repo/ui/wobble-card'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { IconFromName } from '@/components/icon-map'
import type { WhatsNextData } from '@/types/landing'

interface WhatsNextSectionProps {
	data: WhatsNextData
}

export function WhatsNextSection({ data }: WhatsNextSectionProps) {
	const [activeTab, setActiveTab] = useState<'studio' | 'freelance'>('studio')

	return (
		<section className="bg-sidebar/30 py-24 md:py-32 lg:py-40">
			<div className="mx-auto max-w-6xl px-6 sm:px-8 md:px-12 lg:px-16">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-16 md:mb-20"
				>
					<h2 className="font-quantico mb-5 text-3xl font-bold md:text-4xl lg:text-5xl">
						{data.title}{' '}
						<span className="text-studio">{data.titleAccent}</span>
					</h2>
					<p className="font-inter max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
						{data.subtitle}
					</p>
				</motion.div>

				<div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
					{/* Main CTA Block - WobbleCard */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="lg:col-span-8"
					>
						<WobbleCard
							containerClassName="bg-studio-darker border border-sidebar-border"
							className="flex flex-col justify-between p-8 md:p-12"
						>
							<div className="relative z-10">
								<h3 className="font-quantico mb-4 text-xl font-bold whitespace-pre-line md:text-2xl">
									{data.mainCta.title}
								</h3>
								<p className="mb-8 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
									{data.mainCta.description}
								</p>
							</div>

							<div className="relative z-10">
								<Button
									asChild
									className="rounded-lg bg-studio px-6 py-3 text-sm font-bold text-background hover:bg-studio-light"
								>
									<Link href={data.mainCta.href}>
										{data.mainCta.buttonText}{' '}
										<ArrowRight className="ml-1 h-4 w-4" />
									</Link>
								</Button>
							</div>
						</WobbleCard>
					</motion.div>

					{/* Contact Options */}
					<div className="flex flex-col gap-4 lg:col-span-4">
						{data.contactOptions.map((option, index) => (
							<motion.a
								key={option.href}
								href={option.href}
								target={option.external ? '_blank' : undefined}
								rel={option.external ? 'noopener noreferrer' : undefined}
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 }}
								whileHover={{ x: 5 }}
							>
								<Card className="group flex flex-1 cursor-pointer items-center justify-between border-sidebar-border bg-sidebar/60 p-5 backdrop-blur-sm transition-all hover:border-studio">
									<div className="flex items-center gap-4">
										<div className="flex h-10 w-10 items-center justify-center rounded-full bg-studio-darker text-studio">
											<IconFromName
												name={option.icon}
												className="h-4 w-4"
											/>
										</div>
										<span className="font-quantico text-sm font-bold">
											{option.label}
										</span>
									</div>
									<ArrowRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-studio" />
								</Card>
							</motion.a>
						))}
					</div>

					{/* Tab Block */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="lg:col-span-6"
					>
						<Card className="h-full border-sidebar-border bg-sidebar/60 p-8 backdrop-blur-sm">
							<div className="mb-6 flex gap-2">
								<button
									onClick={() => setActiveTab('studio')}
									className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${activeTab === 'studio' ? 'bg-studio text-background' : 'bg-studio-darker/50 text-muted-foreground hover:text-foreground'}`}
								>
									Studio
								</button>
								<button
									onClick={() => setActiveTab('freelance')}
									className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${activeTab === 'freelance' ? 'bg-studio text-background' : 'bg-studio-darker/50 text-muted-foreground hover:text-foreground'}`}
								>
									Freelance
								</button>
							</div>

							<h3 className="font-quantico mb-4 text-xl font-bold">
								{data.tabTitle}
							</h3>

							<motion.div
								key={activeTab}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="space-y-6"
							>
								<p className="text-sm leading-relaxed text-muted-foreground md:text-base">
									{data.tabs[activeTab].description}
								</p>
								<Button
									variant="outline"
									className="rounded-lg border-studio text-sm font-bold text-studio hover:bg-studio hover:text-background"
								>
									{data.tabs[activeTab].ctaText}
								</Button>
							</motion.div>
						</Card>
					</motion.div>

					{/* Philosophy Block */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="lg:col-span-6"
					>
						<Card className="group relative flex h-full min-h-[280px] items-end overflow-hidden border-sidebar-border bg-studio-darker/30">
							<div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

							<div className="relative p-8">
								<p className="font-quantico mb-3 text-sm text-studio-lighter">
									{data.philosophy.label}
								</p>
								<p className="text-lg font-bold leading-relaxed text-white md:text-xl">
									{data.philosophy.quote}
								</p>
							</div>
						</Card>
					</motion.div>
				</div>
			</div>
		</section>
	)
}
