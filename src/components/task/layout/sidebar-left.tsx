"use client"

import * as React from "react"
import {
    Home,
    Inbox,
} from "lucide-react"

import { NavMain } from "./nav-main"
import {
    Sidebar,
    SidebarHeader,
    SidebarRail,
    SidebarSeparator,
} from "@/components/ui/sidebar"
import { useMemo } from "react"
import { useParams } from 'next/navigation'
import Logs from "./logs"

export function SidebarLeft({
    commentsCount, ...props
}: { props?: React.ComponentProps<typeof Sidebar>, commentsCount?: number }) {

    const { task_id } = useParams()

    const data = useMemo(() => ({
        navMain: [
            {
                title: "Content",
                url: `/dashboard/task/${task_id}`,
                icon: Home,
            },
            {
                title: "Feed",
                url: `/dashboard/task/${task_id}/feed`,
                icon: Inbox,
                badge: "10",
                count: commentsCount
            },
        ]
    }), [])
    return (
        <Sidebar className="border-r-0 h-[95vh]" {...props}>
            <SidebarHeader>
                <NavMain items={data.navMain} />
                <SidebarSeparator className="mx-0" />
                <Logs task_id={task_id as string} />
                <SidebarSeparator className="mx-0" />
            </SidebarHeader>
            <SidebarRail />
        </Sidebar>
    )
}
