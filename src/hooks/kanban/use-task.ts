import { supabase } from "@/lib/supabase/client";
import { useQuery } from "@supabase-cache-helpers/postgrest-swr";
import { Task } from "@/types/kanban";
import { redirect } from "next/navigation";


type UseTasksResult = {
    task: Task;
    isLoading: boolean;
    count: number | null,
    error: any;
    refetch: any;
};


export function useTask(task_id: string): UseTasksResult {

    const { data: task, count, mutate, isLoading, error } = useQuery(
        supabase
            .from("tasks")
            .select("*, comments(id)").eq("id", task_id).single(),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );
    if (error) return redirect("/404")

    return { task, count, isLoading, refetch: mutate, error };
}
