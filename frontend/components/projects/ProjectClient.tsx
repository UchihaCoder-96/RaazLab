"use client";

import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import API_BASE_URL from "@/lib/api";
import Image from "next/image";
import { useEffect } from "react";
import { Eye, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

export default function ProjectClient({
    project,
}: {
    project: any;
}) {
    useEffect(() => {
        async function addView() {
            const key = `viewed-${project.slug}`;

            if (localStorage.getItem(key)) {
                return;
            }

            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/projects/${project.slug}/view`,
                    {
                        method: "POST",
                    }
                );

                if (response.ok) {
                    localStorage.setItem(key, "true");
                }
            } catch (err) {
                console.error("Failed to record view:", err);
            }
        }

        addView();
    }, [project.slug]);

    if (!project) {
        notFound();
    }

    const words = project.content
        .split(/\s+/)
        .filter(Boolean).length;

    const readingTime = Math.max(
        1,
        Math.ceil(words / 200)
    );

    const statusColor =
        project.status === "Completed"
            ? "text-teal-600 dark:text-teal-400"
            : project.status === "InProgress"
                ? "text-amber-600 dark:text-amber-400"
                : "text-blue-600 dark:text-blue-400";

    const statusDot =
        project.status === "Completed"
            ? "bg-teal-500"
            : project.status === "InProgress"
                ? "bg-amber-500"
                : "bg-blue-500";

    return (
        <main className="bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
            <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">

                {/* ------------------------------------------------ */}
                {/* Project Header */}
                {/* ------------------------------------------------ */}

                <header>

                    {/* Breadcrumb */}
                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                        <span className="text-zinc-500">
                            Projects
                        </span>

                        <span className="text-zinc-400 dark:text-zinc-700">
                            &gt;
                        </span>

                        <span className="text-teal-600 dark:text-teal-400">
                            {project.title.split(":")[0] || project.title}
                        </span>
                    </div>

                    {/* Title + Actions */}
                    <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

                        <div className="max-w-4xl">

                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                                {project.title}
                            </h1>

                            <p className="mt-5 max-w-4xl text-base leading-7 text-zinc-600 dark:text-zinc-400 sm:text-lg">
                                {project.shortDescription}
                            </p>

                        </div>

                        {/* External actions */}
                        {(project.githubUrl || project.demoUrl) && (
                            <div className="flex shrink-0 flex-wrap gap-2">

                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="
                                            inline-flex
                                            min-h-10
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-md
                                            border
                                            border-zinc-300
                                            px-4
                                            font-mono
                                            text-xs
                                            text-zinc-700
                                            transition
                                            hover:border-zinc-500
                                            hover:bg-zinc-100
                                            dark:border-zinc-800
                                            dark:text-zinc-300
                                            dark:hover:border-zinc-600
                                            dark:hover:bg-zinc-900
                                        "
                                    >
                                        <FaGithub className="h-3.5 w-3.5" />
                                        Source Code
                                    </a>
                                )}

                                {project.demoUrl && (
                                    <a
                                        href={project.demoUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="
                                            inline-flex
                                            min-h-10
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-md
                                            border
                                            border-teal-500/50
                                            bg-teal-500/5
                                            px-4
                                            font-mono
                                            text-xs
                                            text-teal-700
                                            transition
                                            hover:bg-teal-500/10
                                            dark:text-teal-400
                                        "
                                    >
                                        <ExternalLink className="h-3.5 w-3.5" />
                                        Interactive Log
                                    </a>
                                )}

                            </div>
                        )}

                    </div>

                    {/* ------------------------------------------------ */}
                    {/* Project Metadata */}
                    {/* ------------------------------------------------ */}

                    <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-y border-zinc-200 py-5 dark:border-zinc-800 sm:grid-cols-4 lg:max-w-4xl">

                        <MetaItem
                            label="CATEGORY"
                            value={project.category}
                        />

                        <MetaItem
                            label="STATUS"
                            value={project.status}
                            valueClass={statusColor}
                            dot={statusDot}
                        />

                        <MetaItem
                            label="INIT_DATE"
                            value={
                                project.startDate
                                    ? new Date(
                                        project.startDate
                                    ).toLocaleDateString(
                                        "en-CA"
                                    )
                                    : "UNKNOWN"
                            }
                        />

                        <MetaItem
                            label="REV_HASH"
                            value={
                                project.id
                                    ? String(project.id).slice(
                                        0,
                                        8
                                    )
                                    : "N/A"
                            }
                        />

                    </div>

                    {/* Technologies */}
                    {project.technologies?.length > 0 && (
                        <div className="mt-5 flex flex-wrap gap-2">

                            {project.technologies.map(
                                (tech: string, index: number) => (
                                    <span
                                        key={tech}
                                        className={`
                                            rounded-sm
                                            border
                                            px-2.5
                                            py-1
                                            font-mono
                                            text-[11px]
                                            ${index === 0
                                                ? "border-teal-500/50 bg-teal-500/5 text-teal-700 dark:text-teal-400"
                                                : "border-zinc-300 bg-zinc-100 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
                                            }
                                        `}
                                    >
                                        {tech}
                                    </span>
                                )
                            )}

                        </div>
                    )}

                </header>
                {/* ------------------------------------------------ */}
                {/* Hero Project Visual */}
                {/* ------------------------------------------------ */}

                <section className="
                            mt-8
                            overflow-hidden
                            rounded-md
                            border
                            border-zinc-200
                            bg-zinc-100
                            dark:border-zinc-800
                            dark:bg-zinc-900
                        ">
                    <div className="relative aspect-[16/9] overflow-hidden bg-zinc-200 dark:bg-zinc-900 sm:aspect-[16/8]">

                        {project.thumbnail ? (
                            <Image
                                src={project.thumbnail}
                                alt={`${project.title} thumbnail`}
                                fill
                                unoptimized
                                priority
                                className="object-cover"
                                sizes="
                                (max-width: 640px) 100vw,
                                (max-width: 1024px) 90vw,
                                80vw
                            "/>
                        ) : (
                            <div className="
                                flex
                                h-full
                                items-center
                                justify-center
                                font-mono
                                text-xs
                                text-zinc-500
                            ">
                                NO_VISUAL_ASSET
                            </div>
                        )}

                        {/* Diagnostic overlay */}
                        <div className="
                            absolute
                            left-4
                            top-4
                            font-mono
                            text-xs
                            text-teal-600
                            dark:text-teal-400
                            sm:left-6
                            sm:top-5
                        ">
                            [ SYS_MOCKUP: OK ]
                        </div>

                    </div>
                </section>


                {/* ------------------------------------------------ */}
                {/* Reading Metadata */}
                {/* ------------------------------------------------ */}

                <div className="
                    mt-8
                    grid
                    grid-cols-2
                    gap-y-6
                    border-b
                    border-zinc-200
                    pb-8
                    sm:grid-cols-4
                    sm:gap-5
                    dark:border-zinc-800
                ">

                    <MetaItem
                        label="READING_TIME"
                        value={`${readingTime} min`}
                    />

                    <MetaItem
                        label="VIEWS"
                        value={String(project.viewCount)}
                    />

                    <MetaItem
                        label="DIFFICULTY"
                        value={project.difficulty}
                    />

                    <MetaItem
                        label="LAST_UPDATED"
                        value={
                            project.lastUpdated
                                ? new Date(
                                    project.lastUpdated
                                ).toLocaleDateString("en-US")
                                : "NO UPDATES YET"
                        }
                    />

                </div>
                {/* ------------------------------------------------ */}
                {/* Markdown Content */}
                {/* ------------------------------------------------ */}

                <article
                    className="
                        mt-12
                        max-w-none
                        prose
                        prose-zinc
                        dark:prose-invert
                        prose-lg

                        prose-headings:scroll-mt-28
                        prose-headings:font-bold

                        prose-h1:text-3xl
                        prose-h2:text-2xl
                        prose-h3:text-xl

                        prose-p:text-zinc-600
                        dark:prose-p:text-zinc-400

                        prose-strong:text-zinc-900
                        dark:prose-strong:text-zinc-100

                        prose-a:text-teal-600
                        hover:prose-a:text-teal-500
                        dark:prose-a:text-teal-400

                        prose-code:text-teal-700
                        dark:prose-code:text-teal-300

                        prose-pre:rounded-md
                        prose-pre:border
                        prose-pre:border-zinc-200
                        prose-pre:bg-zinc-100
                        dark:prose-pre:border-zinc-800
                        dark:prose-pre:bg-zinc-900

                        prose-img:rounded-md
                    "
                >
                    <ReactMarkdown
                        remarkPlugins={[
                            remarkGfm,
                            remarkMath,
                        ]}
                        rehypePlugins={[
                            rehypeRaw,
                            rehypeHighlight,
                            rehypeKatex,
                        ]}
                    >
                        {project.content}
                    </ReactMarkdown>
                </article>

            </div>
        </main>
    );
}


/* ------------------------------------------------ */
/* Metadata Component */
/* ------------------------------------------------ */

function MetaItem({
    label,
    value,
    valueClass = "",
    dot,
}: {
    label: string;
    value: string;
    valueClass?: string;
    dot?: string;
}) {
    return (
        <div className="min-w-0">

            <p className="font-mono text-[10px] tracking-wide text-zinc-500">
                {label}
            </p>

            <p
                className={`mt-1 flex items-center gap-2 font-mono text-xs ${valueClass}`}
            >
                {dot && (
                    <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`}
                    />
                )}

                <span className="truncate">
                    {value}
                </span>
            </p>

        </div>
    );
}

