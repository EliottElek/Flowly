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
            <Link className="group duration-100 md:bg-transparent bg-background" href={`/dashboard/project/${project.id}`}>
                <Card className="h-full h-40 hover:ring-primary/20 ring-1 ring-transparent duration-100">
                    <KanbanPlaceholder kanbanData={project?.columns}/>
                </Card>
                <CardHeader className="md:!p-2 md:!pt-4">
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                </CardHeader>
            </Link>
        )
    }
    return (
        <div className="p-6 space-y-12">
            <div className="flex items-center mb-8 gap-3">
                <Link href="/dashboard/new-project"><Button className="h-8 font-bold">New project</Button></Link>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button disabled={!orgAbled} className="h-8 font-bold" variant={"secondary"}>New organization</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        {orgAbled ? <p>Create a new organization</p> : <p>You reached your max number of organizations.</p>}
                    </TooltipContent>
                </Tooltip>
            </div>
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
                    <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-2">
                        {org?.projects.length === 0 && <p className="italic">No project yet.</p>}
                        {org?.projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </div>
            ))}

        </div>
    )
}
