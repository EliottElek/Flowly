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
interface TaskContextProps {
    task: Partial<Task>;
    content: JSONContent;
    currentPath: string,
    selectedTags: string[],
    setContent: (content: JSONContent) => void;
    refetch: () => void;
    handleClose: () => void,
    handleUpdateTask: () => Promise<void>;
    handleDeleteTask: () => Promise<void>;
    setSelectedTags: Dispatch<SetStateAction<string[]>>
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const { task_id }: { task_id: string } = useParams()
    const router = useRouter()
    const path = usePathname()
    const { confirm } = useConfirm()
    const { task, refetch } = useTask(task_id);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const { updateTask } = useUpdateTask();
    const { deleteTask } = useDeleteTask();
    const { updateTags } = useUpdateTags()
    const currentPath = `/dashboard/task/${task_id}`


    const [content, setContent] = useState<JSONContent>({});

    useEffect(() => {
        if (task) {
            setContent(task.content ?? {});
            setSelectedTags(task.tags?.map((tag) => tag.id) ?? []);
        }
    }, [task]);


    const handleClose = () => {
        if (!task) return
        if (path.split("/").length > 4) router.back()
        router.back()
    }

    const handleUpdateTask = async () => {
        if (!task) return
        await updateTask(task?.id, { content: content });
        await updateTags(task?.id, selectedTags);

        handleClose()
        toast({
            title: "Your task has been created.",
            description: "Your task has been successfully created.",
        })
    };

    const handleDeleteTask = async () => {
        if (!task) return
        if (await confirm({ title: "Are you sure ?", message: "You're about to delete this task. This action is irreversable." })) {
            await deleteTask(task?.id);
            handleClose()
            toast({
                title: "Your task has been deleted.",
                description: "Your task has been successfully deleted.",
            })
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
