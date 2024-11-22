"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTask } from "@/hooks/kanban/use-task";
import { useUpdateTask } from "@/hooks/kanban/use-update-task";
import { useDeleteTask } from "@/hooks/kanban/use-delete-task";
import { JSONContent } from "@tiptap/react";
import { toast } from "@/hooks/use-toast";
import { useConfirm } from "../use-confirm-dialog";

interface TaskContextProps {
    task: any;
    content: JSONContent;
    currentPath: string,
    setContent: (content: JSONContent) => void;
    refetch: () => void;
    handleClose: () => void,
    handleUpdateTask: () => Promise<void>;
    handleDeleteTask: () => Promise<void>;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const { task_id }: { task_id: string } = useParams()
    const router = useRouter()
    const { confirm } = useConfirm()
    const { task, refetch } = useTask(task_id);
    const { updateTask } = useUpdateTask();
    const { deleteTask } = useDeleteTask();
    const currentPath = `/dashboard/task/${task_id}`


    const [content, setContent] = useState<JSONContent>({});

    useEffect(() => {
        if (task) {
            setContent(task.content);
        }
    }, [task]);


    const handleClose = () => {
        if (!task) return
        router.push(`/dashboard/project/${task?.project_id}`)
    }

    const handleUpdateTask = async () => {
        if (!task) return
        await updateTask(task?.id, { content: content });
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
                handleDeleteTask
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
