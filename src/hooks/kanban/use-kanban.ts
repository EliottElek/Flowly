import { supabase } from "@/lib/supabase/client";
import { useQuery } from "@supabase-cache-helpers/postgrest-swr";

export function useKanban(project_id: string) {

    const { data: columns, count, mutate, isLoading, error } = useQuery(
        supabase
            .from("columns")
            .select("id, name, description, project_id, tasks(id, title, description, column_id, priority)")
            .eq("project_id", project_id),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    return { columns, count, isLoading, refetch: mutate, error };
}
