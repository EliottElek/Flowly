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
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Logs from "./logs"
import TOC from "../toc"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { LockOpenIcon, LockIcon } from "lucide-react"

export function SidebarRight({
    ...props
}: React.ComponentProps<any>) {
    const { selectedTags, task, setSelectedTags, savingStatus, editable, setEditable } = useTaskContext()
    const { tags } = useTags(true)
    return (
        <Sidebar
            collapsible="none"
            className="sticky hidden lg:flex top-0 h-[100vh] border-l"
            {...props}
        >
            <SidebarHeader className="h-12 border-b flex flex-row justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Switch checked={editable} onCheckedChange={setEditable} id="airplane-mode" />
                    <Label htmlFor="airplane-mode">{editable ? <LockOpenIcon className="h-4 w-4 opacity-60" /> : <LockIcon className="h-4 w-4 opacity-60" />} </Label>
                </div>
                {editable &&
                    <div className="flex items-center">
                        <span className={cn("p-.5 px-2 flex gap-1 items-center rounded-full text-sm", savingStatus.className)}>{savingStatus.icon}{savingStatus.status}</span>
                    </div>}
            </SidebarHeader>
            <SidebarContent className="space-y-0">
                <Accordion type="single" collapsible>
                    <AccordionItem value="tags">
                        <AccordionTrigger className="p-3">Tags</AccordionTrigger>
                        <AccordionContent>
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
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="due-date">
                        <AccordionTrigger className="p-3">Due date</AccordionTrigger>
                        <AccordionContent>
                            <DatePicker />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="logs">
                        <AccordionTrigger className="p-3">Logs</AccordionTrigger>
                        <AccordionContent>
                            <Logs task_id={task?.id as string} />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="comments">
                        <AccordionTrigger className="p-3">Table of contents</AccordionTrigger>
                        <AccordionContent>
                            {task?.content && <TOC doc={task.content} />}
                        </AccordionContent>
                    </AccordionItem>


                </Accordion>
                {/* <SidebarSeparator className="mx-0" />
                <Calendars calendars={data.calendars} /> */}
            </SidebarContent>
        </Sidebar >
    )
}
