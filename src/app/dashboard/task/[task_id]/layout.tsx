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
    Settings,
} from "lucide-react"
import { useTaskContext } from "@/components/task/task-context";
import { SidebarLeft } from "@/components/task/layout/sidebar-left"
import { SidebarRight } from "@/components/task/layout/sidebar-right"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"


const TaskDialog = ({ children }: { children: React.ReactNode }) => {

    const { handleClose, task } = useTaskContext()
    return (
        <Dialog onOpenChange={handleClose} open={Boolean(task)}>
            <DialogContent className="p-0 h-[100vh] max-w-[100vw] w-full overflow-hidden outline-none">
                <DialogTitle className="sr-only">Settings</DialogTitle>
                <DialogDescription className="sr-only">
                   Task control panel.
                </DialogDescription>
                <SidebarProvider>
                    <SidebarLeft commentsCount={task?.comments?.length ?? 0} />
                    <SidebarInset className='overflow-auto h-[100vh] editor-view'>
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