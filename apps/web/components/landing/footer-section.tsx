import { Button } from '@repo/ui/button'
import { Separator } from '@repo/ui/separator'
import Link from 'next/link'

import { IconFromName } from '@/components/icon-map'
import type { FooterData } from '@/types/landing'

interface FooterSectionProps {
	data: FooterData
}

export function FooterSection({ data }: FooterSectionProps) {
	return (
		<footer className="border-t border-sidebar-border bg-sidebar/30">
			<div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 md:px-12 md:py-20 lg:px-16">
				<div className="mb-12 grid grid-cols-1 gap-10 md:mb-16 md:grid-cols-4">
					{/* Brand */}
					<div className="md:col-span-2">
						<h3 className="font-quantico mb-3 text-xl font-bold">
							<span className="text-studio">[</span> {data.brand.name}{' '}
							<span className="text-studio">]</span>
						</h3>
						<p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
							{data.brand.description}
						</p>
					</div>

					{/* Quick Links */}
					<div>
						<h4 className="font-quantico mb-3 text-sm font-bold text-foreground">
							{data.quickLinks.title}
						</h4>
						<ul className="space-y-2 text-sm text-muted-foreground">
							{data.quickLinks.links.map((link) => (
								<li key={link.href}>
									{link.href.startsWith('mailto:') ? (
										<a
											href={link.href}
											className="transition-colors hover:text-studio"
										>
											{link.text}
										</a>
									) : (
										<Link
											href={link.href}
											className="transition-colors hover:text-studio"
										>
											{link.text}
										</Link>
									)}
								</li>
							))}
						</ul>
					</div>

					{/* Social Links */}
					<div>
						<h4 className="font-quantico mb-3 text-sm font-bold text-foreground">
							{data.connect.title}
						</h4>
						<div className="flex gap-2">
							{data.connect.links.map((link) => (
								<Button
									key={link.href}
									variant="ghost"
									size="icon"
									asChild
									className="h-9 w-9 rounded-lg bg-studio-darker text-muted-foreground hover:bg-studio-dark hover:text-studio"
								>
									<a
										href={link.href}
										target={link.external ? '_blank' : undefined}
										rel={link.external ? 'noopener noreferrer' : undefined}
										aria-label={link.label}
									>
										<IconFromName name={link.icon} className="h-4 w-4" />
									</a>
								</Button>
							))}
						</div>
					</div>
				</div>

				{/* Copyright */}
				<Separator className="bg-sidebar-border" />
				<div className="flex flex-col items-center justify-between gap-3 pt-6 text-xs text-muted-foreground md:flex-row">
					<p>
						&copy; {new Date().getFullYear()} {data.copyright}
					</p>
					<p className="font-mono text-xs opacity-70">{data.builtWith}</p>
				</div>
			</div>
		</footer>
	)
}
