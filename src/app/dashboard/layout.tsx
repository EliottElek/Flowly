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
      <SidebarInset className="w-full">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            {/* <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <Link href="/dashboard">Dashboard</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>My first project</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}
          </div>
        </header>
        <div className="flex grow flex-col grow-1 w-full h-full overflow-hidden">
          {children}
          <HeroPattern />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
