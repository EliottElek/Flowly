import { supabase } from "@/lib/supabase/client";
import { Comment, NestedComment } from "@/types/kanban";
import { useQuery } from "@supabase-cache-helpers/postgrest-swr";

type UseCommentsResult = {
    comments: NestedComment[] | null;
    isLoading: boolean;
    count: number | null,
    error: any;
    refetch: any;
};

function nestComments(comments: Comment[]): NestedComment[] {
    const commentMap: Record<string, NestedComment> = {};
    const result: NestedComment[] = [];

    // Initialize commentMap with comments
    comments.forEach(comment => {
        commentMap[comment.id] = {
            ...comment,
            children: [],
        };
    });

    // Build nested structure
    comments.forEach(comment => {
        if (comment.parent_id) {
            commentMap[comment.parent_id]?.children.push(commentMap[comment.id]);
        } else {
            result.push(commentMap[comment.id]);
        }
    });

    return result;
}

export function useComments(task_id: string): UseCommentsResult {

    const { data: comments, count, mutate, isLoading, error } = useQuery(
        supabase
            .from("comments")
            .select(`
                    id,
                    content,
                    task_id,
                    project_id,
                    parent_id,
                    user_id,
                    created_at,
                    user:users!user_id(id, username, email, avatar_url)
                `)
            .eq("task_id", task_id),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );
    //@ts-ignore
    const nested = comments ? nestComments(comments) : [];

    return { comments: nested, count, refetch: mutate, isLoading, error };
}


