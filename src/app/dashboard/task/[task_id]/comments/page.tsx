"use client"
import CommentsSection from '@/components/task/comments-section'
import { redirect, useParams } from 'next/navigation'
import React from 'react'

const page = () => {
  const { task_id } = useParams()
  if (!task_id) return redirect("/404")

  return (
    <div><CommentsSection task_id={task_id as unknown as string} /></div>
  )
}

export default page