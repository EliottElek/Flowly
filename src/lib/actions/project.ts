import { Project } from "@/types/project"
import { createClient } from "../supabase/server"

export async function getProject(project_id: string): Promise<Project> {
    const supabase = await createClient()
    let { data: project, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', project_id).single()

    if (error) {
        throw error
    }
    return project as Project
}

export async function getProjects(): Promise<Project[]> {
    const supabase = await createClient()
    let { data: projects, error } = await supabase
        .from('projects')
        .select('id, name, description')

    if (error) {
        throw error
    }
    return projects as Project[]
}