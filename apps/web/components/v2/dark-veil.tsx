'use client'

const noisePattern =
	'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc2NCcgaGVpZ2h0PSc2NCc+CiAgPGZpbHRlciBpZD0nbm9pc2UnPjxmZVR1cmJ1bGVuY2UgYmFzZUZyZXF1ZW5jeT0nMC44JyBudW1PY3RhdmVzPScxJyBzdGl0Y2hUaWxlcz0nc3RpdGNoJy8+PC9maWx0ZXI+CiAgPHJlY3Qgd2lkdGg9JzEwMCUnIGhlaWdodD0nMTAwJScgZmlsdGVyPSd1cmwoI25vaXNlKScvPgo8L3N2Zz4='

const layerStyles = [
	'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 60%)',
	'radial-gradient(circle at 80% 10%, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 55%)',
	'radial-gradient(circle at 50% 75%, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0) 65%)',
	'linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.95))',
	`url(${noisePattern})`,
]

export default function DarkVeilOverlay() {
	return (
		<div
			className="pointer-events-none absolute inset-0"
			style={{
				backgroundImage: layerStyles.join(', '),
				backgroundBlendMode: 'screen, screen, screen, overlay, multiply',
				backgroundSize: '140% 140%, 120% 120%, 160% 160%, cover, 200% 200%',
				opacity: 0.92,
			}}
		/>
	)
}
