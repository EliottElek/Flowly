import { useState, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";

type UseDeleteColumnResult = {
    deleteColumn: (column_id: string, tasks_only?: boolean) => Promise<{ error: any; }>;
    isLoading: boolean;
    error: string | null;
};

export function useDeleteColumn(): UseDeleteColumnResult {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteColumn = useCallback(async (column_id: string, tasks_only?: boolean) => {
        setIsLoading(true);
        setError(null);
        try {
            const { error: deleteTasksError } = await supabase
                .from("tasks")
                .delete().eq("column_id", column_id);
            if (!tasks_only) {
                const { error } = await supabase
                    .from("columns")
                    .delete().eq("id", column_id)
                if (error) {
                    throw error;
                }
            }
            if (deleteTasksError) {
                throw deleteTasksError;
            }
            return { error: null };
        } catch (err: any) {
            setError(err.message || "An error occurred while deleting the column.");
            return { error: err };
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { deleteColumn, isLoading, error };
}
