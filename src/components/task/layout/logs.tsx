"use client"
import { SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar'
import { useLogs } from '@/hooks/kanban/use-task-logs'
import { supabase } from '@/lib/supabase/client'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { formatDistanceToNow } from 'date-fns'
import { ChevronRight } from 'lucide-react'

const Logs = ({ task_id }: { task_id: string }) => {

    const { logs, isLoading, error, refetch } = useLogs(task_id)

    const handleChanges = () => {
        refetch()
    }
    supabase
        .channel('logs')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'task_logs', filter: `task_id=eq.${task_id}` }, handleChanges)
        .subscribe()

    console.log(error)
    if (isLoading) return <div>Loading...</div>
    return (
        <Collapsible
            defaultOpen={false}
            className="group/collapsible"
        >
            <SidebarGroupLabel
                asChild
                className="group/label w-full text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
                <CollapsibleTrigger>
                    Logs
                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
                <SidebarGroupContent>
                    <SidebarMenu className='px-3'>
                        {Array.isArray(logs) &&
                            logs.map((log: any) => (
                                <SidebarMenuItem key={log.id}>
                                    <div className="overflow-hidden w-full">
                                        <div className="w-full flex justify-between gap-x-4">
                                            <span className="flex w-full justify-between py-0.5 text-xs truncate text-ellipsis whitespace-nowrap">
                                                <span className="font-semibold">{log.user?.user_name ?? "User"}</span> - <span className='opacity-60'>{log.action}</span>-
                                                <span className='opacity-60'>{formatDistanceToNow(log?.timestamp)}{" "}</span>
                                            </span>
                                        </div>
                                    </div>
                                </SidebarMenuItem>
                            ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </CollapsibleContent>
        </Collapsible>
    )
}
export default Logs