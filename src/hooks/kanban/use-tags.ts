import { supabase } from "@/lib/supabase/client";
import { useQuery } from "@supabase-cache-helpers/postgrest-swr";
import { Tag } from "@/types/kanban";

export type TagForSelect = {
    label: string,
    value: string
}
type UseTagsResult = {
    tags: Tag[] | Partial<Tag>[] | TagForSelect[] | Partial<TagForSelect>[] | null | undefined;
    isLoading: boolean;
    count: number | null,
    error: any;
    refetch: any;
};


export function useTags(forSelect: boolean): UseTagsResult {

    let { data: tags, count, mutate, isLoading, error } = useQuery(
        supabase
            .from("tags")
            .select("*"),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );
    if (forSelect)
        tags = tags?.map((tag) => ({ label: tag.name, value: tag.id })) ?? []
    return { tags, count, isLoading, refetch: mutate, error };
}
