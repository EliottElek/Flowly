import { Button } from "@/components/ui/button"
import { Task } from "@/types/kanban"
import { useCreateTask } from "@/hooks/kanban/use-create-task"
import { PlusIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import defaultContent from '@/components/editor/default-content.json'
import { useRouter } from "next/navigation";
import { ContextMenuItem } from "@/components/ui/context-menu"

export function NewTask({ refetch, project_id, column_id, inContextMenu, inTableView }: { refetch: () => void, project_id: string, column_id: string, inContextMenu?: boolean, inTableView?: boolean }) {
  const { toast } = useToast()
  const { createTask } = useCreateTask();
  const router = useRouter()

  const formData = {
    title: '',
    description: '',
    column_id: column_id,
    priority: "low",
    content: defaultContent,
    project_id: project_id
  }

  const handleAddTask = async () => {
    if (formData.column_id === "") return
    const { error, data } = await createTask({ ...formData, content: defaultContent } as Task);
    if (!error) {
      refetch();
      toast({
        title: "Your task has been created.",
        description: "Your task has been successfully created.",
      })
    } else {
      toast({
        variant: "destructive",
        title: "Failed to create new task.",
        description: error.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
    if (data?.id)
      router.push(`/dashboard/task/${data.id}`)
  };

  if (inContextMenu)
    return (
      <ContextMenuItem inset onClick={handleAddTask}>
        New Task
      </ContextMenuItem>
    )
  if (inTableView)
    return (
      <Button
        size="sm" className="h-8 border-dash" variant={"secondary"} onClick={handleAddTask}>
        <PlusIcon /> New task
      </Button>
    )
  return (
    <Button className="h-7 w-7" size={"icon"} variant={"ghost"} onClick={handleAddTask}>
      <PlusIcon />
    </Button>
  )
} 