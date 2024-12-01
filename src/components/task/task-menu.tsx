"use client"
import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { useDeleteTask } from "@/hooks/kanban/use-delete-task"
import { toast } from "@/hooks/use-toast"
import { Task } from "@/types/kanban"
import { useConfirm } from "../use-confirm-dialog"
import { useColumns } from "@/hooks/kanban/use-columns"
import { useUpdateTask } from "@/hooks/kanban/use-update-task"

export default function TaskContextMenu({ children, task, refetch }: { children: React.ReactNode, task: Partial<Task>, refetch: () => void }) {
    const { columns, isLoading } = useColumns(task.project_id as string);
    const { updateTask } = useUpdateTask();

    const { confirm } = useConfirm()
    const { deleteTask } = useDeleteTask()

    const handleMoveTask = async (e: any, destinationId: string) => {
        e.stopPropagation()
        if (!task) return
        try {
            await updateTask(task.id as string, { column_id: destinationId });
        } catch (error) {
            refetch();
        }
    }

    const handleDeleteTask = async (e: { stopPropagation: () => void }) => {
        e.stopPropagation()
        if (await confirm({ title: "Are you sure ?", message: "You're about to delete this task. This action is irreversable." })) {
            await deleteTask(task.id as string);
            toast({
                title: "Your task has been deleted.",
                description: "Your task has been successfully deleted.",
            })
            refetch()
        }
    };
    return (
        <ContextMenu>
            <ContextMenuTrigger>
                {children}
            </ContextMenuTrigger>
            <ContextMenuContent className="w-64">
                <ContextMenuItem inset onClick={(e) => e.stopPropagation()}>
                    Back
                    <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem inset disabled onClick={(e) => e.stopPropagation()}>
                    Forward
                    <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem inset onClick={(e) => e.stopPropagation()}>
                    Reload
                    <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuSub>
                    <ContextMenuSubTrigger disabled={isLoading} inset onClick={(e) => e.stopPropagation()}>Move</ContextMenuSubTrigger>
                    <ContextMenuSubContent className="w-48">
                        {columns?.map((col) => (
                            <ContextMenuItem disabled={col.id === task.column_id} onClick={(e) => handleMoveTask(e, col.id)} key={col.id}>{col.name}...</ContextMenuItem>

                        ))}

                    </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuSeparator />
                <ContextMenuCheckboxItem checked>
                    Show Bookmarks Bar
                    <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
                </ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
                <ContextMenuSeparator />
                <ContextMenuItem className="text-destructive" inset onClick={handleDeleteTask}>
                    Delete
                    <ContextMenuShortcut className="text-destructive">⌘D</ContextMenuShortcut>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}
