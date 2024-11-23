import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const KanbanSkeleton = () => {
    return (
        <div className="px-4">
            <div className="flex py-4 items-center justify-end">
                <Skeleton className="h-10 w-[120px]" />
            </div>
            <div className='flex gap-4 h-auto overflow-hidden'>
                <Skeleton className="w-[380px] p-4 h-fit items-center flex-col space-y-3 rounded-md">
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
                <Skeleton className="flex w-[380px] p-4 h-fit items-center flex-col space-y-3 rounded-md">
                    <Skeleton className="h-[215px] p-4 w-full rounded-md">
                        <Skeleton className="h-8 w-full" />
                    </Skeleton>
                    <Skeleton className="h-[125px] p-4 w-full rounded-md">
                        <Skeleton className="h-8 w-full" />
                    </Skeleton>
                </Skeleton>
                <Skeleton className="flex w-[380px] p-4 h-fit items-center flex-col space-y-3 rounded-md">
                    <Skeleton className="h-[145px] p-4 w-full rounded-md">
                        <Skeleton className="h-8 w-full" />
                    </Skeleton>
                </Skeleton>
            </div>
        </div>
    )
}

export default KanbanSkeleton