'use client'

import { Draggable } from "@hello-pangea/dnd"
import { Task } from "@/types/kanban"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { memo } from 'react'
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MessagesSquare, MoreHorizontal } from "lucide-react"
import { SidebarMenuAction } from "../ui/sidebar"
import { Tags } from "../task/badge"
import { useDeleteTask } from "@/hooks/kanban/use-delete-task"
import { useConfirm } from "../use-confirm-dialog"
import { toast } from "@/hooks/use-toast"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "../ui/separator"
import { formatDistanceToNow } from "date-fns/formatDistanceToNow"


interface KanbanTaskProps {
  task: Task | Partial<Task>
  index: number
  refetch: () => void
}

export const KanbanTask = memo(function KanbanTask({ task, index, refetch }: KanbanTaskProps) {
  const [mounted, setMounted] = useState(false)
  const { confirm } = useConfirm()
  const { deleteTask } = useDeleteTask()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !task.id) {
    return null
  }

  const handleDeleteTask = async (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    if (await confirm({ title: "Are you sure ?", message: "You're about to delete this task. This action is irreversable." })) {
      await deleteTask(task.id as string);
      toast({
        title: "Your task has been deleted.",
        description: "Your task has been successfully deleted.",
      })
      refetch()
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="m-0 p-0.5"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Link href={`/dashboard/task/${task.id}`}>
            <Card className="group rounded-xl relative bg-background">
              <CardHeader className="p-3">
                <div className="flex items-center justify-between">
                  <Tags tags={task?.tags ?? []} />
                  <div className="opacity-0 -ml-2 group-hover:opacity-100">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuAction>
                          <MoreHorizontal className="dark:fill-white" />
                          <span className="sr-only">More</span>
                        </SidebarMenuAction>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="w-48 rounded"
                      >
                        <DropdownMenuItem className="cursor-pointer">

                          <Link href={`/dashboard/task/${task.id}`}><span>View and edit</span></Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Link href={`/dashboard/task/${task.id}/comments`}><span>Comments</span></Link>
                        </DropdownMenuItem><DropdownMenuItem className="cursor-pointer">
                          <Link href={`/dashboard/task/${task.id}/settings`}><span>Settings</span></Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer" onClick={handleDeleteTask}>
                          {/* <Trash2 className="text-muted-foreground" /> */}
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-md">{task.title}</CardTitle>
                </div>
                <CardDescription className="text-sm mt-1 line-clamp-5">
                  {task.description}
                </CardDescription>
              </CardHeader>
              <Separator />
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6 rounded-full">
                    <AvatarImage src={task.user?.avatar_url} alt={"user?.user_name"} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <span className="opacity-60 text-xs">{task.user?.user_name}, <span className="opacity-75">{formatDistanceToNow(task?.created_at ?? "", { addSuffix: true })}</span></span>
                </div>
                {task?.comments && task?.comments?.length > 0 &&
                  <span className="flex gap-1 items-center text-sm opacity-60">{task?.comments?.length}<MessagesSquare className="h-4 w-4" /></span>
                }
              </div>
            </Card>
          </Link>
        </div>
      )
      }
    </Draggable >
  )
})
