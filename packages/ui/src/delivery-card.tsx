import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Truck } from "lucide-react";

interface DeliveryCardProps {
  address: {
    name: string;
    street: string;
    apt: string;
    city: string;
    country: string;
  };
  delivery: {
    type: string;
    date: string;
    time: string;
  };
}

const DeliveryCard = ({ address, delivery }: DeliveryCardProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="shadow-none">
        <CardContent className="flex gap-4">
          <div className="bg-muted flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg">
            <MapPin className="text-muted-foreground h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-foreground mb-3 font-semibold">{address.name}</h3>
            <div className="text-foreground space-y-1 text-sm">
              <p>{address.street}</p>
              <p>{address.apt}</p>
              <p>{address.city}</p>
              <p>{address.country}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardContent className="flex gap-4">
          <div className="bg-muted flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg">
            <Truck className="text-muted-foreground h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-foreground mb-3 font-semibold">{delivery.type}</h3>
            <div className="text-foreground space-y-1 text-sm">
              <p>{delivery.date}</p>
              <p>{delivery.time}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliveryCard;
