import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const StudioFloat = () => {
	return (
		<div className="fixed top-6 left-6 z-[60]">
			<Link
				href="/office"
				className="group relative flex items-center gap-3 overflow-hidden rounded-lg border border-studio-darker bg-pure-black py-2 pr-4 pl-3 transition-all duration-300 hover:border-studio hover:shadow-[0_0_15px_rgba(46,184,192,0.15)]"
			>
				<div className="absolute inset-0 bg-studio/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

				{/* Animated accent line */}
				<div className="absolute top-0 bottom-0 left-0 w-[2px] bg-studio opacity-70 transition-opacity group-hover:opacity-100" />

				<div className="relative z-10 flex flex-col">
					<span className="font-[family-name:var(--font-quantico)] text-xs leading-tight font-bold tracking-widest text-studio uppercase">
						Driek Studio
					</span>
					<span className="font-[family-name:var(--font-inter)] text-[10px] text-not-white transition-colors group-hover:text-almost-white">
						Interactive Experience
					</span>
				</div>
				<ArrowUpRight className="relative z-10 h-3.5 w-3.5 text-studio-light transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-studio" />
			</Link>
		</div>
	)
}

export default StudioFloat
