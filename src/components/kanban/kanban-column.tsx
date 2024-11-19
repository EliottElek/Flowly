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
    <Card className="bg-gray-100 dark:bg-gray-900 relative !min-h-[48px] overflow-y-auto overflow-x-hidden max-h-[calc(100vh_-_8rem)]">
      <div className="sticky shadow top-0 p-2 bg-gray-100 z-50 dark:bg-gray-900"><h3 className="font-bold text-sm">{column.name} ({column.tasks.length})</h3></div>
      <div
        className="min-h-[10px] z-0 p-1"
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