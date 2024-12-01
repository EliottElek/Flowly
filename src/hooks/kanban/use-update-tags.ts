import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Tag, Task } from "@/types/kanban";
import { extractTitleAndDescription } from "@/lib/utils";

type UseUpdateTagsResult = {
    isUpdating: boolean;
    updateError: string | null;
    updateTags: (task_id: string, tags: string[]) => Promise<void>;
};

export function useUpdateTags(): UseUpdateTagsResult {
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateError, setUpdateError] = useState<string | null>(null);

    const updateTags = async (task_id: string, tags: string[]): Promise<void> => {
        setIsUpdating(true);
        setUpdateError(null);

        try {
            const { error: deleteError } = await supabase
                .from("task_tags")
                .delete()
                .eq("task_id", task_id);

            if (deleteError) {
                throw deleteError;
            }

            const taskTagEntries = tags.map((tag_id) => ({ task_id, tag_id }));

            const { error: insertError } = await supabase
                .from("task_tags")
                .insert(taskTagEntries);

            if (insertError) {
                throw insertError;
            }
        } catch (err: any) {
            setUpdateError(err.message || "An error occurred while updating the task.");
        } finally {
            setIsUpdating(false);
        }
    };

    return { isUpdating, updateError, updateTags };
}
