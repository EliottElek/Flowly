import React from 'react'
import { KanbanBoard } from '@/components/kanban/kanban-board';


type Params = Promise<{
    project_id: string;
}>

const page = async ({ params }: { params: Params }) => {
    const { project_id } = await params;

    return (
        <KanbanBoard project_id={project_id} />
    )
}

export default page