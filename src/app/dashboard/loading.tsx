import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const loading = () => {
    return (
        <div className='container mx-auto'>
            {/* <div className="grid gap-3 grid-cols-3">
                <Skeleton className="h-[110px] w-full border rounded p-6 flex flex-col gap-1">
                    <Skeleton className="h-[24px] w-[60%] my-2" />
                    <Skeleton className="h-4 w-[80%]" />
                    <Skeleton className="h-4 w-[30%]" />
                </Skeleton>
                <Skeleton className="h-[110px] w-full border rounded p-6 flex flex-col gap-1">
                    <Skeleton className="h-[24px] w-[60%] my-2" />
                    <Skeleton className="h-4 w-[80%]" />
                    <Skeleton className="h-4 w-[30%]" />
                </Skeleton>
            </div> */}

            <div className='flex items-center grow justify-center h-[90vh]'>Loading page, one sec...</div>
        </div>
    )
}

export default loading