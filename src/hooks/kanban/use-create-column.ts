import { useState, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";
import { Column, Task } from "@/types/kanban";

type UseCreateColumnResult = {
    createColumn: (column: Column) => Promise<{ data: Column | null; error: Error | null }>;
    isLoading: boolean;
    error: string | null;
};

export function useCreateColumn(): UseCreateColumnResult {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createColumn = useCallback(async (column: Column) => {
        setIsLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase
                .from("columns")
                .insert([column]);

            if (error) {
                throw error;
            }

            return { data, error: null };
        } catch (err: any) {
            setError(err.message || "An error occurred while creating the column.");
            return { data: null, error: err };
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { createColumn, isLoading, error };
}
