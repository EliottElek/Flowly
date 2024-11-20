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
  tasks: Task[] | Partial<Task>[]
  project_id: string
}
export type Comment = {
  id: string;
  content: JSONContent;
  task_id: string;
  project_id: string;
  parent_id: string | null;
  user: {
    id: string;
    email: string | null;
    username: string | null;
    avatar_url: string | null;
  };
};

export type NestedComment = {
  id: string;
  content: JSONContent;
  parent_id: string | null;
  task_id: string;
  project_id: string;
  user: {
    id: string;
    username: string | null;
    email: string | null;
    avatar_url: string | null;
  };
  children: NestedComment[];
};