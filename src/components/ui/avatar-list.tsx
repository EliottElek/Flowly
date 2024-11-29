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
            <ul>
                {users.map((user: User) => (
                    <li key={user.id}>
                        {/* <Tooltip>
                            <TooltipTrigger> */}
                        <Avatar className="h-8 w-8 rounded-full">
                            <AvatarImage src={user?.avatar_url} alt={"user?.user_name"} />
                            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
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