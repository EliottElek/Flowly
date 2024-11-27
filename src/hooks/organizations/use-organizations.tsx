import { supabase } from "@/lib/supabase/client";
import { useQuery } from "@supabase-cache-helpers/postgrest-swr";
import { Organization } from "@/types/organization";
import { redirect } from "next/navigation";


type UseOrganizationsResult = {
    organizations: Organization[] | null | undefined;
    isLoading: boolean;
    error: any;
    refetch: any;
};

export function UseOrganizations(): UseOrganizationsResult {

    const { data: organizations, mutate, isLoading, error } = useQuery(
        supabase
            .from('organizations')
            .select('*')
        ,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );
    if (error) return redirect("/404")

    return { organizations, isLoading, refetch: mutate, error };
}
