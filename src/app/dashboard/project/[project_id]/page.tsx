import React from 'react'
import { getProject } from '@/lib/actions/project'
import { redirect } from 'next/navigation'
import { KanbanBoard } from '@/components/kanban/kanban-board';

type Params = Promise<{
    project_id: string;
}>

const page = async ({ params }: { params: Params }) => {
    const { project_id } = await params
    const project = await getProject(project_id);

    if (!project) {
        redirect('/404')
    }
    return (
        <KanbanBoard project_id={project.id} />
    )
}

export default page