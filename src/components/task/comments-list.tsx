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

    const Comment = ({ comment, index }: { comment: NestedComment, index: number }) => {
        const [reply, setReply] = useState(false)
        const [content, setContent] = useState<JSONContent>({})
        return (
            <li key={comment.id}>
                <div className="relative pb-3">
                    {index !== comments.length - 1 ? (
                        <span aria-hidden="true" className="absolute -z-1 left-3.5 top-8 -ml-px bottom-0 w-0.5 bg-muted/50" />
                    ) : null}
                    <div className="relative flex items-start space-x-3">
                        <>
                            <div className="relative">
                                <Avatar className="h-7 w-7 rounded-full">
                                    <AvatarImage src={comment.user?.avatar_url ?? ""} alt={comment?.user?.user_name || ""} />
                                    <AvatarFallback className="rounded-lg">U</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="min-w-0 flex-1">
                                <div>
                                    <div className="text-sm">
                                        <span className="font-medium">
                                            {comment.user.user_name}
                                        </span>
                                    </div>
                                    <p className="mt-0.5 text-sm font-light opacity-60">Commented {formatDistanceToNow(comment?.created_at, { addSuffix: true })}</p>
                                </div>
                                <div className="mt-2 text-sm opacity-90">
                                    <CommentContent content={comment.content} />
                                </div>
                            </div>
                        </>
                    </div>
                    <div>
                        <Button onClick={() => setReply(!reply)} className='h-3 px-1 text-xs opacity-50' variant={"ghost"}>{reply ? "Cancel" : "Reply"}</Button>
                    </div>
                    {reply &&
                        <div className='border z-1 rounded-md p-2 bg-background'>
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
                    </div>
                }
            </li >
        )
    }
    return (
        <ul className='flex flex-col grow gap-2'>
            {comments.map((comment, index) => (
                <Comment index={index} key={comment.id} comment={comment} />
            ))}
        </ul>
    )
}

export default CommentsList