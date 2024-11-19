import { JSONContent } from "@tiptap/react"

export interface Task {
  id: string,
  content: JSONContent,
  title: string,
  description?: string,
  createdAt: Date,
  column_id: string,
  project_id: string,
  priority: string,
}

export interface Column {
  id: string
  name: string
  description: string
  tasks: Task[]
  project_id: string

} 