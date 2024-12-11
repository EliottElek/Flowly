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
import TOC from "../toc"
import { useTaskContext } from "../task-context"

export function SidebarLeft({
    commentsCount, ...props
}: { props?: React.ComponentProps<typeof Sidebar>, commentsCount?: number }) {

    const { task_id } = useParams()
    const { task } = useTaskContext()

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
        <Sidebar className="border-r-0 !h-[100vh]" {...props}>
            <SidebarHeader>
                <NavMain items={data.navMain} />
                <Logs task_id={task_id as string} />
                <SidebarSeparator className="mx-0" />
            </SidebarHeader>
            {task?.content && <TOC doc={task.content} />}
            <SidebarRail />
        </Sidebar>
    )
}
