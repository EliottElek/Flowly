"use client"
import { TaskProvider } from "@/components/task/task-context";

const TaskLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <TaskProvider>
            {children}
        </TaskProvider>
    )
}
export default TaskLayout