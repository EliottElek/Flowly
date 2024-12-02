import { Button } from "@/components/ui/button"
import { Task } from "@/types/kanban"
import { useState } from "react"
import { useCreateTask } from "@/hooks/kanban/use-create-task"
import { useColumns } from "@/hooks/kanban/use-columns"
import { PlusIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import defaultContent from '@/components/editor/default-content.json'
import { useRouter } from "next/navigation";

export function NewTask({ refetch, project_id, column_id }: { refetch: () => void, project_id: string, column_id: string }) {
  const { toast } = useToast()
  const { columns } = useColumns(project_id);
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

  return (
    <Button disabled={columns?.length === 0} className="font-bold w-full rounded-lg" variant={"ghost"} onClick={handleAddTask}>
      <PlusIcon /> New Task
    </Button>
  )
} 