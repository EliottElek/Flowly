"use client"
import { NestedComment } from '@/types/kanban'
import React from 'react'
import { CommentContent } from './comment-editor'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'

const CommentsList = ({ comments }: { comments: NestedComment[] }) => {

    const Comment = ({ comment }: { comment: NestedComment }) => {
        return (
            <li className=''>
                <div className=''>
                    <div className='flex items-center gap-2'>
                        <Avatar className="h-8 w-8 rounded-full">
                            <AvatarImage src={comment.user?.avatar_url ?? ""} alt={comment?.user?.username || ""} />
                            <AvatarFallback className="rounded-lg">U</AvatarFallback>
                        </Avatar>
                        <p className='text-sm font-semibold'>{comment?.user?.username ?? comment?.user?.email ?? "Unknown"}</p>
                    </div>
                    <div className='border-l ml-4'>
                        <div className='pl-5  !text-xs'>
                            <CommentContent content={comment.content} />
                        </div>
                        {comment.children.length > 0 &&
                            <div className='ml-4 p-2'>
                                <CommentsList comments={comment.children} />
                            </div>}
                    </div>

                </div>
            </li>
        )
    }
    return (
        <ul className=''>
            {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </ul>
    )
}

export default CommentsList