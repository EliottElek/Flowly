'use client'

import { DroppableProvided } from "@hello-pangea/dnd"
import { Column } from "@/types/kanban"
import { Card } from "@/components/ui/card"
import { KanbanTask } from "@/components/kanban/kanban-task"
import { useState } from "react"
import { CheckIcon, PencilIcon, XIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useUpdateColumn } from "@/hooks/kanban/use-update-column"
import { toast } from "@/hooks/use-toast"

interface KanbanColumnProps {
  column: Column
  provided: DroppableProvided
  refetch: () => void
}

export function KanbanColumn({
  column,
  provided,
  refetch
}: KanbanColumnProps) {
  const [edit, setEdit] = useState(false)
  const [name, setName] = useState(column.name)
  const { updateColumn } = useUpdateColumn()

  const onSubmitEdit = async (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    if (name === column.name) {
      setEdit(false)
      return
    }
    try {
      await updateColumn(column.id, { name: name })
      toast({
        title: "Your column name has been edited.",
        description: "Your column name has been successfully edited.",
      })
      refetch()
      setEdit(false)
    } catch (e) {
      toast({
        title: "An error occured while editing column.",
        description: "Your column name Could not be edited.",
        variant: "destructive"
      })
    }
  }
  return (
    <Card className="bg-muted/50 relative !min-h-[48px] overflow-hidden ">
      <div className="shadow p-2 px-3 z-50 group bg-muted/50 flex items-center gap-1 justify-between">
        {edit ? <>
          <Input
            className="font-bold text-sm focus:outline-none !h-auto p-1"
            autoFocus value={name}
            onBlur={(e) => {
              if (!e.relatedTarget?.matches("button")) {
                setEdit(false);
              }
            }} onChange={(e) => setName(e.target.value)} />
          <div className="flex items-center gap-1">
            <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/20 h-6 w-6" size={"icon"} onClick={onSubmitEdit}><CheckIcon /></Button>
            <Button variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/20 h-6 w-6" size={"icon"} onClick={() => setEdit(false)}><XIcon /></Button>
          </div>
        </> :
          <div className="flex w-full items-center justify-between">
            <Button onClick={() => setEdit(true)} variant={"ghost"} className="flex h-7 px-0 gap-2">
              <span className="font-bold text-sm">{column.name}</span>
              <span className="opacity-0 group-hover:opacity-100 duration-100" ><PencilIcon className="h-3 w-3 text-xs" /></span>
            </Button>
            <span className="text-md opacity-50">{column.tasks.length}</span>
          </div>
        }
      </div>
      <div
        className="min-h-[10px] z-0 p-1 overflow-y-auto max-h-[calc(100vh_-_11.5rem)]"
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