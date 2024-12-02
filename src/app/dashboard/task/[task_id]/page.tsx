"use client"
import React from 'react'
import Editor from '@/components/editor'
import { useTaskContext } from '@/components/task/task-context'

const TaskDialog = () => {
    const { content, setContent } = useTaskContext()
    return (
        <div className='p-8'>
            <Editor content={content} setContent={setContent} />
        </div>
    )
}

export default TaskDialog