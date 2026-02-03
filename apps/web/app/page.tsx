import { AboutSection } from '@/components/landing/about-section'
import { EducationSection } from '@/components/landing/education-section'
import { FooterSection } from '@/components/landing/footer-section'
import { HeroSection } from '@/components/landing/hero-section'
import { LandingNavbar } from '@/components/landing/navbar'
import { ProjectsSection } from '@/components/landing/projects-section'
import { SkillsSection } from '@/components/landing/skills-section'
import { WhatsNextSection } from '@/components/landing/whats-next-section'
import { WorkExperienceSection } from '@/components/landing/work-experience-section'
import landingData from '@/data/landing.json'
import type { LandingData } from '@/types/landing'

const data = landingData as LandingData

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col">
			<LandingNavbar data={data.navbar} />

			<main className="flex-1">
				<HeroSection data={data.hero} />
				<AboutSection data={data.about} />
				<WorkExperienceSection data={data.experience} />
				<ProjectsSection data={data.projects} />
				<SkillsSection data={data.skills} />
				<EducationSection data={data.education} />
				<WhatsNextSection data={data.whatsNext} />
			</main>

			<FooterSection data={data.footer} />
		</div>
	)
}
