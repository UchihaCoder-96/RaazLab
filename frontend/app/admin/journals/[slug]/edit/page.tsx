"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import JournalForm from "@/components/journal/JournalForm";

import { Journal } from "@/types/journal";
import { Project } from "@/types/project";

import { getProjects } from "@/lib/projects";
import { getJournal, updateJournal } from "@/lib/journals";

export default function Page() {
    const { slug } = useParams<{ slug: string }>();
    const router = useRouter();

    const [journal, setJournal] = useState<Journal | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                console.log("Loading journal:", slug);

                const journalData = await getJournal(slug);

                console.log("Journal loaded:");
                console.log(journalData);

                setJournal(journalData);
            }
            catch (error) {
                console.error("[GET JOURNAL ERROR]");
                console.error(error);

                alert("Failed to load journal.");
                return;
            }

            try {
                console.log("Loading projects...");

                const projectData = await getProjects();

                console.log("Projects loaded:");
                console.log(projectData);

                setProjects(projectData);
            }
            catch (error) {
                console.error("[GET PROJECTS ERROR]");
                console.error(error);

                alert("Failed to load projects.");
                return;
            }

            setLoading(false);
        }

        loadData();
    }, [slug]);

    async function editJournal(updatedJournal: any) {
        const response = await updateJournal(slug, updatedJournal);

        if (!response.ok) {
            alert("Failed to update journal.");
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

    if (!journal) {
        return (
            <section className="
            flex
            min-h-screen
            items-center
            justify-center
            bg-zinc-50
            px-6
            text-zinc-950
            dark:bg-zinc-950
            dark:text-zinc-100
        ">
                <p className="
                text-red-500
                dark:text-red-400
            ">
                    Journal not found.
                </p>
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
                        Edit Journal
                    </h1>

                    <p className="
                    mt-3
                    text-zinc-600
                    dark:text-zinc-400
                ">
                        Update your journal entry.
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
                        initialData={journal}
                        submitText="Save Changes"
                        onSubmit={editJournal}
                    />
                </div>

            </div>
        </section>
    );
}

