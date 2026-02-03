'use client'

import { Badge } from '@repo/ui/badge'
import { Button } from '@repo/ui/button'
import { Card, CardContent } from '@repo/ui/card'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

import type { ProjectsData } from '@/types/landing'

import { SectionHeader } from './section-header'

interface ProjectsSectionProps {
	data: ProjectsData
}

export function ProjectsSection({ data }: ProjectsSectionProps) {
	return (
		<section id="projects" className="py-24 md:py-32 lg:py-40">
			<div className="mx-auto max-w-6xl px-6 sm:px-8 md:px-12 lg:px-16">
				<SectionHeader title={data.title} subtitle={data.subtitle} />

				<div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
					{data.projects.map((project, index) => (
						<motion.div
							key={project.id}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							className={project.large ? 'lg:row-span-2' : ''}
						>
							<Card className="group h-full overflow-hidden border-sidebar-border bg-sidebar/60 backdrop-blur-sm transition-all duration-300 hover:border-studio hover:shadow-lg hover:shadow-studio/5">
								{/* Project Image Placeholder */}
								<div
									className={`relative flex w-full items-center justify-center bg-studio-darker/30 ${project.large ? 'h-[280px] lg:h-[360px]' : 'h-[180px] lg:h-[200px]'}`}
								>
									<span className="font-quantico text-base tracking-wider text-studio-light/20">
										[ {project.title} ]
									</span>
									<div className="absolute inset-0 bg-gradient-to-t from-sidebar via-sidebar/30 to-transparent" />
								</div>

								<CardContent className="p-6 md:p-8">
									<div className="mb-4 flex items-start justify-between gap-4">
										<div>
											<h3 className="mb-3 text-lg font-bold transition-colors group-hover:text-studio md:text-xl">
												{project.title}
											</h3>
											<div className="flex flex-wrap gap-2">
												{project.tags.map((tag) => (
													<Badge
														key={tag}
														variant="outline"
														className="border-studio-dark/50 bg-studio-darker/50 text-xs text-studio-light"
													>
														{tag}
													</Badge>
												))}
											</div>
										</div>
										<Button
											asChild
											variant="ghost"
											size="icon"
											className="flex-shrink-0 rounded-full bg-studio text-background hover:bg-studio-light"
										>
											<Link href={project.link}>
												<ArrowUpRight className="h-4 w-4" />
											</Link>
										</Button>
									</div>
									<p className="text-sm leading-relaxed text-muted-foreground md:text-base">
										{project.description}
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
