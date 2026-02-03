import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import { orderItems } from './data'
import { OrderItem } from './order-item'

export const OrderItems = () => {
	return (
		<Card className="shadow-none">
			<CardContent>
				<div className="">
					<div className="mb-6 flex items-center justify-between gap-3">
						<h2 className="text-xl font-semibold">Order Items</h2>
						<Badge variant="destructive">Unfulfilled</Badge>
					</div>
				</div>

				<div className="divide-y">
					{orderItems.map((item) => (
						<OrderItem key={item.id} {...item} />
					))}
				</div>

				<div className="mt-6 flex items-center justify-between">
					<p className="text-sm text-muted-foreground">
						Effortlessly manage your orders with our intuitive Order List page.
					</p>
					<div className="flex gap-3">
						<Button variant="outline">Fulfill item</Button>
						<Button>Create shipping label</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
