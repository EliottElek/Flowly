import { Metadata } from "next"
import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { getProject, getTasks } from '@/lib/actions/project'
import { NavActions } from "@/components/project/nav-actions"
import AvatarList from "@/components/ui/avatar-list"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}

type Params = Promise<{
  project_id: string;
}>

const page = async ({ params }: { params: Params }) => {
  const { project_id } = await params;
  const project = await getProject(project_id);

  if (!project) {
    redirect('/404');
  }
  const tasks = await getTasks(project_id)

  return (
    <>
      <div className="w-full flex flex-col grow overflow-auto snap-mandatory md:snap-none h-[calc(100vh_-_60px)]">
        <header className="flex z-50 sticky top-0 right-0 left-0 h-12 shrink-0 items-center justify-between gap-2 bg-background/10 backdrop-blur px-4">
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
        <div className="flex flex-col justify-between space-y-2 p-8">
          <div className="my-2 mb-4">
            <h2 className="text-2xl font-bold tracking-tight">{project.name}</h2>
            <p className="text-muted-foreground">
              {project.description}
            </p>
          </div>
          {//@ts-ignore
            <DataTable data={tasks} columns={columns} />
          }
        </div>
      </div>
    </>
  )
}
export default page