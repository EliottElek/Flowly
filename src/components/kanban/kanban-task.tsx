'use client'
import { Draggable } from "@hello-pangea/dnd"
import { Task } from "@/types/kanban"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { memo } from 'react'
import Link from "next/link"
import { Calendar1Icon, MessagesSquare } from "lucide-react"
import { Tags } from "../task/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "../ui/separator"
import TaskContextMenu from "../task/task-menu"
import { format } from "date-fns"


interface KanbanTaskProps {
  task: Task | Partial<Task>
  index: number
  refetch: () => void
}

export const KanbanTask = memo(function KanbanTask({ task, index, refetch }: KanbanTaskProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !task.id) {
    return null
  }

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
            <TaskContextMenu task={task} refetch={refetch}>
              <Card className="group border-none dark:shadow-white/5 rounded-lg relative bg-background">
                <CardHeader className="p-3">
                  <div className="flex items-center justify-between">
                    <Tags tags={task?.tags ?? []} />
                  </div>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-md">{task.title}</CardTitle>
                  </div>
                  <CardDescription className="text-sm mt-1 line-clamp-5">
                    {task.description}
                  </CardDescription>
                </CardHeader>
                {/* <Separator /> */}
                <div className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6 rounded-full">
                      <AvatarImage src={task.user?.avatar_url} alt={"user?.user_name"} />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <span className="opacity-60 text-xs">{task.user?.user_name}
                      {/* , <span className="opacity-75">{formatDistanceToNow(task?.created_at ?? "", { addSuffix: true })}</span> */}
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    {task?.due_on &&
                      <span className="flex gap-1 items-center text-xs opacity-60">{format(task.due_on, 'dd/MM/yy')}<Calendar1Icon className="h-4 w-4" /></span>
                    }
                    {task?.due_on && task?.comments && task?.comments?.length > 0 &&
                      <Separator orientation="vertical" className="h-4" />
                    }
                    {task?.comments && task?.comments?.length > 0 &&
                      <span className="flex gap-1 items-center text-sm opacity-60 mr-1">{task?.comments?.length}<MessagesSquare className="h-4 w-4" /></span>
                    }
                  </div>
                </div>
              </Card>
            </TaskContextMenu>
          </Link>
        </div>
      )
      }
    </Draggable >
  )
})
