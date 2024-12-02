"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Menu,
    MessagesSquare,
    Settings,
} from "lucide-react"

import Link from 'next/link'
import { useTaskContext } from "@/components/task/task-context";
import PeriodPicker from '@/components/task/period-picker'
import { Button } from '@/components/ui/button'
import { PriorityBadgeSelect } from '@/components/task/badge'
import { Task } from '@/types/kanban'
import { useTags } from '@/hooks/kanban/use-tags'
import { MultiSelect } from '@/components/ui/multi-select'
import { SidebarLeft } from "@/components/task/layout/sidebar-left"
import { SidebarRight } from "@/components/task/layout/sidebar-right"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
const data = {
    nav: [
        { name: "Overview", icon: Menu, href: "/" },
        { name: "Advanced", icon: Settings, href: "settings" },
    ],
}


const TaskDialog = ({ children }: { children: React.ReactNode }) => {

    const { handleClose, task } = useTaskContext()
    return (
        <Dialog onOpenChange={handleClose} open={Boolean(task)}>
            <DialogContent className="p-0 h-[95vh] max-w-[90vw] w-full overflow-hidden outline-none">
                <DialogTitle className="sr-only">Settings</DialogTitle>
                <DialogDescription className="sr-only">
                    Customize your settings here.
                </DialogDescription>
                <SidebarProvider>
                    <SidebarLeft />
                    <SidebarInset className='overflow-auto h-[95vh] min-h-none'>
                        <div className="flex flex-1 flex-col gap-4 p-4">
                            {children}
                        </div>
                    </SidebarInset>
                    <SidebarRight />
                </SidebarProvider>
            </DialogContent>
        </Dialog>
    )
}

export default TaskDialog