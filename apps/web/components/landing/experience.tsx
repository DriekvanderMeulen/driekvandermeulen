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

function ExperienceContent({
	title,
	content,
}: {
	title: string | null
	content: Array<ParsedContentItem>
}) {
	return (
		<div className="space-y-8">
			{title && <h3 className="h2 mb-8 font-bold text-studio">{title}</h3>}
			<div className="space-y-6">
				{content.map((item, index) => (
					<div key={index}>{renderContentItem(item)}</div>
				))}
			</div>
		</div>
	)
}

export default function Experience() {
	try {
		const experienceContent = readFileSync(
			join(process.cwd(), 'content/35.md'),
			'utf-8',
		)
		const experienceParsed = parseContentDocument(experienceContent)

		return (
			<section
				id="experience"
				className="min-h-screen min-w-screen bg-pure-black px-6 py-24"
			>
				<div className="mx-auto max-w-6xl">
					{/* Title and Intro */}
					<div className="mb-16 text-center">
						<h2 className="h1 mb-8 font-bold text-pure-white">Experience</h2>
						<p className="p mx-auto max-w-3xl leading-relaxed text-almost-white">
							My professional journey in software development, focusing on
							creating impactful solutions through thoughtful engineering and
							continuous learning.
						</p>
					</div>

					{/* Experience Content */}
					<div className="mx-auto max-w-6xl">
						<div className="grid gap-12 md:grid-cols-2 lg:gap-16">
							{/* Left Column - Text Content */}
							<div className="space-y-8">
								<ExperienceContent
									title={experienceParsed.title}
									content={experienceParsed.content}
								/>
							</div>

							{/* Right Column - Logo */}
							<div className="flex items-center justify-center text-pure-white">
								<svg
									viewBox="0 0 62 49"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="h-48 w-48 opacity-80 md:h-64 md:w-64 lg:h-80 lg:w-80"
								>
									<g clipPath="url(#logo35-clip)">
										<path
											d="M53.1 12.2926C53.1 11.7598 52.7646 11.4639 52.1332 11.4639H51.127V13.8613H51.7583V13.0624H52.0148L52.5161 13.8613H53.2915L52.6656 13.0032C52.9616 12.8651 53.0997 12.5889 53.0997 12.2929L53.1 12.2926ZM52.1727 12.5099H51.7583V12.0364H52.1727C52.4095 12.0364 52.5081 12.1153 52.5081 12.2929C52.5081 12.431 52.4095 12.5099 52.1727 12.5099Z"
											fill="currentColor"
										/>
										<path
											d="M52.0661 15.2299C50.6763 15.2299 49.5454 14.099 49.5454 12.7092C49.5454 11.3194 50.6763 10.1885 52.0661 10.1885C53.4559 10.1885 54.5868 11.3194 54.5868 12.7092C54.5868 14.099 53.4559 15.2299 52.0661 15.2299ZM52.0661 10.8199C51.0242 10.8199 50.1768 11.6673 50.1768 12.7092C50.1768 13.7511 51.0242 14.5985 52.0661 14.5985C53.108 14.5985 53.9554 13.7511 53.9554 12.7092C53.9554 11.6673 53.108 10.8199 52.0661 10.8199Z"
											fill="currentColor"
										/>
										<path
											d="M45.8587 48.8H15.8944C11.0489 48.8 8.61651 48.8 6.41704 47.7861C4.03202 46.6867 2.11328 44.7676 1.01389 42.383C0 40.1831 0 37.7511 0 32.9056V15.8948C0 11.0493 0 8.61686 1.01389 6.41738C2.11363 4.03237 4.03237 2.11328 6.41738 1.01389C8.61686 0 11.0489 0 15.8944 0H45.8587C50.7042 0 53.1366 0 55.3361 1.01389C57.7211 2.11328 59.6399 4.03237 60.7393 6.41704C61.7532 8.61651 61.7531 11.0486 61.7531 15.8944V32.9052C61.7531 37.7507 61.7532 40.1831 60.7393 42.3826C59.6399 44.7676 57.7208 46.6864 55.3361 47.7858C53.1366 48.7997 50.7046 48.7997 45.8587 48.7997V48.8ZM5.02757 8.26758C4.41972 9.58644 4.41972 11.6945 4.41972 15.8948V32.9056C4.41972 37.1055 4.41972 39.2136 5.02757 40.5328C5.68665 41.9627 6.83727 43.1134 8.26758 43.7728C9.58644 44.381 11.6945 44.381 15.8948 44.381H45.8591C50.059 44.381 52.1671 44.381 53.4863 43.7728C54.9162 43.1137 56.0668 41.9631 56.7263 40.5328C57.3345 39.2139 57.3345 37.1055 57.3345 32.9056V15.8948C57.3345 11.6949 57.3345 9.58678 56.7266 8.26758C56.0672 6.83761 54.9166 5.68699 53.4866 5.02757C52.1678 4.41972 50.0597 4.41972 45.8594 4.41972H15.8944C11.6945 4.41972 9.58644 4.41972 8.26724 5.02757C6.83727 5.68665 5.68665 6.83761 5.02722 8.26758H5.02757Z"
											fill="currentColor"
										/>
										<path
											d="M25.8884 23.8331C27.578 22.5765 28.7352 20.4193 28.7352 18.1201C28.7352 13.8229 24.9555 10.1094 20.3094 10.1094C15.9883 10.1094 12.4167 13.3214 11.938 17.2277L16.3906 18.1135C16.6588 16.2529 17.8001 14.4502 20.3094 14.4502C22.4521 14.4502 24.1954 16.1515 24.1954 18.1201C24.1954 20.0887 22.5362 21.6069 20.3094 21.6554L18.4942 21.6949V25.9567L19.9543 25.9962C22.637 26.0689 24.6087 27.9101 24.6087 30.3138C24.6087 32.7175 22.5207 34.7335 19.9543 34.7335C17.3879 34.7335 15.7187 33.0643 15.2631 30.3211L10.8105 31.2069C11.2962 35.6124 15.2116 39.1525 19.9543 39.1525C25.024 39.1525 29.1485 35.1074 29.1485 30.2837C29.1485 27.5487 27.8674 25.2599 25.8884 23.8331Z"
											fill="currentColor"
										/>
										<path
											d="M41.3604 20.0675C39.8407 20.0675 38.6226 20.4452 37.4727 20.9768V16.8787C37.4727 16.2826 37.4727 15.9832 37.5973 15.7129C37.7326 15.4193 37.9687 15.1832 38.2619 15.0482C38.5326 14.9236 38.8317 14.9236 39.4278 14.9236H47.1104L48.4572 10.5039H40.189C37.9774 10.5039 36.8673 10.5039 35.8631 10.9667C34.7744 11.4686 33.8986 12.3444 33.3967 13.4331C32.9339 14.4369 32.9339 15.547 32.9339 17.759V23.8333L36.6578 26.4302C37.9552 25.3007 39.4063 24.4872 41.3597 24.4872C44.1542 24.4872 46.4194 26.8352 46.4194 29.6107C46.4194 32.3861 44.3657 34.7341 41.3597 34.7341C38.9054 34.7341 36.9718 32.9521 36.4013 30.6952L31.9487 31.581C32.9097 35.8744 36.7094 39.1535 41.3597 39.1535C46.659 39.1535 50.9593 35.0616 50.9593 29.709C50.9593 24.3564 46.6614 20.0682 41.3597 20.0682L41.3604 20.0675Z"
											fill="currentColor"
										/>
									</g>
									<defs>
										<clipPath id="logo35-clip">
											<rect width="61.7531" height="48.8" fill="white" />
										</clipPath>
									</defs>
								</svg>
							</div>
						</div>
					</div>
				</div>
			</section>
		)
	} catch (error) {
		console.error('Error loading experience content:', error)
		return (
			<section
				id="experience"
				className="min-h-screen bg-pure-black px-6 py-24"
			>
				<div className="mx-auto max-w-6xl text-center">
					<h2 className="h1 mb-8 font-bold text-pure-white">Experience</h2>
					<p className="p text-almost-white">
						Error loading experience content. Please check the markdown file.
					</p>
				</div>
			</section>
		)
	}
}
