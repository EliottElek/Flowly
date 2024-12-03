import React from 'react'
import { getProject } from '@/lib/actions/project'
import { redirect } from 'next/navigation'
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';
import AvatarList from '@/components/ui/avatar-list';
import { NavActions } from '@/components/project/nav-actions';
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
            <header className="flex sticky top-0 h-12 bg-muted/50 shrink-0 items-center justify-between gap-2 border-b border-foreground/5 px-4">
                <div className="flex items-center gap-2">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <Link href="/dashboard">{project?.org?.name}</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{project.name}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div className="flex items-center gap-2">
                    <AvatarList users={project.members} />
                    <NavActions />
                </div>
            </header>
            <div className="flex grow flex-col grow-1 w-full h-full overflow-hidden pt-2">
                {children}
            </div>
        </ProjectProvider>
    );
};

