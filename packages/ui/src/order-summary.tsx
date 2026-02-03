import { ChevronDown } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface OrderSummaryProps {
	subtotal: number
	discount: number
	shipping: number
	total: number
	paidAmount: number
}

export const OrderSummary = ({
	subtotal,
	discount,
	shipping,
	total,
	paidAmount,
}: OrderSummaryProps) => {
	return (
		<Card className="p-6">
			<div className="mb-6 flex items-start justify-between">
				<div className="flex items-center gap-3">
					<h2 className="text-xl font-semibold">Order Summary</h2>
					<Badge
						variant="secondary"
						className="bg-orange-100 text-orange-800 hover:bg-orange-100"
					>
						Payment pending
					</Badge>
				</div>
				<div className="flex items-center gap-2 text-sm text-muted-foreground">
					<span>
						Use this personalized guide to get your store up and running.
					</span>
					<ChevronDown className="h-4 w-4" />
				</div>
			</div>

			<div className="space-y-4">
				<div className="flex justify-between">
					<span className="text-muted-foreground">Subtotal</span>
					<div className="text-right">
						<span className="mr-8 text-muted-foreground">2 item</span>
						<span className="font-medium">${subtotal.toFixed(2)}</span>
					</div>
				</div>

				<div className="flex justify-between">
					<span className="text-muted-foreground">Discount</span>
					<div className="text-right">
						<span className="mr-8 text-muted-foreground">New customer</span>
						<span className="font-medium">-${discount.toFixed(2)}</span>
					</div>
				</div>

				<div className="flex justify-between border-b pb-4">
					<span className="text-muted-foreground">Shipping</span>
					<div className="text-right">
						<span className="mr-8 text-muted-foreground">Free shipping</span>
						<span className="font-medium">${shipping.toFixed(2)}</span>
					</div>
				</div>

				<div className="flex justify-between pt-2 text-lg font-semibold">
					<span>Total</span>
					<span>${total.toFixed(2)}</span>
				</div>

				<div className="flex justify-between border-t pt-4">
					<span className="text-muted-foreground">Paid by customer</span>
					<span className="font-medium">${paidAmount.toFixed(2)}</span>
				</div>

				<div className="flex items-center justify-between">
					<span className="text-muted-foreground">
						Payment due when invoice is sent
					</span>
					<Button variant="link" className="h-auto p-0">
						Edit
					</Button>
				</div>
			</div>

			<div className="mt-6 flex items-center justify-between">
				<p className="text-sm text-muted-foreground">
					Review your order at a glance on the Order Summary page.
				</p>
				<div className="flex gap-3">
					<Button variant="outline">Send invoice</Button>
					<Button>Collect payment</Button>
				</div>
			</div>
		</Card>
	)
}
