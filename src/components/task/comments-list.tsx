"use client"
import { NestedComment } from '@/types/kanban'
import React, { useState } from 'react'
import { CommentContent } from './comment-editor'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { formatDistanceToNow } from 'date-fns'
import { Button } from '../ui/button'
import Editor from './comment-editor'
import { JSONContent } from '@tiptap/react'

const CommentsList = ({ comments, handleSubmitComment }: { comments: NestedComment[], handleSubmitComment: any }) => {

    const Comment = ({ comment }: { comment: NestedComment }) => {
        const [reply, setReply] = useState(false)
        const [content, setContent] = useState<JSONContent>({})
        return (
            <li>
                <div>
                    <div className='flex p-2 flex-col bg-muted/50 border shadow-sm rounded-md'>
                        <div className='flex items-center gap-2'>
                            <Avatar className="h-7 w-7 rounded-full">
                                <AvatarImage src={comment.user?.avatar_url ?? ""} alt={comment?.user?.username || ""} />
                                <AvatarFallback className="rounded-lg">U</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className='text-sm font-semibold'>{comment?.user?.username ?? comment?.user?.email ?? "Unknown"}</p>
                                <p className='text-xs opacity-50 font-thin'>{formatDistanceToNow(comment?.created_at, { addSuffix: true })}</p>
                            </div>
                        </div>
                        <div className='m-1 !text-xs'>
                            <CommentContent content={comment.content} />
                        </div>
                        <div>
                            <Button onClick={() => setReply(!reply)} className='h-3 px-1 text-xs opacity-50' variant={"ghost"}>{reply ? "Cancel" : "Reply"}</Button>
                        </div>
                        {reply &&
                            <div className='border rounded-md p-2 bg-background'>
                                <Editor content={content} setContent={setContent} />
                                <form className='flex justify-end'>
                                    <Button disabled={JSON.stringify(content) === JSON.stringify({})} formAction={() => handleSubmitComment(content, comment.id)} className='font-bold'>Reply</Button>
                                </form>
                            </div>
                        }
                    </div>
                    {comment.children.length > 0 &&
                        <div className='ml-4 p-2'>
                            <CommentsList comments={comment.children} handleSubmitComment={handleSubmitComment} />
                        </div>}
                </div>
            </li>
        )
    }
    return (
        <ul className='flex flex-col gap-2'>
            {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </ul>
    )
}

export default CommentsList