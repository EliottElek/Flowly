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
import { useDeleteColumn } from "@/hooks/kanban/use-delete-column"
import { toast } from "@/hooks/use-toast"
import { Column } from "@/types/kanban"
import { useConfirm } from "../use-confirm-dialog"

export default function ColumnContextMenu({ children, column, refetch }: { children: React.ReactNode, column: Partial<Column>, refetch: () => void }) {

    const { confirm } = useConfirm()
    const { deleteColumn } = useDeleteColumn()

    const handleDeleteColumn = async (e: { stopPropagation: () => void }, tasks_only: boolean) => {
        e.stopPropagation()

        const message = tasks_only ? `You are about to delete all ${column?.tasks?.length ?? "some"} tasks from this column.` : `You are about to delete this column and all it's ${column?.tasks?.length ?? "many"} tasks it contains.`
        if (await confirm({ title: "Are you sure ?", message: message })) {
            await deleteColumn(column.id as string, tasks_only);
            toast({
                title: tasks_only ? "Your tasks have been deleted." : 'Your column has been deleted.',
                description: tasks_only ? "Your tasks have been successfully deleted." : 'Your column has been successfully deleted.',
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
                <ContextMenuItem className="text-destructive" inset onClick={(e) => handleDeleteColumn(e, true)}>
                    Empty column
                </ContextMenuItem>
                <ContextMenuItem className="text-destructive" inset onClick={(e) => handleDeleteColumn(e, false)}>
                    Delete
                    <ContextMenuShortcut className="text-destructive">⌘D</ContextMenuShortcut>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}
