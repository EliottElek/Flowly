import React from 'react'
import { SidebarRight } from "@/components/task/layout/sidebar-right"


const TaskDialog = ({ children }: { children: React.ReactNode }) => {

    return (
        <>
            <div className="flex flex-1 gap-4 lg:pr-[16rem] p-4">
                {children}
            </div>
            <div className='fixed w-[16rem] top-0 bottom-0 right-0'>
                <SidebarRight />
            </div>
        </>
    )
}

export default TaskDialog