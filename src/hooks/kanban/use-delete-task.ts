import { useState, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";

type UseCreateTaskResult = {
    deleteTask: (task_id: string) => Promise<{ error: any; }>;
    isLoading: boolean;
    error: string | null;
};

export function useDeleteTask(): UseCreateTaskResult {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteTask = useCallback(async (task_id: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const { error } = await supabase
                .from("tasks")
                .delete().eq("id", task_id);
            if (error) {
                throw error;
            }
            return { error: null };
        } catch (err: any) {
            setError(err.message || "An error occurred while creating the task.");
            return { error: err };
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { deleteTask, isLoading, error };
}
