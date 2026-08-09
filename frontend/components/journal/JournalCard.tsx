import Link from "next/link";
import { Journal } from "@/types/journal";
import { EyeIcon } from "lucide-react";

export default function JournalCard({
    journal,
}: {
    journal: Journal;
}) {
    return (
        <Link
            href={`/journal/${journal.slug}`}
            className="group block"
        >
            <article
                className="
                    overflow-hidden
                    rounded-md
                    border
                    border-zinc-200
                    bg-white
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:border-teal-500/50
                    hover:shadow-lg
                    hover:shadow-teal-500/5

                    dark:border-zinc-800
                    dark:bg-zinc-900/50
                    dark:hover:border-teal-500/40
                    dark:hover:shadow-teal-500/5
                "
            >
                {/* ------------------------------------------------ */}
                {/* HEADER                                           */}
                {/* ------------------------------------------------ */}

                <div
                    className="
                        flex
                        flex-wrap
                        items-center
                        justify-between
                        gap-3
                        border-b
                        border-zinc-200
                        px-5
                        py-4

                        dark:border-zinc-800
                    "
                >
                    <time
                        className="
                            font-mono
                            text-xs
                            text-zinc-500
                            dark:text-zinc-500
                        "
                    >
                        {journal.date.toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })}
                    </time>

                    {journal.projectSlug && (
                        <span
                            className="
                                rounded-sm
                                border
                                border-teal-500/30
                                bg-teal-500/5
                                px-2.5
                                py-1
                                font-mono
                                text-[11px]
                                uppercase
                                tracking-wide
                                text-teal-600

                                dark:text-teal-400
                            "
                        >
                            Linked Project
                        </span>
                    )}
                </div>

                {/* ------------------------------------------------ */}
                {/* CONTENT                                          */}
                {/* ------------------------------------------------ */}

                <div className="px-5 py-6 sm:px-6">
                    <h2
                        className="
                            text-xl
                            font-semibold
                            tracking-tight
                            text-zinc-900
                            transition-colors
                            group-hover:text-teal-600

                            dark:text-zinc-100
                            dark:group-hover:text-teal-400

                            sm:text-2xl
                        "
                    >
                        {journal.title}
                    </h2>

                    <p
                        className="
                            mt-3
                            max-w-4xl
                            text-sm
                            leading-7
                            text-zinc-600

                            dark:text-zinc-400

                            sm:text-base
                        "
                    >
                        {journal.summary}
                    </p>

                    {/* Tags */}

                    {journal.tags.length > 0 && (
                        <div className="mt-5 flex flex-wrap gap-2">
                            {journal.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="
                                        rounded-sm
                                        border
                                        border-zinc-200
                                        bg-zinc-50
                                        px-2.5
                                        py-1
                                        font-mono
                                        text-xs
                                        text-zinc-500

                                        dark:border-zinc-800
                                        dark:bg-zinc-950/60
                                        dark:text-zinc-400
                                    "
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* ------------------------------------------------ */}
                {/* FOOTER                                           */}
                {/* ------------------------------------------------ */}

                <div
                    className="
                        flex
                        flex-wrap
                        items-center
                        justify-between
                        gap-4
                        border-t
                        border-zinc-200
                        px-5
                        py-4

                        dark:border-zinc-800
                    "
                >
                    {/* Left */}

                    <div className="flex items-center gap-4">
                        <span
                            className="
                                font-mono
                                text-xs
                                text-zinc-500
                            "
                        >
                            DEV_LOG
                        </span>

                        <span
                            className="
                                flex
                                items-center
                                gap-1.5
                                font-mono
                                text-xs
                                text-zinc-500
                            "
                        >
                            <EyeIcon className="h-3.5 w-3.5" />
                            {journal.viewCount}
                        </span>
                    </div>

                    {/* Right */}

                    <span
                        className="
                            font-mono
                            text-xs
                            font-medium
                            text-teal-600
                            opacity-0
                            transition-all
                            duration-300
                            group-hover:translate-x-1
                            group-hover:opacity-100

                            dark:text-teal-400
                        "
                    >
                        READ_ENTRY →
                    </span>
                </div>
            </article>
        </Link>
    );
}

