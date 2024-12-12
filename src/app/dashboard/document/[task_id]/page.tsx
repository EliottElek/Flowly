"use client"
import React from 'react'
import Editor from '@/components/editor'
import { useTaskContext } from '@/components/task/task-context'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb'
import Link from 'next/link'
const TaskDialog = () => {
    const { content, setContent, task, editable } = useTaskContext()
    return (
        <div className='p-8 space-y-8'>
            {task &&
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                <Link className='underline' href={`/dashboard/project/${task?.project?.id}`}>{task?.project?.name}</Link>
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbPage>{task?.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>}
            <Editor editable={editable} content={content} setContent={setContent} />
        </div>
    )
}

export default TaskDialog