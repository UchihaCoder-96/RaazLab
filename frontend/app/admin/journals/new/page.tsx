"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import JournalForm from "@/components/journal/JournalForm";

import { Project } from "@/types/project";

import { getProjects } from "@/lib/projects";
import { createJournal } from "@/lib/journals";

export default function Page() {
    const router = useRouter();

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProjects() {
            try {
                const data = await getProjects();

                setProjects(data);
            } catch {
                alert("Failed to load project.");
            } finally {
                setLoading(false);
            }
        }

        loadProjects();
    }, []);

    async function addJournal(journal: any) {
        const response = await createJournal(journal);

        if (!response.ok) {
            alert("Failed to create journal.");
            return;
        }

        router.push("/admin/journals");
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
                    Create Journal
                </h1>

                <p className="
                    mt-3
                    text-zinc-600
                    dark:text-zinc-400
                ">
                    Record today's progress, ideas, or development notes.
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
                <JournalForm
                    projects={projects}
                    submitText="Create Journal"
                    onSubmit={addJournal}
                />
            </div>

        </div>
    </section>
);
}

