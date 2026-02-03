import { Bath, Bed, Car, Home, Star } from 'lucide-react'
import Image from 'next/image'

import { Card, CardContent } from '@/components/ui/card'

interface PropertyCardProps {
	title: string
	image: string
	price: string
	address: string
	bedrooms: number
	bathrooms: number
	parking: number
	propertyType: string
	rating: number
	reviewCount: number
}

export function PropertyCard({
	title,
	image,
	price,
	rating,
	address,
	bedrooms,
	bathrooms,
	parking,
	propertyType,
	reviewCount,
}: PropertyCardProps) {
	return (
		<Card className="overflow-hidden border-0 py-0 shadow-none">
			<CardContent className="relative p-0">
				{/* Property Image */}
				<div className="relative aspect-square w-full">
					<Image src={image} alt={address} fill className="object-cover" />

					{/* Overlay Card at Bottom */}
					<div className="absolute inset-4 top-auto rounded-xl bg-background/70 p-4 backdrop-blur-md lg:p-6 dark:bg-background/50">
						<div className="mb-3 flex items-center justify-between gap-4">
							<h2 className="text-xl font-bold text-foreground">{title}</h2>
							<div className="text-sm font-semibold">{price}</div>
						</div>

						{/* Address */}
						<p className="mb-4 text-sm text-muted-foreground">{address}</p>

						{/* Property Details */}
						<div className="flex justify-between">
							<div className="flex items-center gap-6 text-sm text-muted-foreground">
								<div className="flex items-center gap-1">
									<Bed className="size-4" />
									<span>{bedrooms}</span>
								</div>
								<div className="flex items-center gap-1">
									<Bath className="size-4" />
									<span>{bathrooms}</span>
								</div>
								<div className="flex items-center gap-1">
									<Car className="size-4" />
									<span>{parking}</span>
								</div>
								<div className="flex items-center gap-1">
									<Home className="size-4" />
									<span>{propertyType}</span>
								</div>
							</div>

							<div className="flex items-center gap-1 text-foreground">
								<Star className="size-3 fill-amber-600 text-amber-600" />
								<span className="text-sm font-semibold">{rating}</span>
								<span className="text-sm text-muted-foreground">
									({reviewCount})
								</span>
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
