"use client"
import * as React from "react"
import { Plus } from "lucide-react"

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
    const { selectedTags, setSelectedTags, handleUpdateTask } = useTaskContext()
    const { tags } = useTags(true)
    return (
        <Sidebar
            collapsible="none"
            className="sticky hidden lg:flex top-0 h-[95vh] border-l"
            {...props}
        >
            <SidebarHeader className="h-12 border-b">
            </SidebarHeader>
            <SidebarContent>
                <div className="m-2"
                >
                    <label className="text-sm">Tags</label>
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
                <SidebarSeparator className="mx-0" />
                <Calendars calendars={data.calendars} />
                <div className="sticky flex items-center p-2 bg-background justify-center bottom-0">
                    <Button className="w-full" onClick={handleUpdateTask}>Update task</Button>
                </div>
            </SidebarContent>
        </Sidebar>
    )
}
