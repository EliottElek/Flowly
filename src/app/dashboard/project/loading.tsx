import KanbanSkeleton from "@/components/kanban/kanban-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

const DialogDemo = () => (
    <div>
        <header className="flex sticky top-0 h-16 shrink-0 items-center justify-end gap-2 border-b border-foreground/5 px-4">
            <div className="flex justify-end items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-20 rounded-md" />
                <Skeleton className="h-5 w-6 rounded-md" />
            </div>
        </header>
        <div className="pt-2"><KanbanSkeleton /></div>
    </div>
)
export default DialogDemo;
