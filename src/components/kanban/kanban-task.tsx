'use client'

import { Draggable } from "@hello-pangea/dnd"
import { Task } from "@/types/kanban"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { memo } from 'react'
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Folder, Forward, Trash2 } from "lucide-react"
import { SidebarMenuAction } from "../ui/sidebar"
import PriorityBadge from "../badge"


interface KanbanTaskProps {
  task: Task
  index: number
}

export const KanbanTask = memo(function KanbanTask({ task, index }: KanbanTaskProps) {
  const [mounted, setMounted] = useState(false)
  const { project_id } = useParams()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="m-0 p-1"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Link href={`/dashboard/project/${project_id}?task_id=${task.id}`}>
            <Card className="group relative bg-background">
              <CardHeader className="p-3">
                <div className="flex items-center justify-between">
                  <PriorityBadge priority={task.priority} />
                  <div className="opacity-0 group-hover:opacity-100"><DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction>
                        <MoreHorizontal className="dark:fill-white" />
                        <span className="sr-only">More</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-48 rounded-lg"
                    >
                      {/* <DropdownMenuItem>
                        <Folder className="text-muted-foreground" />
                        <span>View Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Forward className="text-muted-foreground" />
                        <span>Share Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator /> */}
                      <DropdownMenuItem>
                        <Trash2 className="text-muted-foreground" />
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
            </Card>
          </Link>
        </div>
      )
      }
    </Draggable >
  )
})
