"use client"
import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useRouter } from 'next/navigation'
import { useTask } from '@/hooks/kanban/use-task'
import Editor from '../editor'
import { JSONContent } from '@tiptap/react'
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { extractTitleAndDescription } from '@/lib/utils'
import { useUpdateTask } from '@/hooks/kanban/use-update-task'
import { toast } from '@/hooks/use-toast'

const TaskDialog = ({ task_id, project_id, refetch }: { task_id: string | null, project_id: string, refetch: () => (void) }) => {

    const router = useRouter()
    const { task, isLoading } = useTask(task_id)
    const { updateTask } = useUpdateTask();
    const [content, setContent] = React.useState<JSONContent>({})

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
        <Dialog onOpenChange={handleClose} open={Boolean(task_id)}>
            <DialogContent className="sm:max-w-[725px] prose h-[90vh] max-h-[500px] overflow-auto">
                {isLoading && <div>Loading...</div>}
                <VisuallyHidden.Root>
                    <DialogHeader>
                        <DialogTitle className='text-2xl'>{task?.title}</DialogTitle>
                        <DialogDescription>
                            {task?.description}
                        </DialogDescription>
                    </DialogHeader>
                </VisuallyHidden.Root>
                <Editor content={content} setContent={setContent} />
                <DialogFooter>
                    <Button onClick={handleSaveTask} type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default TaskDialog