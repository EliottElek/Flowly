"use client";

import React, { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTask } from "@/hooks/kanban/use-task";
import { useUpdateTask } from "@/hooks/kanban/use-update-task";
import { useDeleteTask } from "@/hooks/kanban/use-delete-task";
import { useUpdateTags } from "@/hooks/kanban/use-update-tags";
import { JSONContent } from "@tiptap/react";
import { toast } from "@/hooks/use-toast";
import { useConfirm } from "../use-confirm-dialog";
import { usePathname } from "next/navigation";
import { Task } from "@/types/kanban";
// @ts-ignore
import debounce from "lodash.debounce";
import { CircleDashedIcon, SaveIcon, SaveOffIcon } from "lucide-react";
import { SelectSingleEventHandler } from "react-day-picker";
import { parseISO, isEqual } from 'date-fns';
import { supabase } from "@/lib/supabase/client";


const savingStatuses = [
    { status: "saved", className: "bg-emerald-500/10 border border-emerald-500/30 text-emerald-500", icon: <SaveIcon className="h-3.5 w-3.5" /> },
    { status: "unsaved", className: "bg-red-500/10 border border-red-500/30 text-red-500", icon: <SaveOffIcon className="h-3.5 w-3.5" /> },
    { status: "saving", className: "bg-orange-500/10 border border-orange-500/30 text-orange-500", icon: <CircleDashedIcon className="h-3.5 w-3.5 animate-spin" /> }
]
interface TaskContextProps {
    task: Partial<Task>;
    content: JSONContent;
    currentPath: string;
    selectedTags: string[];
    setContent: (content: JSONContent) => void;
    refetch: () => void;
    handleClose: () => void;
    handleUpdateTask: () => Promise<void>;
    handleDeleteTask: () => Promise<void>;
    setSelectedTags: Dispatch<SetStateAction<string[]>>;
    dueOn: Date | undefined,
    setDueOn: SelectSingleEventHandler
    savingStatus: {
        status: "unsaved" | "saving" | "saved" | string;
        className: string;
        icon: React.ReactNode
    };
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const { task_id }: { task_id: string } = useParams();
    const router = useRouter();
    const { confirm } = useConfirm();
    const { task, refetch } = useTask(task_id);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [dueOn, setDueOn] = React.useState<Date | undefined>(undefined)
    const { updateTask } = useUpdateTask();
    const { deleteTask } = useDeleteTask();
    const { updateTags } = useUpdateTags();
    const currentPath = `/dashboard/task/${task_id}`;

    const [content, setContent] = useState<JSONContent>({});
    const [savingStatus, setSavingStatus] = useState(savingStatuses[0]);

    const handleChanges = () => {
        setSavingStatus(savingStatuses[2]);
        refetch()
        setSavingStatus(savingStatuses[0]);
    }
    // Listen to task changes
    supabase
        .channel('task')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks', filter: `id=eq.${task_id}` }, handleChanges)
        .subscribe()

    useEffect(() => {
        if (task) {
            setContent(task.content ?? {});
            // @ts-ignore
            setSelectedTags(task.tags?.map(({ tags: tag }) => tag.id) ?? []);
            task.due_on && setDueOn(new Date(task.due_on) as Date)
        }
    }, [task]);

    const handleClose = () => {
        if (!task) return;
        // router.back();
        router.push(`/dashboard/project/${task.project_id}`)
    };

    const saveTask = async () => {
        if (!task) return;
        setSavingStatus(savingStatuses[2]);
        try {
            await updateTask(task.id, { content, due_on: dueOn });
            await updateTags(task.id, selectedTags);
            setSavingStatus(savingStatuses[0])

        } catch {
            setSavingStatus(savingStatuses[1]);
        }
    };

    const debouncedSaveTask = debounce(saveTask, 1000);

    useEffect(() => {
        const hasContentChanged = JSON.stringify(content) !== JSON.stringify(task?.content);
        // @ts-ignore
        const haveTagsChanged = JSON.stringify(selectedTags) !== JSON.stringify(task?.tags?.map(({ tags: tag }) => tag.id));
        const haveDueNotChanged = isEqual(parseISO(dueOn?.toDateString() ?? ""), parseISO(task?.due_on as string ?? ""));

        if (!hasContentChanged && !haveTagsChanged && !haveDueNotChanged) {
            setSavingStatus(savingStatuses[0]);
        } else {
            setSavingStatus(savingStatuses[1]);
            debouncedSaveTask();
        }

        return debouncedSaveTask.cancel; // Cleanup on unmount
    }, [content, selectedTags, dueOn, task?.content, task?.tags, task?.due_on]);

    const handleUpdateTask = async () => {
        debouncedSaveTask();
        toast({
            title: "Your task has been updated.",
            description: "Your task has been successfully updated.",
        });
    };

    const handleDeleteTask = async () => {
        if (!task) return;
        if (await confirm({ title: "Are you sure?", message: "You're about to delete this task. This action is irreversible." })) {
            await deleteTask(task.id);
            handleClose();
            toast({
                title: "Your task has been deleted.",
                description: "Your task has been successfully deleted.",
            });
        }
    };

    return (
        <TaskContext.Provider
            value={{
                task,
                content,
                setContent,
                refetch,
                currentPath,
                handleClose,
                handleUpdateTask,
                handleDeleteTask,
                selectedTags,
                setSelectedTags,
                savingStatus,
                dueOn,
                setDueOn
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTaskContext must be used within a TaskProvider");
    }
    return context;
};
