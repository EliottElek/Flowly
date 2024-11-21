"use client"

import { cn, priorities } from "@/lib/utils";

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Task } from "@/types/kanban";
import { useUpdateTask } from "@/hooks/kanban/use-update-task";
import { toast } from "@/hooks/use-toast";

export default function PriorityBadge({ priority, className }: { priority: string | undefined, className?: string | undefined }) {

    function renderBadge() {
        switch (priority) {
            case 'low':
                return <span className={cn("inline-flex items-center rounded-full bg-green-400/20 px-2 py-.5 text-xs font-medium text-green-600", className)}>
                    {priority}
                </span>;
            case 'medium':
                return <span className={cn("inline-flex items-center rounded-full bg-orange-400/20 px-2 py-.5 text-xs font-medium text-orange-400", className)}>
                    {priority}
                </span>
            case 'high':
                return <span className={cn("inline-flex items-center rounded-full bg-red-400/20 px-2 py-.5 text-xs font-medium text-red-700", className)}>
                    {priority}
                </span>
            default:
                return <span className={cn("inline-flex items-center rounded-full bg-gray-400/20 px-2 py-.5 text-xs font-medium text-gray-600", className)}>
                    {priority}
                </span>;
        }
    }
    return (
        renderBadge()
    )
}


export const PriorityBadgeSelect = ({ task, className, refetch }: { task: Task, className?: string | undefined, refetch: () => void }) => {
    const [selectedPriority, setSelectedPriority] = React.useState(task.priority)
    const { updateTask } = useUpdateTask();

    const handleUpdateStatus = async (value: string) => {
        if (!task) return
        await updateTask(task?.id, { priority: value });
        toast({
            title: "Status updated.",
            description: "Your task status been successfully updated.",
        })
        setSelectedPriority(value)
        refetch()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button><PriorityBadge className={className} priority={task.priority} /></button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Priority</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={selectedPriority} onValueChange={handleUpdateStatus}>
                    {priorities.map((priority) =>
                    (
                        <DropdownMenuRadioItem key={priority} value={priority}>{priority}</DropdownMenuRadioItem>)
                    )}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}