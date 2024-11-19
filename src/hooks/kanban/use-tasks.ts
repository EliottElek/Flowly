import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { Task } from "@/types/kanban";

type UseTasksResult = {
    tasks: Task[] | null;
    isLoading: boolean;
    error: string | null;
};

export function useTasks(): UseTasksResult {
    const [tasks, setTasks] = useState<Task[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const { data, error } = await supabase
                    .from("tasks")
                    .select("id, title, description, content, createdAt, column_id, priority, project_id");

                if (error) {
                    throw error;
                }

                setTasks(data || []);
            } catch (err: any) {
                setError(err.message || "An error occurred while fetching tasks.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchTasks();
    }, []);

    return { tasks, isLoading, error };
}
