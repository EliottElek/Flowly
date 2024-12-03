import { useState, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";

type UseDeleteProjectResult = {
    deleteProject: (project_id: string) => Promise<{ error: any; }>;
    isLoading: boolean;
    error: string | null;
};

export function useDeleteProject(): UseDeleteProjectResult {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteProject = useCallback(async (project_id: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const { error } = await supabase
                .from("projects")
                .delete().eq("id", project_id);
            if (error) {
                throw error;
            }
            return { error: null };
        } catch (err: any) {
            setError(err.message || "An error occurred while deleting the project.");
            return { error: err };
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { deleteProject, isLoading, error };
}
