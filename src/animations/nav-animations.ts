// nav-animations.ts
import { animate } from 'motion'

export function initNavAnimation() {
	const header = document.querySelector<HTMLElement>('.navscroll')
	if (!header) return

	const scrollThreshold = window.innerHeight * 0.001

	window.addEventListener('scroll', () => {
		if (window.scrollY > scrollThreshold) {
			animate(header, { padding: '0rem' }, { duration: 0.2 })
		} else {
			animate(header, { padding: '1rem' }, { duration: 0.2 })
		}
	})
}