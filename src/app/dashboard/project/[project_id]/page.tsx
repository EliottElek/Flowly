import React from 'react'
import { KanbanBoard } from '@/components/kanban/kanban-board';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';
import AvatarList from '@/components/ui/avatar-list';
import { NavActions } from '@/components/project/nav-actions';
import { getProject } from '@/lib/actions/project';
import { redirect } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';
import { ListFilterIcon, ArrowDownToLineIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
type Params = Promise<{
    project_id: string;
}>

const page = async ({ params }: { params: Params }) => {
    const { project_id } = await params;
    const project = await getProject(project_id);

    if (!project) {
        redirect('/404');
    }
    return (
        <div className="w-full flex flex-col grow overflow-auto snap-mandatory md:snap-none h-[calc(100vh_-_60px)]">
            <header className="flex z-[500] sticky top-0 right-0 left-0 h-12 shrink-0 items-center justify-between gap-2 bg-background/10 backdrop-blur px-4">
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
            <div className='px-4 sticky right-0 left-0 py-2 flex justify-between gap-4 mt-3'>
                <div className='flex gap-4 items-center'>
                    <Tabs defaultValue="board">
                        <TabsList className='h-8'>
                            <Link href={`/dashboard/project/${project.id}`}><TabsTrigger className='h-7' value="board">Board</TabsTrigger></Link>
                            <Link href={`/dashboard/project/${project.id}/table-view`}><TabsTrigger className='h-6' value="table">Table</TabsTrigger></Link>
                        </TabsList>
                    </Tabs>
                    <Button disabled className='rounded-md h-8' variant={"outline"}>
                        <ListFilterIcon className='opacity-60' /> Filters
                    </Button>
                </div>
                <div className='flex gap-2 items-center'>
                    <Button disabled className='rounded-md h-8' variant={"outline"}>
                        <ArrowDownToLineIcon className='opacity-60' /> Export
                    </Button>
                    <Input type="text" className='h-8' placeholder="Search..." />
                </div>
            </div>
            <div className='flex'>
                <KanbanBoard project_id={project_id} />
            </div>
        </div>
    )
}

export default page