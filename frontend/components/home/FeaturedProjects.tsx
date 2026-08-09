import Link from "next/link";

import { getProjects } from "@/lib/projects";
import ProjectCard from "@/components/projects/ProjectCard";
import type { Project } from "@/types/project";

export default async function FeaturedProjects() {
    let projects: Project[] = [];

    try {
        projects = await getProjects();
    } catch (error) {
        console.error("Failed to load featured projects:", error);
        return null;
    }

    const featuredProjects = projects
        .filter((project) => (project.featuredOrder ?? 0) > 0)
        .sort(
            (a, b) =>
                (a.featuredOrder ?? Number.MAX_SAFE_INTEGER) -
                (b.featuredOrder ?? Number.MAX_SAFE_INTEGER)
        );

    if (featuredProjects.length === 0) {
        return null;
    }

    return (
        <section className="bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-white">
            <div className="mx-auto max-w-7xl px-6 py-32 lg:px-10">

                {/* Section Header */}
                <div className="mb-10 flex items-end justify-between gap-6">

                    <div>
                        <p className="font-mono text-sm font-medium tracking-wide text-teal-600 dark:text-teal-400">
                            // RESEARCH &amp; DEVELOPMENT
                        </p>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                            Featured Systems
                        </h2>
                    </div>

                    <Link
                        href="/projects"
                        className="
                            hidden
                            font-mono
                            text-sm
                            text-teal-600
                            transition-colors
                            hover:text-teal-500
                            dark:text-teal-400
                            dark:hover:text-teal-300
                            sm:block
                        "
                    >
                        View all projects_
                    </Link>
                </div>

                {/* Mobile View All */}
                <div className="mb-6 sm:hidden">
                    <Link
                        href="/projects"
                        className="
                            font-mono
                            text-sm
                            text-teal-600
                            transition-colors
                            hover:text-teal-500
                            dark:text-teal-400
                            dark:hover:text-teal-300
                        "
                    >
                        View all projects_
                    </Link>
                </div>

                {/* Projects */}
                <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-2">
                    {featuredProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            variant="compact"
                        />
                    ))}
                </div>
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
                <hr className="border-zinc-800" />
            </div>
        </section>
    );
}

