import { supabase } from "@/lib/supabase/client";
import { useQuery } from "@supabase-cache-helpers/postgrest-swr";

export function useKanban(project_id: string) {

    const { data: columns, count, mutate, isLoading, error } = useQuery(
        supabase
            .from("columns")
            .select("id, name, description, project_id, index, created_at, tasks(id, title, description, column_id, priority, created_at, tags:task_tags(tags(id, name, color)), user:users!user_id(id, user_name, email, avatar_url), comments(id))")
            .eq("project_id", project_id)
            .order("index", { ascending: true }),

        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    console.log(error, columns)

    return { columns, count, isLoading, refetch: mutate, error };
}
