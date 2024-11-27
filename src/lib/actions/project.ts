"use server"
import { Project } from "@/types/project"
import { createClient } from "../supabase/server"
import { redirect } from "next/navigation"
import { Description } from "@radix-ui/react-alert-dialog"

export async function getProject(project_id: string): Promise<Project> {
    const supabase = await createClient()
    let { data: project, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', project_id).single()

    if (error) {
        return redirect("/404")
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

export async function createProject(values: { name: string, description: string, org_id: string }): Promise<Partial<Project>> {
    const supabase = await createClient()
    let { data: project, error } = await supabase
        .from('projects')
        .insert({ name: values.name, description: values.description, org_id: values.org_id }).select("id").single()

    if (error) {
        throw error
    }
    if (!project) redirect("/error")
    return project
}