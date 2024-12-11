"use client"
import * as React from "react"
import { DatePicker } from "./date-picker"
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { MultiSelect } from "@/components/ui/multi-select"
import { useTags } from "@/hooks/kanban/use-tags"
import { useTaskContext } from "../task-context"
import { cn } from "@/lib/utils"

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
