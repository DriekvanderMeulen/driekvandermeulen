'use client'

import { Badge } from '@repo/ui/badge'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@repo/ui/card'
import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'

import type { ExperienceData } from '@/types/landing'

import { SectionHeader } from './section-header'

interface WorkExperienceSectionProps {
	data: ExperienceData
}

export function WorkExperienceSection({ data }: WorkExperienceSectionProps) {
	return (
		<section id="experience" className="py-24 md:py-32 lg:py-40">
			<div className="mx-auto max-w-6xl px-6 sm:px-8 md:px-12 lg:px-16">
				<SectionHeader title={data.title} subtitle={data.subtitle} />

				<div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
					{data.jobs.map((job, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
						>
							<Card className="group h-full border-sidebar-border bg-sidebar/60 backdrop-blur-sm transition-all duration-300 hover:border-studio hover:shadow-lg hover:shadow-studio/5">
								<CardHeader className="p-6 pb-4 md:p-8 md:pb-4">
									<div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-studio-darker text-studio transition-colors group-hover:bg-studio group-hover:text-background">
										<Briefcase className="h-4 w-4" />
									</div>
									<Badge
										variant="outline"
										className="w-fit font-mono text-xs text-studio"
									>
										{job.period}
									</Badge>
									<CardTitle className="mt-3 text-lg transition-colors group-hover:text-studio md:text-xl">
										{job.company}
									</CardTitle>
									<CardDescription className="font-quantico text-sm text-studio-light">
										{job.role}
									</CardDescription>
								</CardHeader>
								<CardContent className="px-6 pb-6 md:px-8 md:pb-8">
									<p className="text-sm leading-relaxed text-muted-foreground md:text-base">
										{job.description}
									</p>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
