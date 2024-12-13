"use client";

import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useConfirm } from "../use-confirm-dialog";
import { Project } from "@/types/project";
import { useProject } from "@/hooks/project/use-project";
import { useDeleteProject } from "@/hooks/project/use-delete-project";
import { useRouter } from "next/navigation";
import { ThemeDrawer } from "./theme-drawer";
import { supabase } from "@/lib/supabase/client";

interface ProjectContextProps {
    project: Partial<Project>;
    handleDeleteProject: () => Promise<void>;
    refetch: () => void;
    themeDrawerOpen: boolean;
    setThemeDrawerOpen: Dispatch<SetStateAction<boolean>>,
    handleChangeBackground: any
}
const ProjectContext = createContext<ProjectContextProps | undefined>(undefined);

export const ProjectProvider = ({ children, project_id }: { children: React.ReactNode, project_id: string }) => {
    const { confirm } = useConfirm();
    const { project, refetch } = useProject(project_id);
    const [themeDrawerOpen, setThemeDrawerOpen] = useState(false)
    const { deleteProject } = useDeleteProject();
    const router = useRouter()

    useEffect(() => {
        refetch()
    }, [project_id])

    useEffect(() => {
        const boardBg = document.getElementById("board-bg") as HTMLElement | null;
        if (boardBg && project?.image_url) {
            boardBg.style.backgroundImage = `url(${project.image_url})`;
            boardBg.style.backgroundSize = "cover";
            boardBg.style.backgroundPosition = "center";
        }
    }, [project]);

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

    const handleChangeBackground = async (img: string) => {
        const boardBg = document.getElementById("board-bg") as HTMLElement | null;
        console.log(boardBg)
        if (boardBg) {
            boardBg.style.backgroundImage = `url(${img})`;
            boardBg.style.backgroundSize = "cover";
            boardBg.style.backgroundPosition = "center";
        }
        await supabase.from("projects").update({ image_url: img }).eq("id", project_id)
    };

    return (
        <ProjectContext.Provider
            value={{
                project,
                refetch,
                handleDeleteProject,
                themeDrawerOpen,
                setThemeDrawerOpen,
                handleChangeBackground
            }}
        >
            {children}
            <ThemeDrawer />
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