import { supabase } from "@/lib/supabase/client";
import { useQuery } from "@supabase-cache-helpers/postgrest-swr";
import { Project } from "@/types/project";
import { redirect } from "next/navigation";


type UseProjectResult = {
    project: Project;
    isLoading: boolean;
    error: any;
    refetch: any;
};

export function useProject(project_id: string): UseProjectResult {

    const { data: project, mutate, isLoading, error } = useQuery(
        supabase
            .from('projects')
            .select('*')
            .eq('id', project_id).single(),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );
    if (error) return redirect("/404")

    return { project, isLoading, refetch: mutate, error };
}
