import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Task } from "@/types/kanban"
import { useState, useEffect } from "react"
import { useCreateTask } from "@/hooks/kanban/use-create-task"
import { useColumns } from "@/hooks/kanban/use-columns"
import { PlusIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import Editor from "../editor"
import { JSONContent } from "@tiptap/react"
import defaultContent from '@/components/editor/default-content.json'
import { extractTitleAndDescription } from "@/lib/utils";

const priorities = ["low", "medium", "high"]

export function NewTask({ refetch, project_id }: { refetch: () => void, project_id: string }) {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const { columns, isLoading: columnsLoading } = useColumns(project_id);
  const { createTask, isLoading } = useCreateTask();
  const [content, setContent] = useState<JSONContent>(defaultContent)

  const [formData, setFormData] = useState<Partial<Task>>({
    title: '',
    description: '',
    column_id: "",
    priority: "low",
    content: content,
    project_id: project_id
  })

  useEffect(() => {
    setFormData({
      title: '',
      description: '',
      priority: "low",
      column_id: '',
      content: content,
    })
  }, [open])

  const handleAddTask = async () => {
    const { error } = await createTask({ ...formData } as Task);
    if (!error) {
      refetch();
      setOpen(false);
      toast({
        title: "Your task has been created.",
        description: "Your task has been successfully created.",
      })
    } else {
      setOpen(false); // Close dialog on success
      toast({
        variant: "destructive",
        title: "Failed to create new task.",
        description: error.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <PlusIcon /> New Task
      </Button>
      <Dialog
        open={open}
        onOpenChange={() => setOpen(false)}
      >
        <DialogContent>
          <VisuallyHidden.Root>
            <DialogHeader>
              <DialogTitle>{'New'}</DialogTitle>
            </DialogHeader>
          </VisuallyHidden.Root>
          <div className="space-y-4">
            <div>
              <Editor content={content} setContent={setContent} />
            </div>
            <div>
              <label className="text-sm font-medium">Status</label>
              {columnsLoading && <p>Loading...</p>}
              <Select
                value={formData.column_id}
                onValueChange={(value: any) => setFormData({ ...formData, column_id: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {columns?.map((column) => (
                    <SelectItem key={column.id} value={column.id}>{column.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={formData.priority}
                onValueChange={(value: any) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorities?.map((priority, i) => (
                    <SelectItem key={i} value={priority}>{priority}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={handleAddTask}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
} 