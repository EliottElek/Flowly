import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const loading = () => {
    return (
        <div className='p-4 flex flex-col gap-3'>
            <Skeleton className="h-8 w-[70%] rounded-md" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full mt-4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />

        </div>
    )
}

export default loading