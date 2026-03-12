'use client'

import { type LucideIcon } from 'lucide-react'

import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'

export function NavMainVertical({
	items,
}: {
	items: Array<{
		title: string
		type: string
		url?: string
		icon?: LucideIcon
		items?: Array<{
			title: string
			url: string
			description?: string
			icon?: LucideIcon
		}>
	}>
}) {
	return (
		<>
			{items.map((item) => (
				<SidebarGroup key={item.title}>
					<SidebarGroupLabel>{item.title}</SidebarGroupLabel>
					<SidebarMenu>
						{item.items?.length ? (
							<>
								{item.items?.map((subItem) => (
									<SidebarMenuItem key={subItem.title}>
										<SidebarMenuButton asChild>
											<a href={subItem.url}>
												<span>{subItem.title}</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</>
						) : null}
					</SidebarMenu>
				</SidebarGroup>
			))}
		</>
	)
}
