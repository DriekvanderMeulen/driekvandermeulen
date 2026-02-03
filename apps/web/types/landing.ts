export interface HeroData {
	greeting: string
	name: string
	tagline: string
	studioLink: {
		text: string
		href: string
	}
	scrollLabel: string
	brandIndicator: string
}

export interface Accomplishment {
	icon: string
	value: string
	label: string
}

export interface AboutData {
	title: string
	subtitle: string
	image: {
		src: string
		alt: string
	}
	availableBadge: string
	bioTitle: string
	bioparagraphs: Array<string>
	ctas: {
		primary: { text: string; href: string }
		secondary: { text: string; href: string }
	}
	accomplishments: Array<Accomplishment>
}

export interface Job {
	company: string
	role: string
	period: string
	description: string
}

export interface ExperienceData {
	title: string
	subtitle: string
	jobs: Array<Job>
}

export interface Project {
	id: number
	title: string
	description: string
	tags: Array<string>
	image: string
	large?: boolean
	link: string
}

export interface ProjectsData {
	title: string
	subtitle: string
	projects: Array<Project>
}

export interface SkillCategory {
	name: string
	icon: string
	skills: Array<string>
}

export interface SkillsData {
	title: string
	subtitle: string
	categories: Array<SkillCategory>
}

export interface EducationItem {
	degree: string
	institution: string
	period: string
	primary: boolean
}

export interface EducationData {
	title: string
	subtitle: string
	items: Array<EducationItem>
}

export interface ContactOption {
	icon: string
	label: string
	href: string
	external?: boolean
}

export interface TabContent {
	description: string
	ctaText: string
	ctaHref?: string
}

export interface WhatsNextData {
	title: string
	titleAccent: string
	subtitle: string
	mainCta: {
		title: string
		description: string
		buttonText: string
		href: string
	}
	contactOptions: Array<ContactOption>
	tabs: {
		studio: TabContent
		freelance: TabContent
	}
	tabTitle: string
	philosophy: {
		label: string
		quote: string
		image: string
	}
}

export interface SocialLink {
	icon: string
	href: string
	label: string
	external?: boolean
}

export interface FooterLink {
	text: string
	href: string
	external?: boolean
}

export interface FooterData {
	brand: {
		name: string
		description: string
	}
	quickLinks: {
		title: string
		links: Array<FooterLink>
	}
	connect: {
		title: string
		links: Array<SocialLink>
	}
	copyright: string
	builtWith: string
}

export interface NavItem {
	label: string
	href: string
}

export interface NavbarData {
	brand: string
	items: Array<NavItem>
	cta: {
		text: string
		href: string
	}
}

export interface LandingData {
	hero: HeroData
	about: AboutData
	experience: ExperienceData
	projects: ProjectsData
	skills: SkillsData
	education: EducationData
	whatsNext: WhatsNextData
	footer: FooterData
	navbar: NavbarData
}
