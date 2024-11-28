import { Column } from "./kanban"

export interface Project {
    id: string
    name: string
    org_id: string
    description: string,
    columns?: Partial<Column>[]
} 