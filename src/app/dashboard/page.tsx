import { getOrgsAndProjects } from "@/lib/actions/project"
import { Project } from "@/types/project"
import Link from "next/link"
import { redirect } from "next/navigation"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import KanbanPlaceholder from "@/components/rand-svg"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import SlotCounter from 'react-slot-counter';
import { Organization } from "@/types/organization"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default async function Home() {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }
    const orgs = await getOrgsAndProjects()

    if (!orgs) {
        redirect('/404')
    }

    const orgAbled = false

    const ProjectCard = ({ project }: { project: Project }) => {
        return (
            <Link className="group duration-100 w-full h-64 md:w-64 md:bg-transparent bg-background" href={`/dashboard/project/${project.id}`}>
                <Card className="h-full rounded-lg h-40 w-full md:w-64 hover:ring-primary/20 ring-1 ring-transparent duration-100">
                    <KanbanPlaceholder kanbanData={project?.columns} />
                </Card>
                <CardHeader className="md:!p-2 md:!pt-4">
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                </CardHeader>
            </Link>
        )
    }
    return (
        <div>
            <header className="flex sticky w-full top-0 h-16 shrink-0 items-center gap-2 px-4">
                <div className="flex items-center w-full justify-between">
                    <SidebarTrigger />
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard/new-project"><Button className="h-8 font-bold bg-emerald-500 hover:bg-emerald-400 text-white">New project</Button></Link>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button disabled={!orgAbled} className="h-8 font-bold" variant={"secondary"}>New organization</Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                {orgAbled ? <p>Create a new organization</p> : <p>You reached your max number of organizations.</p>}
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </header>
            <div className="flex grow flex-col grow-1 w-full h-full overflow-hidden">
                <div className="p-6 space-y-12">
                    {orgs.map((org: Organization) => (
                        <div key={org.id} className="">
                            <div className="flex items-center gap-2 mt-6 mb-3"><h2 className="text-xl font-bold">{org.name}</h2>
                                <SlotCounter
                                    charClassName="opacity-60"
                                    autoAnimationStart={true}
                                    value={org?.projects?.length ?? 0}
                                    sequentialAnimationMode
                                    useMonospaceWidth
                                />
                            </div>
                            <div className="gap-5 flex flex-wrap items-center mt-2">
                                {org?.projects.length === 0 && <p className="italic">No project yet.</p>}
                                {org?.projects.map((project) => (
                                    <ProjectCard key={project.id} project={project} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
