"use client"
import React, { useState, useCallback } from 'react'
import { useComments } from '@/hooks/kanban/comments/use-comments'
import Editor from './comment-editor'
import { JSONContent } from '@tiptap/react'
import { Button } from '../ui/button'
import { toast } from '@/hooks/use-toast'
import { submitComment } from '@/lib/actions/comments'
import { useTask } from '@/hooks/kanban/use-task'
import CommentsList from './comments-list'
import { MessagesSquare } from 'lucide-react'

const CommentsSection = ({ task_id }: { task_id: string }) => {
    const [content, setContent] = useState<JSONContent>({})
    const { task } = useTask(task_id)
    const { comments, refetch } = useComments(task_id)

    const handleSubmitComment = useCallback(async () => {
        const error = await submitComment({ content: content, task_id: task?.id, project_id: task?.project_id, parent_id: null });
        if (error) {
            toast({
                title: "An error occured",
                description: error,
                variant: "destructive"
            })
        } else {
            setContent({})  // Clear content after successful submit
            refetch()  // Refetch comments only after submitting the comment
        }
    }, [content, task?.id, task?.project_id, refetch])

    return (
        <div className='flex flex-col w-full h-[80vh]'>
            <div className='grow p-4'>
                {Array.isArray(comments) && comments.length > 0 ? <CommentsList comments={comments} /> :
                    <EmptyCommentState />}
            </div>
            <div className='border-t p-2 sticky bg-background bottom-0 mt-0'>
                <Editor content={content} setContent={setContent} />
                <form className='flex justify-end'>
                    <Button disabled={JSON.stringify(content) === JSON.stringify({})} className='font-bold' formAction={handleSubmitComment}>Add comment</Button>
                </form>
            </div>
        </div>
    )
}

const EmptyCommentState = () => (
    <div className='grow flex items-center opacity-30 dark:opacity-60 flex-col h-full justify-center'>
        <MessagesSquare className='h-24 w-24 stroke-[.6px]' />
        <p className='italic'>There are no comments on this task yet.</p>
    </div>
)
export default CommentsSection
