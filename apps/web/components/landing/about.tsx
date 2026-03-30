import { readFileSync } from 'fs'
import Image from 'next/image'
import { join } from 'path'

import {
	type ParsedContentItem,
	parseContentDocument,
} from '@/utils/content-parser'

function calculateYearsExperience(): number {
	const startDate = new Date('2019-09-01')
	const today = new Date()
	const years = today.getFullYear() - startDate.getFullYear()
	const months = today.getMonth() - startDate.getMonth()

	// If we haven't reached September this year, subtract 1 year
	if (months < 0 || (months === 0 && today.getDate() < startDate.getDate())) {
		return years - 1
	}

	return years
}

type StorySection = {
	title: string
	content: Array<ParsedContentItem>
}

function parseStoryDocument(rawDocument: string): Array<StorySection> {
	const sections: Array<StorySection> = []
	const lines = rawDocument.split(/\r?\n/)

	let currentTitle: string | null = null
	let currentContent: Array<string> = []

	const commitSection = () => {
		if (currentTitle && currentContent.length > 0) {
			const contentText = currentContent.join('\n')
			const parsed = parseContentDocument(contentText)
			sections.push({
				title: currentTitle,
				content: parsed.content,
			})
		}
		currentTitle = null
		currentContent = []
	}

	for (const line of lines) {
		const trimmedLine = line.trim()

		if (trimmedLine.startsWith('### ')) {
			commitSection()
			currentTitle = trimmedLine.substring(4).trim()
			continue
		}

		if (trimmedLine === '#') {
			commitSection()
			continue
		}

		if (currentTitle) {
			currentContent.push(line)
		}
	}

	commitSection()

	return sections
}

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

function StoryContent({
	title,
	content,
}: {
	title: string
	content: Array<ParsedContentItem>
}) {
	return (
		<div className="space-y-8">
			<h3 className="h2 mb-8 font-bold text-studio">{title}</h3>
			<div className="space-y-6">
				{content.map((item, index) => (
					<div key={index}>{renderContentItem(item)}</div>
				))}
			</div>
		</div>
	)
}

export default function About() {
	const _yearsExperience = calculateYearsExperience()

	let storySections: Array<StorySection> = []
	try {
		const storyContent = readFileSync(
			join(process.cwd(), 'content/story.md'),
			'utf-8',
		)
		storySections = parseStoryDocument(storyContent)
	} catch (error) {
		console.error('Error loading story content:', error)
	}

	return (
		<section
			id="about"
			className="min-h-screen min-w-screen bg-pure-black px-6 py-24"
		>
			<div className="mx-auto max-w-7xl">
				<div className="grid items-center gap-12 md:grid-cols-2 lg:gap-16">
					{/* Left Column - Text Content */}
					<div className="space-y-8">
						{/* Greeting */}
						<p className="mb-4 text-sm font-bold tracking-wider text-studio uppercase">
							Hello
						</p>

						{/* Name */}
						<h2 className="mb-6 text-5xl leading-tight font-bold text-pure-white md:text-6xl lg:text-7xl">
							I&apos;m Driek
						</h2>

						{/* Description */}
						<p className="mb-8 max-w-xl text-lg leading-relaxed text-almost-white">
							Passionate full stack developer who loves building frontends that
							look good and feel right, paired with backends that stay simple
							and efficient. Casual coffee drinker and professional tea enjoyer.
							Programmer by day and techno producer by night. Watches F1 only to
							weep as the prancing horse trips over itself, while half my brain
							is busy storing the metas of far too many 4X strategy games.
						</p>
					</div>

					{/* Right Column - Image */}
					<div className="flex items-center justify-center">
						{/* Placeholder for image - replace with actual image */}
						<div className="relative aspect-square w-full max-w-md overflow-hidden rounded-lg border-2 border-studio/20">
							<div className="absolute inset-0 flex items-center justify-center text-not-white">
								<Image
									src="/driek.png"
									alt="Profile"
									width={1200}
									height={1200}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="mt-32 mb-24 text-center">
					<h2 className="h1 mb-8 font-bold text-pure-white">Story</h2>
					<p className="p mx-auto max-w-3xl leading-relaxed text-almost-white">
						I want to begin with my story because these moments shaped who I am
						today. I have always wondered how much of people&apos;s stories is real
						because most only share the polished parts. I choose to be honest
						instead. These were the moments that challenged me and helped me
						grow.{' '}
					</p>
				</div>
				{/* Story Sections */}
				{storySections.length > 0 ? (
					<div className="mt-32">
						<div className="grid gap-12 md:grid-cols-2">
							{storySections.map((section, index) => {
								return (
									<div key={index}>
										<StoryContent
											title={section.title}
											content={section.content}
										/>
									</div>
								)
							})}
						</div>
					</div>
				) : null}
			</div>
		</section>
	)
}
