"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useConfirm } from "../use-confirm-dialog";
import { Project } from "@/types/project";
import { useProject } from "@/hooks/project/use-project";
import { useDeleteProject } from "@/hooks/project/use-delete-project";
import { useRouter } from "next/navigation";

interface ProjectContextProps {
    project: Partial<Project>;
    handleDeleteProject: () => Promise<void>;
    refetch: () => void
}
const ProjectContext = createContext<ProjectContextProps | undefined>(undefined);

export const ProjectProvider = ({ children, project_id }: { children: React.ReactNode, project_id: string }) => {
    const { confirm } = useConfirm();
    const { project, refetch } = useProject(project_id);
    const { deleteProject } = useDeleteProject();
    const router = useRouter()

    useEffect(() => {
        refetch()
    }, [project_id])

    const handleDeleteProject = async () => {
        if (!project_id) return;
        if (await confirm({ title: "Are you sure?", message: "You're about to delete this task. This action is irreversible." })) {
            await deleteProject(project_id);
            deleteProject(project_id);
            router.push("/dashboard")
            toast({
                title: "Your project has been deleted.",
                description: "Your project has been successfully deleted.",
            });
        }
    };

    return (
        <ProjectContext.Provider
            value={{
                project,
                refetch,
                handleDeleteProject
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
};

export const useProjectContext = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error("useProjectContext must be used within a ProjectProvider");
    }
    return context;
};
