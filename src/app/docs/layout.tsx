import { AppSidebar } from "@/components/docs/app-sidebar"
import { SidebarRight } from "@/components/docs/right-sidebar"
import { HeroPattern } from "@/components/hero-pattern"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import Link from "next/link"

export default function Page({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar className="bg-muted/50" />
            <SidebarInset>
                <header className="flex h-16 sticky top-0 shrink-0 items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <Link href="/dashboard">
                                    Dashboard
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem className="hidden md:block">
                                <Link href="/docs">
                                    Docs
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Getting started</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <div>
                    <HeroPattern />
                    {children}
                </div>
            </SidebarInset>
            <SidebarRight />
        </SidebarProvider>
    )
}
