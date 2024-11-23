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
import { useTaskContext } from "@/components/task/task-context";
import PeriodPicker from '@/components/task/period-picker'
const data = {
    nav: [
        { name: "Overview", icon: Menu, href: "/" },
        { name: "Advanced", icon: Settings, href: "settings" },
    ],
}

const TaskDialog = ({ children }: { children: React.ReactNode }) => {

    const { handleClose, task, currentPath } = useTaskContext()
    return (
        <Dialog onOpenChange={handleClose} open={Boolean(task)}>
            <DialogContent className="p-0 h-[90vh] max-w-[75vw] overflow-hidden outline-none">
                <DialogTitle className="sr-only">Settings</DialogTitle>
                <DialogDescription className="sr-only">
                    Customize your settings here.
                </DialogDescription>
                <SidebarProvider className="items-start grow overflow-hidden">
                    <Sidebar collapsible="none" className="hidden md:flex bg-muted/50 border-r">
                        <SidebarContent>
                            <SidebarGroup>
                                <SidebarGroupContent>
                                    <SidebarMenu className='pt-3'>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton
                                                asChild
                                            >
                                                <Link href={`${currentPath}/comments`}>
                                                    <MessagesSquare />
                                                    <span className='flex items-center w-full justify-between'><span>Discussion</span><span className='bg-gray-400/30 h-6 w-6 rounded-full flex items-center justify-center text-xs'>{task?.comments?.length}</span></span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
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
                                    <div><PeriodPicker /></div>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>
                    </Sidebar>
                    <main className="flex flex-1 grow flex-col overflow-auto h-[90vh] gap-4">
                        {/* <header className='sticky flex items-center justify-between p-2 z-50 top-0 w-full h-12 border-b bg-muted/50'>
                            <PriorityBadgeSelect className='text-md my-6' task={task} refetch={refetch} />
                            <div className='flex items-center gap-2'>
                                <Button onClick={handleUpdateTask} disabled={JSON.stringify(content) === JSON.stringify(task?.content)} className='font-bold'>Save task</Button>
                                <Button variant={"destructive"} size={"icon"} onClick={handleDeleteTask} className='font-bold'><Trash /></Button>
                            </div>
                        </header> */}
                        {children}
                    </main>
                </SidebarProvider>
            </DialogContent>
        </Dialog>
    )
}

export default TaskDialog