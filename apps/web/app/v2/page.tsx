'use client'

import { useEffect, useState } from 'react'
import type { SVGProps } from 'react'

const navItems = ['about', 'products', 'blog', 'contact']

function SunIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
			<circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
			<path
				d="M12 3v2.5M12 18.5V21M4.5 12h2.5M17 12h2.5M6.34 6.34l1.77 1.77M15.89 15.89l1.77 1.77M6.34 17.66l1.77-1.77M15.89 8.11l1.77-1.77"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}

function MoonIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
			<path
				d="M16 15.2a5.2 5.2 0 01-6.4-6.4 5.2 5.2 0 006.4 6.4z"
				fill="currentColor"
				fillOpacity="0.9"
			/>
			<path
				d="M16.9 12.84a7 7 0 01-8.86-8.86 7 7 0 108.86 8.86z"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}

export default function V2LandingPage() {
	const [isDark, setIsDark] = useState(true)
	const [isCommandCenterOpen, setIsCommandCenterOpen] = useState(false)

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
				event.preventDefault()
				setIsCommandCenterOpen(true)
			}

			if (event.key === 'Escape') {
				setIsCommandCenterOpen(false)
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [])

	useEffect(() => {
		document.documentElement.dataset.theme = isDark ? 'dark' : 'light'
	}, [isDark])

	const rootBg = isDark
		? 'bg-slate-950 text-white'
		: 'bg-slate-50 text-slate-900'
	const secondaryText = isDark ? 'text-white/70' : 'text-slate-600'
	const headerBorder = isDark ? 'border-white/10' : 'border-slate-200'
	const headerBg = isDark ? 'bg-white/5' : 'bg-white/80'
	const titleColor = isDark ? 'text-white' : 'text-slate-900'
	const navHover = isDark ? 'hover:text-white' : 'hover:text-slate-900'
	const versionStyle = isDark
		? 'border-white/20 text-white/80'
		: 'border-slate-200 text-slate-600'
	const controlBorder = isDark
		? 'border-white/20 hover:border-white/40'
		: 'border-slate-300 hover:border-slate-400'
	const controlBg = isDark ? 'bg-white/5' : 'bg-white'
	const controlText = isDark ? 'text-white' : 'text-slate-900'
	const mutedText = isDark ? 'text-white/70' : 'text-slate-500'
	const subtitleText = isDark ? 'text-white/80' : 'text-slate-700'
	const overlayBg = isDark ? 'bg-slate-950/80' : 'bg-slate-950/40'
	const modalSurface = isDark
		? 'border-white/10 bg-slate-900/90 text-white'
		: 'border-slate-200 bg-white text-slate-900'
	const modalMuted = isDark ? 'text-white/50' : 'text-slate-500'
	const inputPlaceholder = isDark
		? 'placeholder:text-white/40'
		: 'placeholder:text-slate-400'
	const focusRing =
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/80'

	return (
		<div className={`${rootBg} min-h-screen transition-colors duration-300`}>
			<header
				className={`sticky top-0 z-20 border-b ${headerBorder} ${headerBg} backdrop-blur-lg`}
			>
				<div className="mx-auto flex min-h-20 max-w-[88rem] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3 sm:px-6">
					<div className="flex items-center gap-3">
						<p
							className={`text-lg font-black tracking-widest uppercase ${titleColor}`}
						>
							driek studio
						</p>
						<span
							className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase ${versionStyle}`}
						>
							v2.8.8
						</span>
					</div>

					<div className="flex w-full items-center justify-end gap-3 sm:w-auto sm:gap-4">
						<button
							onClick={() => setIsDark((prev) => !prev)}
							className={`flex h-10 w-10 items-center justify-center rounded-2xl border ${controlBorder} ${controlBg} ${focusRing} transition`}
							aria-label="Toggle light or dark mode"
						>
							{isDark ? (
								<SunIcon className={`h-5 w-5 ${controlText}`} />
							) : (
								<MoonIcon className={`h-5 w-5 ${controlText}`} />
							)}
						</button>

						<button
							onClick={() => setIsCommandCenterOpen(true)}
							className={`hidden items-center gap-3 rounded-2xl border px-4 py-2 text-sm font-medium transition sm:flex ${controlBorder} ${controlBg} ${focusRing}`}
							aria-label="Open command center"
						>
							<span className={mutedText}>Search</span>
							<kbd
								className={`rounded-full border px-2 py-0.5 text-xs uppercase ${versionStyle}`}
							>
								⌘&nbsp;K
							</kbd>
						</button>

						<nav
							className={`flex items-center gap-3 text-sm sm:gap-5 ${secondaryText}`}
						>
							{navItems.map((item) => (
								<a
									key={item}
									className={`rounded-full px-2 py-1 capitalize transition ${navHover} ${focusRing}`}
									href={`#${item}`}
								>
									{item}
								</a>
							))}
						</nav>
					</div>
				</div>
			</header>

			<main className="pt-28">
				<div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-5 text-center">
					<h1 className="text-5xl font-black tracking-tight sm:text-7xl">
						driek studio
					</h1>
					<h2
						className={`max-w-2xl text-base font-medium sm:text-2xl ${subtitleText}`}
					>
						where creative design meets thoughtful engineering.
					</h2>
				</div>
			</main>

			{isCommandCenterOpen && (
				<div
					className={`fixed inset-0 z-30 flex items-center justify-center px-4 ${overlayBg}`}
					onClick={() => setIsCommandCenterOpen(false)}
				>
					<div
						className={`w-full max-w-xl rounded-3xl border p-6 shadow-2xl backdrop-blur ${modalSurface}`}
						onClick={(event) => event.stopPropagation()}
						role="dialog"
						aria-modal="true"
						aria-label="Command Center"
					>
						<div className="flex items-center justify-between">
							<p className="text-sm font-semibold">Command Center</p>
							<button
								onClick={() => setIsCommandCenterOpen(false)}
								className={`text-sm transition ${modalMuted} ${focusRing}`}
							>
								esc
							</button>
						</div>
						<div
							className={`mt-5 flex items-center gap-3 rounded-2xl border p-4 ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'}`}
						>
							<MoonIcon className={`h-6 w-6 ${modalMuted}`} />
							<input
								autoFocus
								placeholder="Start typing a command…"
								name="command-search"
								autoComplete="off"
								aria-label="Command search"
								className={`w-full bg-transparent text-base ${inputPlaceholder} ${focusRing}`}
							/>
						</div>
						<p className={`mt-4 text-sm ${modalMuted}`}>
							Nothing has been indexed yet. This space is ready for your
							commands.
						</p>
					</div>
				</div>
			)}
		</div>
	)
}
