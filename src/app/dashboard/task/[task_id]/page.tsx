"use client"
import React from 'react'
import Editor from '@/components/editor'
import { useTaskContext } from '@/components/task/task-context'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb'
import Link from 'next/link'
const TaskDialog = () => {
    const { content, setContent, task } = useTaskContext()
    return (
        <div className='p-8 space-y-8'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                        <Link href={`/dashboard/project/${task?.project?.id}`}>{task?.project?.name}</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{task.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Editor content={content} setContent={setContent} />
        </div>
    )
}

export default TaskDialog