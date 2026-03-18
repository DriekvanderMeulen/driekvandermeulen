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
		case 'custom-div':
			return (
				<div className={item.className}>
					{item.children.map((child, index) => (
						<div key={index}>{renderContentItem(child)}</div>
					))}
				</div>
			)
		default:
			return null
	}
}

function SkillsContent({
	title,
	content,
}: {
	title: string | null
	content: Array<ParsedContentItem>
}) {
	// Group content items into pairs for 2-column layout
	const groupedContent: Array<Array<ParsedContentItem>> = []
	for (let i = 0; i < content.length; i += 2) {
		groupedContent.push(content.slice(i, i + 2))
	}

	return (
		<div className="space-y-8">
			{title && <h3 className="h2 mb-8 font-bold text-studio">{title}</h3>}
			<div className="grid gap-12 md:grid-cols-2">
				{groupedContent.map((group, groupIndex) => (
					<div key={groupIndex} className="">
						{group.map((item, itemIndex) => (
							<div key={itemIndex}>{renderContentItem(item)}</div>
						))}
					</div>
				))}
			</div>
		</div>
	)
}

export default function Skills() {
	try {
		const softSkillsContent = readFileSync(
			join(process.cwd(), 'content/soft-skills.md'),
			'utf-8',
		)
		const hardSkillsContent = readFileSync(
			join(process.cwd(), 'content/hard-skills.md'),
			'utf-8',
		)

		const softSkillsParsed = parseContentDocument(softSkillsContent)
		const hardSkillsParsed = parseContentDocument(hardSkillsContent)

		return (
			<section
				id="skills"
				className="min-h-screen min-w-screen bg-pure-black px-6 py-24"
			>
				<div className="mx-auto max-w-6xl">
					{/* Title and Intro */}
					<div className="mb-16 text-center">
						<h2 className="h1 mb-8 font-bold text-pure-white">Skills</h2>
						<p className="p mx-auto max-w-3xl leading-relaxed text-almost-white">
							A comprehensive overview of my technical and interpersonal skills,
							built through years of practical experience and continuous
							learning. These capabilities form the foundation of how I approach
							problems and deliver solutions.
						</p>
					</div>

					{/* Skills Content */}
					<div className="space-y-24">
						{/* Hard Skills */}
						<div className="space-y-8">
							<SkillsContent
								title={hardSkillsParsed.title}
								content={hardSkillsParsed.content}
							/>
						</div>
						<hr />
						{/* Soft Skills */}
						<div className="space-y-8">
							<SkillsContent
								title={softSkillsParsed.title}
								content={softSkillsParsed.content}
							/>
						</div>
					</div>
				</div>
			</section>
		)
	} catch (error) {
		console.error('Error loading skills content:', error)
		return (
			<section id="skills" className="min-h-screen bg-pure-black px-6 py-24">
				<div className="mx-auto max-w-6xl text-center">
					<h2 className="h1 mb-8 font-bold text-pure-white">
						Skills & Expertise
					</h2>
					<p className="p text-almost-white">
						Error loading skills content. Please check the markdown files.
					</p>
				</div>
			</section>
		)
	}
}
