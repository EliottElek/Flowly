import React from 'react'
import { getProject } from '@/lib/actions/project'
import { redirect } from 'next/navigation'
import { ProjectProvider } from '@/components/project/project-context';
export default async function ProjectLayout({
    params,
    children
}: {
    params: Promise<{ project_id: string }>, children: React.ReactNode
}) {
    const { project_id } = await params;
    const project = await getProject(project_id);

    if (!project) {
        redirect('/404');
    }

    return (
        <ProjectProvider project_id={project.id}>
            <div id={"board-bg"} className="flex grow flex-col grow-1 w-full h-full">
                {children}
            </div>
        </ProjectProvider>
    );
};

