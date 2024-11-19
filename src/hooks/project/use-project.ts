"use client"
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { Project } from "@/types/project";

// Fetch function
async function fetchProject(project_id: string) {

    let { data: project, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', project_id).single()

    if (error) {
        throw error
    }
    return project
}

// Hook
export function useProject(project_id: string) {
    const [project, setProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    // Fetch data on mount or when project_id changes
    useEffect(() => {
        if (!project_id) return;

        const getKanban = async () => {
            try {
                setIsLoading(true);
                setError(null); // Reset error
                const project = await fetchProject(project_id);
                setProject(project);
            } catch (error: any) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        getKanban();
    }, [project_id]);

    return {
        project,
        isLoading,
        error,
        refetch: () => {
            setIsLoading(true);
            setError(null);
            fetchProject(project_id)
                .then(setProject)
                .catch(setError)
                .finally(() => setIsLoading(false));
        },
    };
}
