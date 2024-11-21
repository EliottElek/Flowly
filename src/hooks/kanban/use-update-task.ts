import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Task } from "@/types/kanban";
import { extractTitleAndDescription } from "@/lib/utils";

type UseUpdateTaskResult = {
    isUpdating: boolean;
    updateError: string | null;
    updateTask: (task_id: string, updates: Partial<Task>) => Promise<void>;
};

export function useUpdateTask(): UseUpdateTaskResult {
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateError, setUpdateError] = useState<string | null>(null);

    const updateTask = async (task_id: string, updates: Partial<Task>): Promise<void> => {
        setIsUpdating(true);
        setUpdateError(null);

        try {
            if (updates.content) {
                const { title, description } = extractTitleAndDescription(updates.content)
                updates = { ...updates, title, description }
            }
            const { error } = await supabase
                .from("tasks")
                .update({ ...updates })
                .eq("id", task_id);

            if (error) {
                throw error;
            }
        } catch (err: any) {
            setUpdateError(err.message || "An error occurred while updating the task.");
        } finally {
            setIsUpdating(false);
        }
    };

    return { isUpdating, updateError, updateTask };
}
