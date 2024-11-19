import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
export default async function Home() {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }
    else redirect('/dashboard')
}
