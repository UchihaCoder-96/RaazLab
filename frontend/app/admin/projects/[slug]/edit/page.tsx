"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import ProjectForm from "@/components/projects/ProjectForm";
import { Project, CreateProjectRequest } from "@/types/project";

import { getProject, updateProject } from "@/lib/projects";

export default function Page() {
    const { slug } = useParams<{ slug: string }>();
    const router = useRouter();

    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProject() {
            try {
                const data = await getProject(slug);

                setProject(data);
            } catch {
                alert("Failed to load project.");
            } finally {
                setLoading(false);
            }
        }

        loadProject();
    }, [slug]);

    async function editProject(updatedProject: CreateProjectRequest) {
        const response = await updateProject(slug, updatedProject);

        if (!response.ok) {
            alert("Failed to update project.");
            return;
        }

        router.push("/admin/projects");
    }

    if (loading) {
        return (
            <section className="
            flex
            min-h-screen
            items-center
            justify-center
            bg-zinc-50
            px-6
            text-zinc-700
            dark:bg-zinc-950
            dark:text-zinc-300
        ">
                <div className="flex items-center gap-3">
                    <div className="
                    h-2
                    w-2
                    animate-pulse
                    rounded-full
                    bg-teal-500
                ">

                        <span className="font-mono text-sm">
                            Loading...
                        </span>
                    </div>
                </div>
            </section>
        );
    }

    if (!project) {
        return (
            <section className="
            flex
            min-h-screen
            items-center
            justify-center
            bg-zinc-50
            px-6
            dark:bg-zinc-950
        ">
                <div className="
                w-full
                max-w-md
                rounded-3xl
                border
                border-red-200
                bg-white
                p-8
                text-center
                shadow-sm
                dark:border-red-500/20
                dark:bg-zinc-900
                dark:shadow-none
            ">
                    <div className="
                    mx-auto
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-red-500/10
                    text-red-500
                ">
                        !
                    </div>

                    <p className="
                    mt-4
                    font-medium
                    text-red-600
                    dark:text-red-400
                ">
                        Project not found.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="
        min-h-screen
        bg-zinc-50
        text-zinc-950
        dark:bg-zinc-950
        dark:text-zinc-100
    ">
            <div className="
            mx-auto
            max-w-5xl
            px-5
            py-12
            sm:px-6
            sm:py-16
            lg:py-20
        ">

                <div>
                    <h1 className="
                    text-3xl
                    font-bold
                    tracking-tight
                    sm:text-4xl
                ">
                        Edit Project
                    </h1>

                    <p className="
                    mt-3
                    text-zinc-600
                    dark:text-zinc-400
                ">
                        Update your project information.
                    </p>
                </div>

                <div className="
                mt-8
                rounded-3xl
                border
                border-zinc-200
                bg-white
                p-5
                shadow-sm
                sm:mt-10
                sm:p-8
                dark:border-zinc-800
                dark:bg-zinc-900
                dark:shadow-none
            ">
                    <ProjectForm
                        initialData={project}
                        submitText="Save Changes"
                        onSubmit={editProject}
                    />
                </div>

            </div>
        </section>
    );
}
