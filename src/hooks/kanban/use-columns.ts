import { supabase } from "@/lib/supabase/client";
import { useQuery } from "@supabase-cache-helpers/postgrest-swr";
import { Column } from "@/types/kanban";


type UseColumnsResult = {
    columns: Column[] | null | undefined;
    isLoading: boolean;
    count: number | null,
    error: any;
    refetch: any;
};


export function useColumns(project_id: string): UseColumnsResult {

    const { data: columns, count, mutate, isLoading, error } = useQuery(
        supabase
            .from("columns")
            .select("*").eq("project_id", project_id),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    return { columns, count, isLoading, refetch: mutate, error };
}
