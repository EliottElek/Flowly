import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { Task } from "@/types/kanban";

type UseTaskResult = {
    task: Task | null;
    isLoading: boolean;
    error: string | null;
};

export function useTask(task_id: string | null): UseTaskResult {
    const [task, setTask] = useState<Task | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTask = async () => {
            if (!task_id) {
                setTask(null)
                return;
            }
            setIsLoading(true);
            setError(null);
            try {
                const { data, error } = await supabase
                    .from("tasks")
                    .select("*").eq("id", task_id).single();

                if (error) {
                    throw error;
                }
                setTask(data || null);
            } catch (err: any) {
                setError(err.message || "An error occurred while fetching tasks.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchTask();
    }, [task_id]);

    return { task, isLoading, error };
}
