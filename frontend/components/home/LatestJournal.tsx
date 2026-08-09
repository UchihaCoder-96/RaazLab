import Link from "next/link";
import { getJournals } from "@/lib/journals";
import type { Journal } from "@/types/journal";

export default async function LatestJournals() {
    const JOURNAL_COUNT = 5;

    let journals: Journal[] = [];

    try {
        journals = await getJournals();
    } catch (error) {
        console.error("Failed to load latest journals:", error);
        return null;
    }

    const latestJournals = [...journals]
        .sort(
            (a, b) =>
                new Date(b.date).getTime() -
                new Date(a.date).getTime()
        )
        .slice(0, JOURNAL_COUNT);

    if (latestJournals.length === 0) {
        return null;
    }

    return (
        <section className="bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
            <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">

                <div className="mb-12">
                    <p className="font-mono text-sm uppercase tracking-wide text-teal-600 dark:text-teal-400">
                // Build Logs & Writing
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                        Recent Journal Entries
                    </h2>
                </div>

                <div className="border-t border-zinc-200 dark:border-zinc-800">
                    {latestJournals.map((journal) => (
                        <Link
                            key={journal.id}
                            href={`/journal/${journal.slug}`}
                            className="
                                group
                                grid
                                gap-4
                                border-b
                                border-zinc-200
                                py-5
                                transition-colors
                                hover:bg-zinc-100
                                dark:border-zinc-800
                                dark:hover:bg-zinc-900/40
                                md:grid-cols-[140px_1fr_auto]
                                md:items-center
                                md:gap-8
                            "
                        >
                            {/* Date */}
                            <time
                                dateTime={new Date(journal.date).toISOString()}
                                className="
                                    font-mono
                                    text-sm
                                    text-zinc-500 dark:text-zinc-500
                                    transition-colors
                                    group-hover:text-zinc-400
                                "
                            >&emsp;
                                {new Date(journal.date).toLocaleDateString(
                                    "en-US",
                                    {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                    }
                                ).replace(/\//g, ".")}
                            </time>

                            {/* Title */}
                            <h3
                                className="
                                    text-lg
                                    font-medium
                                    text-zinc-600 dark:text-zinc-100
                                    transition-colors
                                    group-hover:text-teal-400
                                    sm:text-xl
                                "
                            >
                                {journal.title}
                            </h3>

                            {/* Metadata */}
                            <div className="flex items-center gap-4 md:justify-end">

                                {journal.tags.length > 0 && (
                                    <span
                                        className="
                                            rounded
                                            bg-zinc-300 dark:bg-zinc-800
                                            px-2.5
                                            py-1
                                            font-mono
                                            text-xs
                                            text-zinc-600 dark:text-zinc-400
                                        "
                                    >
                                        {journal.tags[0]}
                                    </span>
                                )}

                                <span
                                    className="
                                        font-mono
                                        text-xs
                                        text-zinc-600
                                        dark:text-zinc-400
                                        transition-colors
                                        group-hover:text-zinc-400
                                    "
                                >
                                    Read → &emsp;
                                </span>

                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}
