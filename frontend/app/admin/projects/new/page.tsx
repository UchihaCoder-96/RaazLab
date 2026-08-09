"use client";

import { useRouter } from "next/navigation";

import ProjectForm from "@/components/projects/ProjectForm";
import { createProject } from '@/lib/projects';

export default function Page() {
    const router = useRouter();

    async function addProject(project: any) {
        const response = await createProject(project);

        if (!response.ok) {
            alert("Failed to create project.");
            return;
        }

        router.push("/admin/projects");
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
                        Create Project
                    </h1>

                    <p className="
                    mt-3
                    text-zinc-600
                    dark:text-zinc-400
                ">
                        Add a new engineering project to your portfolio.
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
                        submitText="Create Project"
                        onSubmit={addProject}
                    />
                </div>

            </div>
        </section>
    );
}

