import { useState, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";
import { Task } from "@/types/kanban";
import { extractTitleAndDescription } from "@/lib/utils";

type UseCreateTaskResult = {
    createTask: (task: Task) => Promise<{ data: { id: string } | null; error: Error | null }>;
    isLoading: boolean;
    error: string | null;
};

export function useCreateTask(): UseCreateTaskResult {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createTask = useCallback(async (task: Task) => {
        setIsLoading(true);
        setError(null);

        try {
            const { title, description } = extractTitleAndDescription(task.content)
            const { data, error } = await supabase
                .from("tasks")
                .insert([{ ...task, title, description }]).select("id").single();

            if (error) {
                throw error;
            }

            return { data, error: null };
        } catch (err: any) {
            setError(err.message || "An error occurred while creating the task.");
            return { data: null, error: err };
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { createTask, isLoading, error };
}
