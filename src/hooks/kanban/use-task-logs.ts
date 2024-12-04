import { supabase } from "@/lib/supabase/client";
import { useQuery } from "@supabase-cache-helpers/postgrest-swr";

type UseLogsResult = {
    logs: any[] | null | undefined
    isLoading: boolean;
    count: number | null,
    error: any;
    refetch: any;
};


export function useLogs(task_id: string): UseLogsResult {

    let { data: logs, count, mutate, isLoading, error } = useQuery(
        supabase
            .from("task_logs")
            .select("*, user:users!user_id(id, user_name, avatar_url)").eq("task_id", task_id)
            .limit(25).order("timestamp", { ascending: false }),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );
    console.log(logs)
    return { logs, count, isLoading, refetch: mutate, error };
}
