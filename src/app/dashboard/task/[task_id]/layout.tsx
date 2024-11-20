"use client"
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog"
import { useParams, useRouter, usePathname } from 'next/navigation'
import { useTask } from '@/hooks/kanban/use-task'
import {
    Menu,
    MessageCircle,
    Settings,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/ui/sidebar"
import Link from 'next/link'

const data = {
    nav: [
        { name: "Overview", icon: Menu, href: "/" },
        { name: "Comments", icon: MessageCircle, href: "comments" },
        { name: "Advanced", icon: Settings, href: "settings" },
    ],
}

const TaskDialog = ({ children }: { children: React.ReactNode }) => {
    const { task_id }: { task_id: string } = useParams()
    const router = useRouter();
    const currentPath = `/dashboard/task/${task_id}`

    const { task } = useTask(task_id)

    const handleClose = () => {
        if (!task) return
        router.push(`/dashboard/project/${task?.project_id}`)
    }

    return (
        <Dialog onOpenChange={handleClose} open={Boolean(task)}>
            <DialogContent className="p-0 h-[90vh] max-w-[75vw] overflow-hidden outline-none">
                <DialogTitle className="sr-only">Settings</DialogTitle>
                <DialogDescription className="sr-only">
                    Customize your settings here.
                </DialogDescription>
                <SidebarProvider className="items-start grow overflow-hidden">
                    <Sidebar collapsible="none" className="hidden md:flex bg-muted/50">
                        <SidebarContent>
                            <SidebarGroup>
                                <SidebarGroupContent>
                                    <SidebarMenu className='p-3'>
                                        {data.nav.map((item) => (
                                            <SidebarMenuItem key={item.name}>
                                                <SidebarMenuButton
                                                    asChild
                                                    isActive={item.name === "Messages & media"}
                                                >
                                                    <Link href={`${currentPath}/${item.href}`}>
                                                        <item.icon />
                                                        <span>{item.name}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>
                    </Sidebar>
                    <main className="flex flex-1 grow flex-col overflow-auto h-[90vh] gap-4">
                        {children}
                    </main>
                </SidebarProvider>
            </DialogContent>
        </Dialog >
    )
}

export default TaskDialog