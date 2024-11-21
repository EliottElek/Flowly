"use client"
import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { useParams, useRouter } from 'next/navigation'
import { useTask } from '@/hooks/kanban/use-task'
import { JSONContent } from '@tiptap/react'
import { useUpdateTask } from '@/hooks/kanban/use-update-task'
import { toast } from '@/hooks/use-toast'
import Editor from '@/components/editor'
import { PriorityBadgeSelect } from '@/components/badge'

const TaskDialog = () => {

    const router = useRouter()
    const { task_id }: { task_id: string } = useParams()

    const { task, refetch } = useTask(task_id)
    const { updateTask } = useUpdateTask();
    const [content, setContent] = React.useState<JSONContent>({})

    useEffect(() => {
        if (task) {
            setContent(task.content)
        }
    }, [task])

    const handleClose = () => {
        if (!task?.project_id) return
        router.push(`/dashboard/project/${task?.project_id}`)
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
    };

    return (
        <div className='p-4'>
            <PriorityBadgeSelect className='text-md my-6' task={task} refetch={refetch} />
            <div>
                <Editor content={content} setContent={setContent} />
                <div className='grow' />
                <div className='flex justify-end'>
                    <Button onClick={handleSaveTask} className='text-white'>Save task</Button>
                </div>
            </div>
        </div>
    )
}

export default TaskDialog