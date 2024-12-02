"use client"

import { type LucideIcon } from "lucide-react"

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavMain({
    items,
}: {
    items: {
        title: string
        url: string
        icon: LucideIcon
        isActive?: boolean,
        count?: number
    }[]
}) {

    const path = usePathname()
    return (
        <SidebarMenu>
            {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton className="w-full" asChild isActive={path === item.url}>
                        <Link href={item.url} className="w-full">
                            <span className="flex items-center justify-between gap-2 w-full">
                                <span className="flex items-center gap-2">
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.title}</span>
                                </span>
                                {item?.count !== undefined && <span className="justify-self-end h-6 w-6 flex items-center text-xs justify-center rounded-full bg-background p-1">{item.count}</span>}
                            </span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    )
}
