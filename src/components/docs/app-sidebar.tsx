import * as React from "react"
import { GalleryVerticalEnd, Minus, Plus } from "lucide-react"

import { SearchForm } from "./search-form"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { ThemeToggle } from "../theme-toggle"

// This is sample data.
const data = {
    navMain: [
        {
            title: "Getting Started",
            url: "/docs",
            items: [
                {
                    title: "Overview",
                    url: "/docs",
                },
                {
                    title: "Installation",
                    url: "/docs/installation",
                },
                {
                    title: "Self host supabase",
                    url: "/docs/supabase-setup",
                },
                {
                    title: "Authentication",
                    url: "/docs/authentication",
                },
            ],
        },
        {
            title: "PostgreSQL migrations",
            url: "/docs",
            items: [
                {
                    title: "Why migrate",
                    url: "/docs/migrations",
                },
                {
                    title: "Make migrations",
                    url: "/docs/migrations",
                },
                {
                    title: "Backups",
                    url: "/docs/migrations",
                },
                {
                    title: "Row Level Security (RLS)",
                    url: "/docs/migrations",
                },
            ],
        }
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <GalleryVerticalEnd className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">Documentation</span>
                                    <span className="">v1.0.0</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SearchForm />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {data.navMain.map((item, index) => (
                            <Collapsible
                                key={item.title}
                                defaultOpen={index === 1}
                                className="group/collapsible"
                            >
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton>
                                            {item.title}{" "}
                                            <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                                            <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    {item.items?.length ? (
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.items.map((item) => (
                                                    <SidebarMenuSubItem key={item.title}>
                                                        <SidebarMenuSubButton
                                                            asChild
                                                        >
                                                            <Link href={item.url}>{item.title}</Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    ) : null}
                                </SidebarMenuItem>
                            </Collapsible>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
            <SidebarFooter>
                <ThemeToggle /> 
                <span className="text-xs opacity-70 text-center">ReconOps 2024 All rights reserved.</span>
            </SidebarFooter>
        </Sidebar>
    )
}
