import type { Metadata } from 'next'
import localFont from 'next/font/local'

import './globals.css'

const quantico = localFont({
	src: [
		{
			path: './fonts/Quantico/Quantico-Regular.ttf',
			weight: '400',
			style: 'normal',
		},
		{
			path: './fonts/Quantico/Quantico-Italic.ttf',
			weight: '400',
			style: 'italic',
		},
		{
			path: './fonts/Quantico/Quantico-Bold.ttf',
			weight: '700',
			style: 'normal',
		},
		{
			path: './fonts/Quantico/Quantico-BoldItalic.ttf',
			weight: '700',
			style: 'italic',
		},
	],
	variable: '--font-quantico',
})

const inter = localFont({
	src: './fonts/Inter/Inter-VariableFont_opsz,wght.ttf',
	variable: '--font-inter',
})

export const metadata: Metadata = {
	title: 'Driek Studio | Creative Developer & Designer',
	description:
		'Full-stack developer and designer specializing in creating immersive web experiences. From 3D interactions to seamless animations, I build digital products that users love.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body
				className={`${quantico.variable} ${inter.variable} max-w-screen overflow-x-hidden antialiased`}
			>
				{children}
			</body>
		</html>
	)
}
