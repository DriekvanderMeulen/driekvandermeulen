'use client'

import { motion } from 'framer-motion'

interface SectionHeaderProps {
	title: string
	subtitle: string
	id?: string
}

export function SectionHeader({ title, subtitle, id }: SectionHeaderProps) {
	return (
		<motion.div
			id={id}
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			className="mb-16 md:mb-20"
		>
			<h2 className="font-quantico mb-5 text-2xl font-bold md:text-3xl lg:text-4xl">
				<span className="text-studio">[</span> {title}{' '}
				<span className="text-studio">]</span>
			</h2>
			<p className="font-inter max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
				{subtitle}
			</p>
		</motion.div>
	)
}
