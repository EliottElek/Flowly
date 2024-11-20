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
            <Link href={`/dashboard/project/${project.id}`}>
                <Card>
                    <CardHeader>
                        <CardTitle>{project.name}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                </Card>
            </Link>
        )
    }
    return (
        <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">ReconOps</h1>
            </div>
            <div className="grid gap-3 grid-cols-3">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div >
    )
}
