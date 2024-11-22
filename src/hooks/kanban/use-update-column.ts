import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Column } from "@/types/kanban";

type UseUpdateColumnResult = {
    isUpdating: boolean;
    updateError: string | null;
    updateColumn: (column_id: string, updates: Partial<Column>) => Promise<void>;
};

export function useUpdateColumn(): UseUpdateColumnResult {
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateError, setUpdateError] = useState<string | null>(null);

    const updateColumn = async (column_id: string, updates: Partial<Column>): Promise<void> => {
        setIsUpdating(true);
        setUpdateError(null);
        try {
            const { error } = await supabase
                .from("columns")
                .update({ ...updates })
                .eq("id", column_id);

            if (error) {
                throw error;
            }
        } catch (err: any) {
            setUpdateError(err.message || "An error occurred while updating the colum.");
        } finally {
            setIsUpdating(false);
        }
    };

    return { isUpdating, updateError, updateColumn };
}
