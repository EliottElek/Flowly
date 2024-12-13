"use client"

import * as React from "react"
import {
    ArrowDown,
    ArrowUp,
    Bell,
    Copy,
    CornerUpLeft,
    CornerUpRight,
    FileText,
    GalleryVerticalEnd,
    LineChart,
    Link,
    MoreHorizontal,
    Settings2,
    Star,
    Trash,
    Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { useProjectContext } from "./project-context"
import { useMemo } from "react"


export function NavActions() {
    const [isOpen, setIsOpen] = React.useState(false)
    const { handleDeleteProject } = useProjectContext()

    const data = useMemo(() => [
        [
            {
                label: "Customize Page",
                icon: Settings2,
            },
            {
                label: "Turn into wiki",
                icon: FileText,
            },
        ],
        [
            {
                label: "Copy Link",
                icon: Link,
            },
            {
                label: "Duplicate",
                icon: Copy,
            },
            {
                label: "Move to",
                icon: CornerUpRight,
            },
        ],
        [
            {
                label: "Undo",
                icon: CornerUpLeft,
            },
            {
                label: "View analytics",
                icon: LineChart,
            },
            {
                label: "Version History",
                icon: GalleryVerticalEnd,
            },
            {
                label: "Show delete pages",
                icon: Trash,
            },
            {
                label: "Notifications",
                icon: Bell,
            },
        ],
        [
            {
                label: "Import",
                icon: ArrowUp,
            },
            {
                label: "Export Icalendar",
                icon: ArrowDown,
            },
        ],
        [{
            label: "Move to Trash",
            icon: Trash2,
            variant: "destructive",
            action: handleDeleteProject
        },]
    ], [])

    return (
        <div className="flex items-center gap-2 text-sm">
            <div className="hidden font-medium text-muted-foreground md:inline-block">
                Edit Oct 08
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7">
                <Star />
            </Button>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 data-[state=open]:bg-accent"
                    >
                        <MoreHorizontal />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-56 z-50 overflow-hidden rounded-lg p-0"
                    align="end"
                >
                    <Sidebar collapsible="none" className="bg-transparent">
                        <SidebarContent>
                            {data.map((group, index) => (
                                <SidebarGroup key={index} className="border-b last:border-none">
                                    <SidebarGroupContent className="gap-0">
                                        <SidebarMenu>
                                            {group.map((item: any, index) => (
                                                <SidebarMenuItem key={index}>
                                                    <SidebarMenuButton onClick={item.action} className={cn("hover:bg-accent", item?.variant === "destructive" && "text-destructive hover:text-destructive hover:bg-destructive/10")} >
                                                        <item.icon /> {item.label}
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            ))}
                                        </SidebarMenu>
                                    </SidebarGroupContent>
                                </SidebarGroup>
                            ))}
                        </SidebarContent>
                    </Sidebar>
                </PopoverContent>
            </Popover>
        </div >
    )
}
