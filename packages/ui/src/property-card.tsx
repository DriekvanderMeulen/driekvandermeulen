import { Card, CardContent } from "@/components/ui/card";
import { Bed, Bath, Car, Star, Home } from "lucide-react";
import Image from "next/image";

interface PropertyCardProps {
  title: string;
  image: string;
  price: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  propertyType: string;
  rating: number;
  reviewCount: number;
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
  reviewCount
}: PropertyCardProps) {
  return (
    <Card className="overflow-hidden border-0 py-0 shadow-none">
      <CardContent className="relative p-0">
        {/* Property Image */}
        <div className="relative aspect-square w-full">
          <Image src={image} alt={address} fill className="object-cover" />

          {/* Overlay Card at Bottom */}
          <div className="bg-background/70 dark:bg-background/50 absolute inset-4 top-auto rounded-xl p-4 backdrop-blur-md lg:p-6">
            <div className="mb-3 flex items-center justify-between gap-4">
              <h2 className="text-foreground text-xl font-bold">{title}</h2>
              <div className="text-sm font-semibold">{price}</div>
            </div>

            {/* Address */}
            <p className="text-muted-foreground mb-4 text-sm">{address}</p>

            {/* Property Details */}
            <div className="flex justify-between">
              <div className="text-muted-foreground flex items-center gap-6 text-sm">
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

              <div className="text-foreground flex items-center gap-1">
                <Star className="size-3 fill-amber-600 text-amber-600" />
                <span className="text-sm font-semibold">{rating}</span>
                <span className="text-muted-foreground text-sm">({reviewCount})</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
