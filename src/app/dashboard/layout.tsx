import { AppSidebar } from "@/components/app-sidebar"
import { HeroPattern } from "@/components/hero-pattern";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"
// import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { getProjects } from "@/lib/actions/project";
import { createClient } from "@/lib/supabase/server";
// import Link from "next/link";
import { redirect } from "next/navigation";

import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const projects = await getProjects()
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }
  return (
    <SidebarProvider>
      <AppSidebar projects={projects} user={data.user} />
      <SidebarInset className="w-full overflow-hidden">
        {children}
        <HeroPattern />
      </SidebarInset>
    </SidebarProvider>
  )
}
