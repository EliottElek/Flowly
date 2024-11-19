"use client"
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { Task, Column } from "@/types/kanban";

// Fetch function
async function fetchKanban(project_id: string): Promise<Column[]> {
    const { data: columns, error } = await supabase
        .from("columns")
        .select("id, name, description, tasks(id, title, description, column_id, priority, project_id, content)")
        .eq("project_id", project_id);

    if (error) {
        throw new Error(error.message);
    }

    return columns as Column[];
}

// Hook
export function useKanban(project_id: string) {
    const [columns, setColumns] = useState<Column[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    // Fetch data on mount or when project_id changes
    useEffect(() => {
        if (!project_id) return;

        const getKanban = async () => {
            try {
                setIsLoading(true);
                setError(null); // Reset error
                const fetchedColumns = await fetchKanban(project_id);
                setColumns(fetchedColumns);
            } catch (error: any) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        getKanban();
    }, [project_id]);

    return {
        columns,
        isLoading,
        error,
        refetch: () => {
            setIsLoading(true);
            setError(null);
            fetchKanban(project_id)
                .then(setColumns)
                .catch(setError)
                .finally(() => setIsLoading(false));
        },
    };
}
