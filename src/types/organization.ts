import { Project } from "./project"

export interface Organization {
    id: string
    name: string
    description: string
    projects: Project[]
} 