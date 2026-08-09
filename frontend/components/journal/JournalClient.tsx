"use client";

import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import { useEffect } from "react";
import { WEBSITE_AUTHOR } from "@/utils/Utility";
import API_BASE_URL from "@/lib/api";

export default function JournalClient({
    journal,
}: {
    journal: any;
}) {
    useEffect(() => {
        if (!journal?.slug) return;

        async function addView() {
            const key = `viewed-${journal.slug}`;

            if (localStorage.getItem(key)) {
                return;
            }

            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/journals/${journal.slug}/view`,
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
    }, [journal?.slug]);

    if (!journal) {
        notFound();
    }

    const words = journal.content
        .split(/\s+/)
        .filter(Boolean).length;

    const readingTime = Math.max(
        1,
        Math.ceil(words / 200)
    );

    const publishedDate = new Date(journal.date);

    return (
        <main className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
            <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">

                {/* Breadcrumb */}
                <div className="mb-8 flex flex-wrap items-center gap-2 font-mono text-xs">
                    <span className="text-zinc-500">
                        Journal
                    </span>

                    <span className="text-zinc-400 dark:text-zinc-700">
                        &gt;
                    </span>

                    <span className="text-teal-600 dark:text-teal-400">
                        {journal.tags?.[0] ?? "Engineering"}
                    </span>
                </div>

                {/* Header */}
                <header className="max-w-5xl">

                    <div className="mb-6 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-wide">

                        <div>
                            <span className="text-zinc-500">
                                Published
                            </span>

                            <span className="ml-3 text-zinc-800 dark:text-zinc-300">
                                {publishedDate.toLocaleDateString(
                                    "en-US",
                                    {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                    }
                                )}
                            </span>
                        </div>

                        <div>
                            <span className="text-zinc-500">
                                Category
                            </span>

                            <span className="ml-3 text-teal-600 dark:text-teal-400">
                                {journal.tags?.[0] ?? "Journal"}
                            </span>
                        </div>

                        <div>
                            <span className="text-zinc-500">
                                Read Time
                            </span>

                            <span className="ml-3 text-zinc-800 dark:text-zinc-300">
                                {readingTime} min read
                            </span>
                        </div>

                        <div>
                            <span className="text-zinc-500">
                                Author
                            </span>

                            <span className="ml-3 text-zinc-800 dark:text-zinc-300">
                                {WEBSITE_AUTHOR}
                            </span>
                        </div>

                    </div>

                    <h1 className="
                        max-w-5xl
                        text-4xl
                        font-bold
                        leading-[1.08]
                        tracking-tight
                        text-zinc-950
                        sm:text-5xl
                        lg:text-6xl
                        dark:text-zinc-100
                    ">
                        {journal.title}
                    </h1>

                    <p className="
                        mt-7
                        max-w-4xl
                        text-base
                        leading-7
                        text-zinc-600
                        sm:text-lg
                        sm:leading-8
                        dark:text-zinc-400
                    ">
                        {journal.summary}
                    </p>

                </header>

                {/* Metadata / stats */}
                <div className="
                    mt-10
                    grid
                    gap-px
                    overflow-hidden
                    border
                    border-zinc-200
                    bg-zinc-200
                    sm:grid-cols-2
                    lg:grid-cols-4
                    dark:border-zinc-800
                    dark:bg-zinc-800
                ">

                    <div className="bg-white p-5 dark:bg-zinc-950">
                        <p className="font-mono text-[11px] uppercase tracking-wide text-zinc-500">
                            Reading Time
                        </p>

                        <p className="mt-2 font-mono text-sm text-zinc-900 dark:text-zinc-200">
                            {readingTime} min
                        </p>
                    </div>

                    <div className="bg-white p-5 dark:bg-zinc-950">
                        <p className="font-mono text-[11px] uppercase tracking-wide text-zinc-500">
                            Views
                        </p>

                        <p className="mt-2 font-mono text-sm text-zinc-900 dark:text-zinc-200">
                            {journal.viewCount}
                        </p>
                    </div>

                    <div className="bg-white p-5 dark:bg-zinc-950">
                        <p className="font-mono text-[11px] uppercase tracking-wide text-zinc-500">
                            Published
                        </p>

                        <p className="mt-2 font-mono text-sm text-zinc-900 dark:text-zinc-200">
                            {publishedDate.toLocaleDateString("en-US")}
                        </p>
                    </div>

                    <div className="bg-white p-5 dark:bg-zinc-950">
                        <p className="font-mono text-[11px] uppercase tracking-wide text-zinc-500">
                            Linked Project
                        </p>

                        <p className="
                            mt-2
                            break-all
                            font-mono
                            text-sm
                            text-zinc-900
                            dark:text-zinc-200
                        ">
                            {journal.projectSlug ?? "None"}
                        </p>
                    </div>

                </div>

                {/* Tags */}
                {journal.tags?.length > 0 && (
                    <div className="mt-8">

                        <div className="mb-3 font-mono text-[11px] uppercase tracking-wide text-zinc-500">
                            // TAGS
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {journal.tags.map((tag: string) => (
                                <span
                                    key={tag}
                                    className="
                                        border
                                        border-zinc-200
                                        bg-zinc-50
                                        px-3
                                        py-1.5
                                        font-mono
                                        text-xs
                                        text-zinc-600
                                        transition-colors
                                        hover:border-teal-500/50
                                        hover:text-teal-600
                                        dark:border-zinc-800
                                        dark:bg-zinc-900/50
                                        dark:text-zinc-400
                                        dark:hover:border-teal-500/50
                                        dark:hover:text-teal-400
                                    "
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                    </div>
                )}

                {/* Divider */}
                <div className="my-12 h-px bg-zinc-200 dark:bg-zinc-800" />

                {/* Article */}
                <article
                    className="
                        prose
                        max-w-none

                        prose-headings:scroll-mt-28
                        prose-headings:font-semibold
                        prose-headings:tracking-tight

                        prose-p:text-zinc-600
                        prose-p:leading-8

                        prose-strong:text-zinc-900

                        prose-a:text-teal-600
                        hover:prose-a:text-teal-500

                        prose-code:text-teal-700
                        prose-code:before:content-none
                        prose-code:after:content-none

                        prose-pre:overflow-x-auto
                        prose-pre:border
                        prose-pre:border-zinc-200
                        prose-pre:bg-zinc-50

                        prose-blockquote:border-teal-500
                        prose-blockquote:text-zinc-600

                        prose-li:text-zinc-600

                        prose-hr:border-zinc-200

                        prose-img:rounded-md
                        prose-img:border
                        prose-img:border-zinc-200

                        dark:prose-invert

                        dark:prose-p:text-zinc-400
                        dark:prose-strong:text-zinc-100
                        dark:prose-code:text-teal-300

                        dark:prose-pre:border-zinc-800
                        dark:prose-pre:bg-zinc-900/70

                        dark:prose-blockquote:text-zinc-400

                        dark:prose-li:text-zinc-400

                        dark:prose-hr:border-zinc-800

                        dark:prose-img:border-zinc-800
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
                        {journal.content}
                    </ReactMarkdown>
                </article>

            </div>
        </main>
    );
}


