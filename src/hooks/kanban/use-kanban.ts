import { supabase } from "@/lib/supabase/client";
import { useQuery } from "@supabase-cache-helpers/postgrest-swr";

export function useKanban(project_id: string) {

    const { data: columns, count, mutate, isLoading, error } = useQuery(
        supabase
            .from("columns")
            .select("id, name, description, project_id, index, tasks(id, title, description, column_id, priority, user_id, comments(id))")
            .eq("project_id", project_id)
            .order("index", { ascending: true }),

        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );
    console.log(columns)

    return { columns, count, isLoading, refetch: mutate, error };
}
