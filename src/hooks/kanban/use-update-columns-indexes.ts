import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

type UseUpdateColumnResult = {
    isUpdating: boolean;
    updateError: string | null;
    updateColumnsIndexes: (columns: { id: string; index: number }[]) => Promise<void>;
};

export function useUpdateColumnIndexes(): UseUpdateColumnResult {
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateError, setUpdateError] = useState<string | null>(null);

    const updateColumnsIndexes = async (columns: { id: string; index: number }[]): Promise<void> => {
        setIsUpdating(true);
        setUpdateError(null);
        try {
            const { data, error } = await supabase
                .from("columns")
                .upsert(columns, { onConflict: "id" });
            console.log(data)
            if (error) {
                throw error;
            }
        } catch (err: any) {
            setUpdateError(err.message || "An error occurred while updating the colum.");
        } finally {
            setIsUpdating(false);
        }
    };

    return { isUpdating, updateError, updateColumnsIndexes };
}
