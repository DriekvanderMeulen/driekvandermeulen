import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface OrderItemProps {
  id: string;
  name: string;
  price: number;
  variant: string;
  quantity: number;
  image: string;
}

export const OrderItem = ({ name, price, variant, quantity, image }: OrderItemProps) => {
  return (
    <div className="flex items-start gap-4 border-b py-6 last:border-b-0">
      <img src={image} alt={name} className="h-20 w-20 rounded border object-cover" />
      <div className="flex-1 space-y-1">
        <h3 className="font-medium">{name}</h3>
        <p className="text-2xl font-semibold">${price.toFixed(2)}</p>
        <p className="text-muted-foreground text-sm">{variant}</p>
      </div>
      <div className="flex items-center gap-4">
        <Input type="number" value={quantity} className="w-24 text-center" readOnly />
        <div className="min-w-[80px] text-right">
          <p className="text-lg font-semibold">${(price * quantity).toFixed(2)}</p>
        </div>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
