import { Column } from "./kanban"
import { User } from "./user"

export interface Project {
    id: string
    name: string
    org_id: string
    description: string,
    columns?: Partial<Column>[]
    members: User[]
} 