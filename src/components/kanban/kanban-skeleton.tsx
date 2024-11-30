import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const KanbanSkeleton = () => {
    return (
        <div className="px-4 mt-3">
            <div className='flex gap-4 h-auto overflow-hidden'>
                <Skeleton className="w-[350px] p-4 h-fit items-center flex-col space-y-3 rounded-md">
                    <Skeleton className="h-[105px] p-4 w-full rounded-md">
                        <Skeleton className="h-8 w-full" />
                    </Skeleton>
                    <Skeleton className="h-[225px] p-4 w-full rounded-md">
                        <Skeleton className="h-8 w-full" />
                    </Skeleton>
                    <Skeleton className="h-[125px] p-4 w-full rounded-md">
                        <Skeleton className="h-8 w-full" />
                    </Skeleton>
                </Skeleton>
                <Skeleton className="flex w-[350px] p-4 h-fit items-center flex-col space-y-3 rounded-md">
                    <Skeleton className="h-[215px] p-4 w-full rounded-md">
                        <Skeleton className="h-8 w-full" />
                    </Skeleton>
                    <Skeleton className="h-[125px] p-4 w-full rounded-md">
                        <Skeleton className="h-8 w-full" />
                    </Skeleton>
                </Skeleton>
                <Skeleton className="flex w-[350px] p-4 h-fit items-center flex-col space-y-3 rounded-md">
                    <Skeleton className="h-[145px] p-4 w-full rounded-md">
                        <Skeleton className="h-8 w-full" />
                    </Skeleton>
                </Skeleton>
            </div>
        </div>
    )
}

export default KanbanSkeleton