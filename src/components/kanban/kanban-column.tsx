'use client'

import { DroppableProvided } from "@hello-pangea/dnd"
import { Column } from "@/types/kanban"
import { Card } from "@/components/ui/card"
import { KanbanTask } from "@/components/kanban/kanban-task"

interface KanbanColumnProps {
  column: Column
  provided: DroppableProvided
}

export function KanbanColumn({
  column,
  provided,
}: KanbanColumnProps) {
  return (
    <Card className="bg-muted/50 relative !min-h-[48px] overflow-hidden ">
      <div className="shadow p-2 z-50 bg-muted/50"><h3 className="font-bold text-sm">{column.name} ({column.tasks.length})</h3></div>
      <div
        className="min-h-[10px] z-0 p-1 overflow-y-auto max-h-[calc(100vh_-_11rem)]"
        ref={provided.innerRef}
        {...provided.droppableProps}
      >
        {column.tasks.map((task, index) => (
          <KanbanTask
            key={task.id}
            task={task}
            index={index}
          />
        ))}
        {provided.placeholder}
      </div>
    </Card>
  )
} 