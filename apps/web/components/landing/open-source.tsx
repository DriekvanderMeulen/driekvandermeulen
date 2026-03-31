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

type Project = {
	name: string
	githubUrl: string
	description: Array<ParsedContentItem>
}

function ProjectCard({ project }: { project: Project }) {
	return (
		<div className="relative z-0 rounded-lg border border-studio-darker bg-pure-black p-8 transition-colors hover:border-studio">
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<h3 className="h2 font-bold text-studio">{project.name}</h3>
					<a
						href={project.githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="pointer-events-auto relative z-10 text-studio transition-colors hover:text-studio-dark"
						aria-label={`View ${project.name} on GitHub`}
					>
						<svg
							className="h-6 w-6"
							fill="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path
								fillRule="evenodd"
								d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
								clipRule="evenodd"
							/>
						</svg>
					</a>
				</div>
				<div className="space-y-4">
					{project.description.map((item, itemIndex) => (
						<div key={itemIndex}>{renderContentItem(item)}</div>
					))}
				</div>
			</div>
		</div>
	)
}

// Hardcoded GitHub URLs in the order they appear in the markdown
const GITHUB_URLS = [
	'https://github.com/driekvandermeulen/fig-grids',
	'https://github.com/driekvandermeulen/dev-sweep',
]

function parseOpenSourceDocument(rawDocument: string): Array<Project> {
	const projects: Array<Project> = []
	const lines = rawDocument.split(/\r?\n/)

	let currentProject: Partial<Project> | null = null
	let currentContent: Array<string> = []
	let projectIndex = 0

	const commitProject = () => {
		if (currentProject?.name && currentContent.length > 0) {
			const contentText = currentContent.join('\n')
			const parsed = parseContentDocument(contentText)
			projects.push({
				name: currentProject.name,
				githubUrl: GITHUB_URLS[projectIndex] || '',
				description: parsed.content,
			})
			projectIndex++
		}
		currentProject = null
		currentContent = []
	}

	for (const line of lines) {
		const trimmedLine = line.trim()

		if (trimmedLine.startsWith('## ')) {
			commitProject()
			const projectName = trimmedLine.substring(3).trim()
			currentProject = {
				name: projectName,
			}
			continue
		}

		if (trimmedLine.startsWith('github:')) {
			// Skip github line, we use hardcoded URLs
			continue
		}

		if (trimmedLine === '#') {
			commitProject()
			continue
		}

		if (currentProject) {
			currentContent.push(line)
		}
	}

	commitProject()

	return projects
}

export default function OpenSource() {
	try {
		const openSourceContent = readFileSync(
			join(process.cwd(), 'content/open-source.md'),
			'utf-8',
		)
		const projects = parseOpenSourceDocument(openSourceContent)

		return (
			<section
				id="open-source"
				className="relative z-0 min-h-screen min-w-screen bg-pure-black px-6 py-24"
			>
				<div className="mx-auto max-w-6xl">
					{/* Title and Intro */}
					<div className="mb-16 text-center">
						<h2 className="h1 mb-8 font-bold text-pure-white">Open Source</h2>
						<p className="p mx-auto max-w-3xl leading-relaxed text-almost-white">
							I&apos;m a big fan of open source, and when you profit from
							something, you should give back. Here are some of my contributions
							to the community, completely open source and free to use.
						</p>
					</div>

					{/* Projects Grid */}
					<div className="grid gap-8 md:grid-cols-2">
						{projects.map((project) => (
							<ProjectCard key={project.name} project={project} />
						))}
					</div>
				</div>
			</section>
		)
	} catch (error) {
		console.error('Error loading open source content:', error)
		// Fallback with default projects using hardcoded URLs
		const defaultProjects: Array<Project> = [
			{
				name: 'Fig Grids',
				githubUrl: GITHUB_URLS[0]!,
				description: [],
			},
			{
				name: 'Dev Sweep',
				githubUrl: GITHUB_URLS[1]!,
				description: [],
			},
		]

		return (
			<section
				id="open-source"
				className="relative z-0 min-h-screen min-w-screen bg-pure-black px-6 py-24"
			>
				<div className="mx-auto max-w-6xl">
					<div className="mb-16 text-center">
						<h2 className="h1 mb-8 font-bold text-pure-white">Open Source</h2>
						<p className="p mx-auto max-w-3xl leading-relaxed text-almost-white">
							I&apos;m a big fan of open source, and when you profit from
							something, you should give back. Here are some of my contributions
							to the community, completely open source and free to use.
						</p>
					</div>
					<div className="grid gap-8 md:grid-cols-2">
						{defaultProjects.map((project) => (
							<ProjectCard key={project.name} project={project} />
						))}
					</div>
				</div>
			</section>
		)
	}
}
