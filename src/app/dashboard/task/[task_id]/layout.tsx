"use client"
import React from 'react'
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
    Trash,
    XIcon,
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
import { PriorityBadgeSelect } from '@/components/badge'
import { useTaskContext } from "@/components/task/task-context";
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
const data = {
    nav: [
        { name: "Overview", icon: Menu, href: "/" },
        { name: "Discussion", icon: MessagesSquare, href: "comments" },
        { name: "Advanced", icon: Settings, href: "settings" },
    ],
}

const TaskDialog = ({ children }: { children: React.ReactNode }) => {

    const { handleClose, task, currentPath, handleUpdateTask, handleDeleteTask, content, refetch } = useTaskContext()
    return (
        <Dialog onOpenChange={handleClose} open={Boolean(task)}>
            <DialogContent className="p-0 h-[90vh] max-w-[75vw] overflow-hidden outline-none">
                <DialogTitle className="sr-only">Settings</DialogTitle>
                <DialogDescription className="sr-only">
                    Customize your settings here.
                </DialogDescription>
                <SidebarProvider className="items-start grow overflow-hidden">
                    <Sidebar collapsible="none" className="hidden md:flex !bg-[#F8F9FB] dark:!bg-[#111829] border-r">
                        <SidebarContent>
                            <SidebarGroup>
                                <Button className="outline-none" onClick={handleClose} variant="ghost" size={"icon"}><XIcon /></Button>
                                <SidebarGroupContent>
                                    <SidebarMenu className='p-3'>
                                        {data.nav.map((item) => (
                                            <SidebarMenuItem key={item.name}>
                                                <SidebarMenuButton
                                                    asChild
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
                        <header className='sticky flex items-center justify-between p-2 z-50 top-0 w-full h-12 border-b !bg-[#F8F9FB] dark:!bg-[#111829]'>
                            <PriorityBadgeSelect className='text-md my-6' task={task} refetch={refetch} />
                            <div className='flex items-center gap-2'>
                                <Button onClick={handleUpdateTask} disabled={JSON.stringify(content) === JSON.stringify(task?.content)} className='text-white font-bold h-7'>Save task</Button>
                                <Button variant={"destructive"} size={"icon"} onClick={handleDeleteTask} className='text-white font-bold'><Trash /></Button>
                            </div>
                        </header>
                        {children}
                    </main>
                </SidebarProvider>
            </DialogContent>
        </Dialog>
    )
}

export default TaskDialog