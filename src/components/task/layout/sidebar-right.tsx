"use client"
import * as React from "react"
import { Plus, SaveIcon } from "lucide-react"

import { Calendars } from "./calendars"
import { DatePicker } from "./date-picker"
import { NavUser } from "./nav-users"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar"
import { MultiSelect } from "@/components/ui/multi-select"
import { useTags } from "@/hooks/kanban/use-tags"
import { useTaskContext } from "../task-context"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    calendars: [
        {
            name: "My Calendars",
            items: ["Personal", "Work", "Family"],
        },
        {
            name: "Favorites",
            items: ["Holidays", "Birthdays"],
        },
        {
            name: "Other",
            items: ["Travel", "Reminders", "Deadlines"],
        },
    ],
}

export function SidebarRight({
    ...props
}: React.ComponentProps<any>) {
    const { selectedTags, setSelectedTags, savingStatus } = useTaskContext()
    const { tags } = useTags(true)
    return (
        <Sidebar
            collapsible="none"
            className="sticky hidden lg:flex top-0 h-[100vh] border-l"
            {...props}
        >
            <SidebarHeader className="h-12 border-b flex flex-row items-center">
                <div className="flex items-center">
                    <span className={cn("p-.5 px-2 flex gap-1 items-center rounded-full text-sm", savingStatus.className)}>{savingStatus.icon}{savingStatus.status}</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <div className="m-2 space-y-1"
                >
                    <label className="text-sm">Tags ({selectedTags?.length ?? 0})</label>
                    <MultiSelect
                        // @ts-ignore
                        options={tags}
                        onValueChange={setSelectedTags}
                        defaultValue={selectedTags}
                        placeholder="Select tags"
                        variant="inverted"
                        animation={2}
                        maxCount={3}
                    />
                </div>
                <DatePicker />
                {/* <SidebarSeparator className="mx-0" />
                <Calendars calendars={data.calendars} /> */}
            </SidebarContent>
        </Sidebar>
    )
}
