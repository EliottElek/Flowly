'use client'

import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd"
import { KanbanColumn } from "./kanban-column"
import { NewTask } from "./new-task"
import { useKanban } from "@/hooks/kanban/use-kanban"
import { useUpdateTask } from "@/hooks/kanban/use-update-task";
import KanbanSkeleton from "./kanban-skeleton"
import NewColumn from "./new-column"
import { Column } from "@/types/kanban"

export function KanbanBoard({ project_id }: { project_id: string }) {

  const { columns, isLoading, refetch } = useKanban(project_id);
  const { updateTask } = useUpdateTask();

  const onDragEnd = async (result: DropResult) => {

    if (!Array.isArray(columns)) return
    const { destination, source } = result

    if (!destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)) {
      return
    }

    const newColumns = [...columns]
    const sourceCol = newColumns.find(col => col.id === source.droppableId)
    const destCol = newColumns.find(col => col.id === destination.droppableId)

    if (!sourceCol || !destCol) return

    const [movedTask] = sourceCol.tasks.splice(source.index, 1)
    movedTask.column_id = destination.droppableId
    destCol.tasks.splice(destination.index, 0, movedTask)
    setTimeout(async () => await updateTask(movedTask.id, { column_id: destination.droppableId }), 1000);
  }

  if (isLoading) return <KanbanSkeleton />

  return (
    <>
      <div className="px-4 flex items-center justify-end"><NewTask refetch={refetch} project_id={project_id} />
      </div>
      <div className="w-full overflow-auto p-4 flex h-full">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex flex-row gap-4">
            {columns && columns.map((column: Column) => (
              <div key={column.id} className="w-full !w-[300px]">
                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <KanbanColumn
                      column={column}
                      provided={provided}
                    />
                  )}
                </Droppable>
              </div>
            ))}
            <NewColumn project_id={project_id} refetch={refetch} />
          </div>
        </DragDropContext>
      </div>
    </>
  )
} 