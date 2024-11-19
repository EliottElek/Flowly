import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

type Column = {
    id: string;
    name: string;
    [key: string]: any; // Add other properties if needed
};

type UseColumnsResult = {
    columns: Column[] | null;
    isLoading: boolean;
    error: string | null;
};

export function useColumns(project_id: string): UseColumnsResult {
    const [columns, setColumns] = useState<Column[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchColumns = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const { data, error } = await supabase
                    .from("columns")
                    .select("*").eq("project_id", project_id);

                if (error) {
                    throw error;
                }

                setColumns(data || []);
            } catch (err: any) {
                setError(err.message || "An error occurred while fetching columns.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchColumns();
    }, []);

    return { columns, isLoading, error };
}
