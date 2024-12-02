import { JSONContent } from "@tiptap/react"
import { User } from "./user"
import { Project } from "./project"

export interface Task {
  id: string,
  content: JSONContent,
  title: string,
  description: string,
  created_at: Date,
  column_id?: string,
  project_id?: string,
  priority?: string,
  user_id?: string,
  project?: Partial<Project>,
  user?: User,
  tags?: Tag[],
  comments?: Comment[] | Partial<Comment>[]
}

export interface Column {
  id: string
  name: string
  description: string
  tasks: Task[] | Partial<Task>[]
  project_id: string,
  index: number
}
export type Comment = {
  id: string;
  created_at: string;
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
  created_at: string;
  project_id: string;
  user: {
    id: string;
    username: string | null;
    email: string | null;
    avatar_url: string | null;
  };
  children: NestedComment[];
};
export type Tag = {
  id: string,
  name: string,
  color?: string
}