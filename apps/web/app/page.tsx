import About from '@/components/landing/about'
import LightRays from '@/components/landing/bits/light-rays'
import StaggeredMenu from '@/components/landing/bits/staggered-menu'
import Education from '@/components/landing/education'
import Experience from '@/components/landing/experience'
import Hero from '@/components/landing/hero'
import OpenSource from '@/components/landing/open-source'
import Products from '@/components/landing/products'
import Skills from '@/components/landing/skills'

const menuItems = [
	{ label: 'About', ariaLabel: 'Learn about me', link: '#about' },
	{ label: 'Skills', ariaLabel: 'View my skills', link: '#skills' },
	{
		label: 'Experience',
		ariaLabel: 'View my work experience',
		link: '#work-experience',
	},
	{ label: 'Education', ariaLabel: 'View my education', link: '#education' },
	{ label: 'Products', ariaLabel: 'View my products', link: '#products' },
]

const socialItems = [
	{ label: 'GitHub', link: 'https://github.com/driekvandermeulen' },
	{
		label: 'LinkedIn',
		link: 'https://www.linkedin.com/in/driek-van-der-meulen-492506209/?originalSubdomain=nl',
	},
]

export default function Home() {
	return (
		<main>
			<div className="pointer-events-none fixed top-0 right-0 z-50 h-screen w-screen bg-transparent">
				<StaggeredMenu
					isFixed={true}
					position="right"
					items={menuItems}
					socialItems={socialItems}
					displaySocials={true}
					displayItemNumbering={true}
					menuButtonColor="#fff"
					openMenuButtonColor="#fff"
					changeMenuColorOnOpen={true}
					logoUrl="/v2/logo.png"
					accentColor="#1D98CD"
				/>
			</div>
			<div
				style={{
					width: '100vw',
					height: '100vh',
					position: 'relative',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: '#000',
				}}
			>
				<div style={{ position: 'absolute', inset: 0 }}>
					<LightRays
						raysOrigin="top-center"
						raysColor="#fff"
						raysSpeed={1.5}
						lightSpread={2}
						rayLength={1.5}
						followMouse={true}
						mouseInfluence={0.1}
						noiseAmount={0}
						distortion={0}
						className="custom-rays"
					/>
				</div>
				<Hero></Hero>
			</div>
			<div className="container">
				<About />
				<Skills />
				<Experience />
				<Education />
				<Products />
				<OpenSource />
			</div>
		</main>
	)
}
