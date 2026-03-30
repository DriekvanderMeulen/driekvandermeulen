import { readFileSync } from 'fs'
import { join } from 'path'

import {
	type ParsedContentItem,
	parseContentDocument,
} from '@/utils/content-parser'

function renderContentItem(item: ParsedContentItem): React.ReactNode {
	switch (item.kind) {
		case 'subtitle':
			return <h4 className="h3 font-regular text-pure-white">{item.text}</h4>
		case 'paragraph':
			return (
				<p className="p max-w-crude mb-2 leading-relaxed text-not-white">
					{item.text}
				</p>
			)
		default:
			return null
	}
}

function EducationContent({
	title,
	content,
}: {
	title: string | null
	content: Array<ParsedContentItem>
}) {
	return (
		<div className="space-y-8">
			{title ? <h3 className="h2 mb-8 font-bold text-studio">{title}</h3> : null}
			<div className="space-y-6">
				{content.map((item, itemIndex) => (
					<div key={itemIndex}>{renderContentItem(item)}</div>
				))}
			</div>
		</div>
	)
}

export default function Education() {
	try {
		const mboContent = readFileSync(
			join(process.cwd(), 'content/mbo.md'),
			'utf-8',
		)
		const hboContent = readFileSync(
			join(process.cwd(), 'content/hbo.md'),
			'utf-8',
		)

		const mboParsed = parseContentDocument(mboContent)
		const hboParsed = parseContentDocument(hboContent)

		return (
			<section
				id="education"
				className="min-h-screen min-w-screen bg-pure-black px-6 py-24"
			>
				<div className="mx-auto max-w-6xl">
					{/* Title and Intro */}
					<div className="mb-16 text-center">
						<h2 className="h1 mb-8 font-bold text-pure-white">Education</h2>
						<p className="p mx-auto max-w-3xl leading-relaxed text-almost-white">
							My educational journey has shaped both my technical foundation and
							my approach to building meaningful software. From foundational
							programming skills to human-centered design principles, each step
							has contributed to how I work today.
						</p>
					</div>

					{/* Education Content */}
					<div className="grid gap-12 md:grid-cols-2">
						{/* HBO - Right */}
						<div className="space-y-8">
							<EducationContent
								title={hboParsed.title}
								content={hboParsed.content}
							/>
						</div>
						{/* MBO - Left */}
						<div className="space-y-8">
							<EducationContent
								title={mboParsed.title}
								content={mboParsed.content}
							/>
						</div>
					</div>
				</div>
			</section>
		)
	} catch (error) {
		console.error('Error loading education content:', error)
		return (
			<section id="education" className="min-h-screen bg-pure-black px-6 py-24">
				<div className="mx-auto max-w-6xl text-center">
					<h2 className="h1 mb-8 font-bold text-pure-white">Education</h2>
					<p className="p text-almost-white">
						Error loading education content. Please check the markdown files.
					</p>
				</div>
			</section>
		)
	}
}
