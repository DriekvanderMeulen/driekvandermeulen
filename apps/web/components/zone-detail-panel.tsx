'use client'

import { Badge } from '@repo/ui/badge'
import { AnimatePresence, motion } from 'motion/react'

import type { ZoneMetadata } from '@/types/zones'

interface ZoneDetailPanelProps {
	zone: ZoneMetadata | null
}

function parseMarkdownLinks(text: string): React.ReactNode {
	const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
	const parts: React.ReactNode[] = []
	let lastIndex = 0
	let match: RegExpExecArray | null

	while ((match = linkRegex.exec(text)) !== null) {
		if (match.index > lastIndex) {
			parts.push(text.substring(lastIndex, match.index))
		}

		const [, linkText, url] = match
		parts.push(
			<a
				key={match.index}
				href={url}
				target="_blank"
				rel="noopener noreferrer"
				className="text-studio underline decoration-studio/30 transition-colors hover:text-studio-light hover:decoration-studio-light/50"
			>
				{linkText}
			</a>,
		)

		lastIndex = match.index + match[0].length
	}

	if (lastIndex < text.length) {
		parts.push(text.substring(lastIndex))
	}

	return parts.length > 0 ? parts : text
}

export function ZoneDetailPanel({ zone }: ZoneDetailPanelProps) {
	if (!zone) return null

	return (
		<div className="pointer-events-none fixed top-1/2 left-12 z-30 flex -translate-y-1/2 items-center">
			<AnimatePresence mode="wait">
				<motion.div
					key={zone.id}
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -10 }}
					transition={{ duration: 0.3, ease: 'easeOut' }}
					className="pointer-events-auto w-[420px]"
				>
					<div
						className="rounded-[2.5rem] border border-studio-light/10 bg-studio-darkest/80 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-studio-light/20"
						style={{ padding: '24px' }}
					>
						{/* Header */}
						<div className="mb-6 flex items-center justify-between gap-8">
							<h2 className="font-quantico text-3xl leading-none font-bold tracking-tight text-studio-lighter">
								{zone.title}
							</h2>
							{zone.type && (
								<Badge
									variant="secondary"
									className="shrink-0 rounded-full border border-studio-light/20 bg-studio-light/5 text-sm font-medium tracking-wide text-studio-light capitalize ring-1 ring-studio-light/5 backdrop-blur-sm transition-colors hover:bg-studio-light/10"
									style={{ padding: '8px 24px' }}
								>
									{zone.type}
								</Badge>
							)}
						</div>

						{/* Divider */}
						<div className="mb-6 h-px bg-linear-to-r from-studio/40 via-studio-dark/20 to-transparent" />

						{/* Description */}
						<p className="text-base leading-relaxed text-studio-lighter/80">
							{parseMarkdownLinks(zone.description)}
						</p>
					</div>
				</motion.div>
			</AnimatePresence>
		</div>
	)
}
