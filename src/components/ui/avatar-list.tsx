import { User } from '@/types/user'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
// import {
//     Tooltip,
//     TooltipContent,
//     TooltipTrigger,
// } from "@/components/ui/tooltip"
const AvatarList = ({ users }: { users: User[] }) => {
    return (
        <div className='flex items-center'>
            <ul className='flex items-center mr-2'>
                {users.map((user: User) => (
                    <li key={user.id} className='-mr-2'>
                        {/* <Tooltip>
                            <TooltipTrigger> */}
                        <Avatar className="h-7 w-7 rounded-full">
                            <AvatarImage src={user?.avatar_url} alt={"user?.user_name"} />
                            <AvatarFallback className="rounded-lg text-md">R</AvatarFallback>
                        </Avatar>
                        {/* <TooltipContent>
                                    {user.user_name ?? "Anonymous"}
                                </TooltipContent>
                            </TooltipTrigger>
                        </Tooltip> */}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AvatarList