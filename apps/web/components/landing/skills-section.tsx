'use client'

import { Badge } from '@repo/ui/badge'
import { Card, CardContent, CardHeader } from '@repo/ui/card'
import { motion } from 'framer-motion'

import { IconFromName } from '@/components/icon-map'
import type { SkillsData } from '@/types/landing'

import { SectionHeader } from './section-header'

interface SkillsSectionProps {
	data: SkillsData
}

export function SkillsSection({ data }: SkillsSectionProps) {
	return (
		<section
			id="skills"
			className="bg-sidebar/20 py-24 md:py-32 lg:py-40"
		>
			<div className="mx-auto max-w-6xl px-6 sm:px-8 md:px-12 lg:px-16">
				<SectionHeader title={data.title} subtitle={data.subtitle} />

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
					{data.categories.map((category, index) => (
						<motion.div
							key={category.name}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
						>
							<Card className="group h-full border-sidebar-border bg-sidebar/60 backdrop-blur-sm transition-all duration-300 hover:border-studio">
								<CardHeader className="p-6 pb-4">
									<div className="flex items-center gap-3">
										<div className="flex h-10 w-10 items-center justify-center rounded-full bg-studio-darker text-studio transition-colors group-hover:bg-studio group-hover:text-background">
											<IconFromName
												name={category.icon}
												className="h-5 w-5"
											/>
										</div>
										<h3 className="font-quantico text-base font-bold text-foreground">
											{category.name}
										</h3>
									</div>
								</CardHeader>
								<CardContent className="px-6 pb-6">
									<div className="flex flex-wrap gap-2">
										{category.skills.map((skill) => (
											<Badge
												key={skill}
												variant="outline"
												className="cursor-default border-sidebar-border bg-studio-darker/30 text-xs text-foreground transition-all hover:border-studio hover:bg-studio hover:text-background"
											>
												{skill}
											</Badge>
										))}
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
