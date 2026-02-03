'use client'

import { Badge } from '@repo/ui/badge'
import { Card, CardContent } from '@repo/ui/card'
import { motion } from 'framer-motion'
import { Award, GraduationCap } from 'lucide-react'

import type { EducationData } from '@/types/landing'

import { SectionHeader } from './section-header'

interface EducationSectionProps {
	data: EducationData
}

export function EducationSection({ data }: EducationSectionProps) {
	return (
		<section id="education" className="py-24 md:py-32 lg:py-40">
			<div className="mx-auto max-w-6xl px-6 sm:px-8 md:px-12 lg:px-16">
				<SectionHeader title={data.title} subtitle={data.subtitle} />

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
					{data.items.map((item, index) => (
						<motion.div
							key={item.degree}
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
						>
							<Card
								className={`group h-full bg-sidebar/60 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-studio/5 ${item.primary ? 'border-studio' : 'border-sidebar-border hover:border-studio'}`}
							>
								<CardContent className="flex items-start gap-5 p-6 md:p-8">
									<div
										className={`flex-shrink-0 rounded-lg p-3 ${item.primary ? 'bg-studio text-background' : 'bg-studio-darker text-studio group-hover:bg-studio group-hover:text-background'} transition-colors`}
									>
										{item.primary ? (
											<Award className="h-5 w-5" />
										) : (
											<GraduationCap className="h-5 w-5" />
										)}
									</div>
									<div>
										<Badge
											variant="outline"
											className="mb-2 font-mono text-xs text-studio"
										>
											{item.period}
										</Badge>
										<h3 className="mt-1 text-lg font-bold transition-colors group-hover:text-studio md:text-xl">
											{item.degree}
										</h3>
										<p className="mt-2 text-sm text-muted-foreground md:text-base">
											{item.institution}
										</p>
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
