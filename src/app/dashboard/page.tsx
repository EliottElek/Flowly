import { getProjects } from "@/lib/actions/project"
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
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
export default async function Home() {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }
    const projects = await getProjects()

    if (!projects) {
        redirect('/404')
    }

    const ProjectCard = ({ project }: { project: Project }) => {
        return (
            <Link className="group hover:text-primary duration-100" href={`/dashboard/project/${project.id}`}>
                <Card className="h-32">
                    <CardHeader>
                        <CardTitle className="group-hover:text-primary">{project.name}</CardTitle>
                        <CardDescription className="group-hover:text-primary">{project.description}</CardDescription>
                    </CardHeader>
                </Card>
            </Link>
        )
    }
    return (
        <div className="p-6">
            <div className="flex items-center mb-8 gap-3">
                <Button>New project</Button><Button variant={"secondary"}>New organization</Button>
            </div>
            <h2 className="text-xl mt-6 mb-3 font-bold">Eliott's Org</h2>
            <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-2">
                {projects.length === 0 && <p className="italic">No project yet.</p>}
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div >
    )
}
