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
import { supabase } from "@/lib/supabase/client";

const CommentsSection = ({ task_id }: { task_id: string }) => {
    const [content, setContent] = useState<JSONContent>({})
    const { task } = useTask(task_id)
    const { comments, refetch } = useComments(task_id)

    const handleChanges = () => {
        refetch()
    }
    // Listen to comments changes
    supabase
        .channel('comments')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'comments', filter: `project_id=eq.${task?.project_id}` }, handleChanges)
        .subscribe()

    const handleSubmitComment = useCallback(async (content: JSONContent, parent_id?: string | null) => {
        const error = await submitComment({ content: content, task_id: task?.id, project_id: task?.project_id, parent_id: parent_id });
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
        <div className='flex flex-col w-full h-full'>
            <div className='grow p-4'>
                {Array.isArray(comments) && comments.length > 0 ? <CommentsList comments={comments} handleSubmitComment={handleSubmitComment as any} /> :
                    <EmptyCommentState />}
            </div>
            <div className='sticky p-2 bg-background bottom-0 mt-0'>
                <div className='border rounded-md p-2'>
                    <Editor content={content} setContent={setContent} />
                    <form className='flex justify-end'>
                        <Button disabled={JSON.stringify(content) === JSON.stringify({})} className='font-bold' formAction={() => handleSubmitComment(content, null)}>Add comment</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

const EmptyCommentState = () => (
    <div className='grow flex items-center opacity-30 dark:opacity-60 flex-col h-full justify-center'>
        <p className='italic'>There are no comments on this task yet.</p>
    </div>
)
export default CommentsSection
