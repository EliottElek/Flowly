import { supabase } from "@/lib/supabase/client";
import { useQuery } from "@supabase-cache-helpers/postgrest-swr";
import { Task } from "@/types/kanban";

type UseTasksResult = {
    tasks: Task[] | Partial<Task>[] | null | undefined;
    isLoading: boolean;
    count: number | null,
    error: any;
    refetch: any;
};


export function useTasks(project_id: string): UseTasksResult {

    const { data: tasks, count, mutate, isLoading, error } = useQuery(
        supabase
            .from("tasks")
            .select("*").eq("project_id", project_id),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    return { tasks, count, isLoading, refetch: mutate, error };
}
