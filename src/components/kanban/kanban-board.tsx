'use client'

import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"
import { KanbanColumn } from "./kanban-column"
import { NewTask } from "./new-task"
import { useKanban } from "@/hooks/kanban/use-kanban"
import { useUpdateTask } from "@/hooks/kanban/use-update-task";
import KanbanSkeleton from "./kanban-skeleton"
import NewColumn from "./new-column"
import { Column } from "@/types/kanban"
import { useUpdateColumnIndexes } from "@/hooks/kanban/use-update-columns-indexes"
import { useState, useEffect } from "react";

export function KanbanBoard({ project_id }: { project_id: string }) {
  const { columns: initialColumns, isLoading, refetch } = useKanban(project_id);
  const [columns, setColumns] = useState(initialColumns || []); // Manage local state for immediate updates
  const { updateTask } = useUpdateTask();
  const { updateColumnsIndexes } = useUpdateColumnIndexes();

  useEffect(() => {
    if (initialColumns) setColumns(initialColumns);
  }, [initialColumns]);

  const onDragEnd = async (result: DropResult) => {
    if (!Array.isArray(columns)) return;

    const { destination, source, type } = result;

    if (!destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)) {
      return;
    }

    if (type === 'column') {
      const reorderedColumns = [...columns];
      const [movedColumn] = reorderedColumns.splice(source.index, 1);
      reorderedColumns.splice(destination.index, 0, movedColumn);
      const updatedColumns = reorderedColumns.map((column, index) => ({
        ...column,
        index,
      }));
      setColumns(updatedColumns);
      try {
        await updateColumnsIndexes(
          updatedColumns.map(({ id, index }) => ({ id, index }))
        );
      } catch (error) {
        console.error("Error updating column indexes:", error);
        refetch();
      }

      return;
    }
    const newColumns = [...columns];
    const sourceCol = newColumns.find(col => col.id === source.droppableId);
    const destCol = newColumns.find(col => col.id === destination.droppableId);

    if (!sourceCol || !destCol) return;

    const [movedTask] = sourceCol.tasks.splice(source.index, 1);
    movedTask.column_id = destination.droppableId;
    destCol.tasks.splice(destination.index, 0, movedTask);

    setColumns(newColumns);
    try {
      await updateTask(movedTask.id, { column_id: destination.droppableId });
    } catch (error) {
      refetch();
    }
  };

  if (isLoading) return <KanbanSkeleton />;

  return (
    <>
      <div className="px-4 flex items-center justify-end">
        <NewTask refetch={refetch} project_id={project_id} />
      </div>
      <div className="w-full overflow-auto p-4 flex h-full">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-columns" direction="horizontal" type="column">
            {(provided) => (
              <div
                className="flex flex-row px-2"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {columns.map((column: Column, i: number) => (
                  <Draggable draggableId={column.id} index={i} key={column.id}>
                    {(draggableProvided) => (
                      <div
                        className="w-full !w-[380px] p-2"
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                      >
                        <Droppable droppableId={column.id} type="task">
                          {(taskProvided) => (
                            <KanbanColumn
                              column={column}
                              provided={taskProvided}
                              refetch={refetch}
                            />
                          )}
                        </Droppable>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <NewColumn project_id={project_id} refetch={refetch} />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
}
