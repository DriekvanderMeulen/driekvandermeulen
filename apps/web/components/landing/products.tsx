import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

interface Product {
	title: string
	description: string
	link: string
}

const products: Array<Product> = [
	{
		title: 'Hobby Farmer',
		description:
			"A comprehensive management tool designed specifically for hobby farmers. Track egg production, manage sales, and monitor your flock's performance with ease. Built to simplify the agricultural hobbyist's daily routine.",
		link: '#',
	},
	{
		title: 'CMD App',
		description:
			'A collaborative platform for Communication & Multimedia Design students. Facilitates peer feedback, project sharing, and community growth within the academic environment. Streamlining the design critique process.',
		link: '#',
	},
	{
		title: 'Tiramisu',
		description:
			'A curated digital cookbook featuring my personal collection of baking and cooking recipes. From the perfect classic Tiramisu to experimental dishes, focusing on clarity and culinary passion.',
		link: '#',
	},
	{
		title: 'DevSweep',
		description:
			'A B2B SaaS solution optimized for developer productivity. Intelligent analysis of storage usage to identify and clean unnecessary build artifacts and cache files, keeping development environments lean and fast.',
		link: '#',
	},
	{
		title: 'Travel Era',
		description:
			'An AI-powered travel companion that revolutionizes trip planning. Minimize the hassle of scheduling and logistics while maximizing your travel experience through smart, personalized itinerary generation.',
		link: '#',
	},
]

function ProductCard({ product }: { product: Product }) {
	return (
		<div className="group relative z-0 flex h-full flex-col justify-between rounded-lg border border-studio-darker bg-pure-black p-8 transition-colors hover:border-studio">
			<div>
				<h3 className="h2 mb-4 font-bold text-studio">{product.title}</h3>
				<p className="p mb-8 leading-relaxed text-not-white">
					{product.description}
				</p>
			</div>
			<div>
				<Link
					href={product.link}
					className="inline-flex items-center gap-2 border-b border-transparent font-medium text-pure-white transition-colors hover:border-studio hover:text-studio"
				>
					Learn More
					<ArrowUpRight className="h-4 w-4" />
				</Link>
			</div>
		</div>
	)
}

export default function Products() {
	return (
		<section
			id="products"
			className="relative z-0 min-h-screen min-w-screen bg-pure-black px-6 py-24"
		>
			<div className="mx-auto max-w-6xl">
				{/* Title and Intro */}
				<div className="mb-16 text-center">
					<h2 className="h1 mb-8 text-center font-bold text-studio">
						Products
					</h2>
					<p className="p mx-auto max-w-3xl leading-relaxed text-almost-white">
						A showcase of my deployed products and applications, ranging from
						developer tools to lifestyle apps.
					</p>
				</div>

				{/* Products Grid */}
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{products.map((product) => (
						<ProductCard key={product.title} product={product} />
					))}
				</div>
			</div>
		</section>
	)
}
