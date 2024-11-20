"use client"
import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog"
import { useRouter } from 'next/navigation'
import { useTask } from '@/hooks/kanban/use-task'
import Editor from '../editor'
import { JSONContent } from '@tiptap/react'
import { useUpdateTask } from '@/hooks/kanban/use-update-task'
import { toast } from '@/hooks/use-toast'
import {
    Bell,
    Check,
    Globe,
    Home,
    Keyboard,
    Link,
    Lock,
    Menu,
    MessageCircle,
    Paintbrush,
    Settings,
    Video,
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
import { useKanban } from '@/hooks/kanban/use-kanban'

const data = {
    nav: [
        { name: "Notifications", icon: Bell },
        { name: "Navigation", icon: Menu },
        { name: "Home", icon: Home },
        { name: "Appearance", icon: Paintbrush },
        { name: "Messages & media", icon: MessageCircle },
        { name: "Language & region", icon: Globe },
        { name: "Accessibility", icon: Keyboard },
        { name: "Mark as read", icon: Check },
        { name: "Audio & video", icon: Video },
        { name: "Connected accounts", icon: Link },
        { name: "Privacy & visibility", icon: Lock },
        { name: "Advanced", icon: Settings },
    ],
}

const TaskDialog = ({ task_id, project_id }: { task_id: string, project_id: string }) => {

    const router = useRouter()
    const { task } = useTask(task_id)
    const { updateTask } = useUpdateTask();
    const [content, setContent] = React.useState<JSONContent>({})
    const { refetch } = useKanban(project_id);


    useEffect(() => {
        if (task) {
            setContent(task.content)
        }
    }, [task])

    const handleClose = () => {
        router.push(`/dashboard/project/${project_id}`)
        setContent({})
    }

    const handleSaveTask = async () => {
        if (!task) return
        await updateTask(task?.id, { content: content });
        handleClose()
        toast({
            title: "Your task has been created.",
            description: "Your task has been successfully created.",
        })
        refetch()
    };

    return (
        <Dialog onOpenChange={handleClose} open={Boolean(task)}>
            <DialogContent className="p-0 h-[90vh] max-w-[75vw] overflow-hidden">
                <DialogTitle className="sr-only">Settings</DialogTitle>
                <DialogDescription className="sr-only">
                    Customize your settings here.
                </DialogDescription>
                <SidebarProvider className="items-start grow overflow-hidden">
                    <Sidebar collapsible="none" className="hidden md:flex">
                        <SidebarContent>
                            <SidebarGroup>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {data.nav.map((item) => (
                                            <SidebarMenuItem key={item.name}>
                                                <SidebarMenuButton
                                                    asChild
                                                    isActive={item.name === "Messages & media"}
                                                >
                                                    <a href="#">
                                                        <item.icon />
                                                        <span>{item.name}</span>
                                                    </a>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>
                    </Sidebar>
                    <main className="flex flex-1 grow flex-col overflow-auto h-[80vh] p-8 gap-4 m-auto pt-1">
                        <Editor content={content} setContent={setContent} />
                        <div className='grow' />
                        <div className='flex justify-end'>
                            <Button onClick={handleSaveTask} className='text-white'>Save task</Button>
                        </div>
                    </main>
                </SidebarProvider>
            </DialogContent>
        </Dialog >
    )
}

export default TaskDialog