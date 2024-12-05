"use client"
import { Calendar } from "@/components/ui/calendar"
import {
    SidebarGroup,
    SidebarGroupContent,
} from "@/components/ui/sidebar"
import React from "react"
import { useTaskContext } from "../task-context"
import { formatDistanceToNow } from "date-fns"

export function DatePicker() {
    const { dueOn, setDueOn } = useTaskContext()

    return (
        <SidebarGroup className="px-0">
            <SidebarGroupContent>
                <Calendar
                    mode="single"
                    selected={dueOn}
                    onSelect={setDueOn}
                    className="[&_[role=gridcell].bg-accent]:bg-sidebar-secondary [&_[role=gridcell].bg-accent]:rounded-full [&_[role=gridcell].bg-accent]:text-sidebar-secondary-foreground [&_[role=gridcell]]:w-[33px]" />

                {dueOn && <div className="px-4 italic opacity-60">Due {formatDistanceToNow(dueOn ?? "", { addSuffix: true })}</div>}

            </SidebarGroupContent>
        </SidebarGroup>
    )
}
