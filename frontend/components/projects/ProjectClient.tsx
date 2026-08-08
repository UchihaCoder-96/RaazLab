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

export default function ProjectClient({ project }: { project: any }) {
    useEffect(() => {
        async function addView() {
            const key = `viewed-${project.slug}`;

            if (localStorage.getItem(key)) {
                return;
            }

            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/projects/${project.slug}/view`,
                    { method: "POST" }
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
    const words = project.content.split(/\s+/).filter(Boolean).length;
    const readingTime = Math.max(1, Math.ceil(words / 200));

    const publishedDate =
        project.lastUpdated ??
        project.startDate ??
        null;

    return (
        <section className="bg-zinc-950 text-white">
            <div className="mx-auto max-w-6xl px-6 py-32">
                <div className="space-y-8">

                    <div className="flex flex-wrap gap-3">

                        <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-1 text-sm text-blue-300">
                            {project.category}
                        </span>

                        <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1 text-sm text-emerald-300">
                            {project.status}
                        </span>

                        <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1 text-sm text-amber-300">
                            {project.difficulty}
                        </span>

                    </div>

                    <h1 className="text-5xl font-extrabold tracking-tight">
                        {project.title}
                    </h1>

                    <p className="max-w-5xl text-xl leading-8 text-zinc-400 justify">
                        {project.shortDescription}
                    </p>

                    <div className="grid gap-4 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 md:grid-cols-3">

                        <div>
                            <p className="text-sm text-zinc-500">
                                Reading Time
                            </p>

                            <p className="mt-1 text-lg font-semibold">
                                {readingTime} min
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-zinc-500">
                                Views
                            </p>

                            <p className="mt-1 text-lg font-semibold">
                                {project.viewCount}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-zinc-500">
                                Last Updated
                            </p>

                            <p className="mt-1 text-lg font-semibold">
                                {publishedDate
                                    ? new Date(publishedDate).toLocaleDateString("en-US")
                                    : "Unknown"}
                            </p>
                        </div>

                    </div>


                    <div>
                        <p className="text-sm text-zinc-500">
                            Technologies
                        </p>

                        <div className="mt-2 flex flex-wrap gap-2">

                            {project.technologies.map((tech: string) => (
                                <span
                                    key={tech}
                                    className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300"
                                >
                                    {tech}
                                </span>
                            ))}

                        </div>

                    </div>

                    <div className="relative aspect-video overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-xl">

                        {project.thumbnail ? (
                            <Image
                                src={project.thumbnail}
                                alt={`${project.title} thumbnail`}
                                fill
                                unoptimized
                                className="object-cover transition-transform duration-500 hover:scale-105"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center text-zinc-500">

                            </div>
                        )}

                    </div>
                    {(project.githubUrl || project.demoUrl) && (

                        <div className="flex flex-wrap gap-4">

                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-xl border border-zinc-700 px-5 py-3 transition hover:bg-zinc-800"
                                >
                                    GitHub Repository
                                </a>
                            )}

                            {project.demoUrl && (
                                <a
                                    href={project.demoUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-xl bg-blue-600 px-5 py-3 transition hover:bg-blue-500"
                                >
                                    Live Demo
                                </a>
                            )}

                        </div>

                    )}

                </div>
                <br />
                <hr className="my-14 border-zinc-800" />
                <div className="prose prose-invert prose-lg max-w-none prose-headings:scroll-mt-28 prose-img:rounded-xl prose-pre:rounded-2xl prose-pre:border prose-pre:border-zinc-800 prose-code:text-blue-300 prose-a:text-blue-400 hover:prose-a:text-blue-300">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkMath]}
                        rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeKatex]}
                    >
                        {project.content}
                    </ReactMarkdown>
                </div>
            </div>
        </section>
    );
}
