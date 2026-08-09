"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

import JournalCard from "@/components/journal/JournalCard";
import { Journal } from "@/types/journal";
import { deleteJournal } from "@/lib/journals";

type JournalsClientProps = {
    journals: Journal[];
    isAdmin?: boolean;
};

export default function JournalsClient({
    journals,
    isAdmin = false,
}: JournalsClientProps) {
    const [query, setQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState("All");

    const [journalToDelete, setJournalToDelete] = useState<string | null>(
        null
    );

    const [isDeleting, setIsDeleting] = useState(false);

    const [dialog, setDialog] = useState<{
        open: boolean;
        title: string;
        message: string;
    }>({
        open: false,
        title: "",
        message: "",
    });

    /*
     * ---------------------------------------------------------
     * TAGS
     * ---------------------------------------------------------
     */

    const tags = [
        "All",
        ...Array.from(
            new Set(journals.flatMap((journal) => journal.tags))
        ).sort(),
    ];

    /*
     * ---------------------------------------------------------
     * FILTERING
     * ---------------------------------------------------------
     */

    const filteredJournals = journals
        .filter((journal) => {
            const normalizedQuery = query.toLowerCase().trim();

            const matchesSearch =
                normalizedQuery === "" ||
                journal.title.toLowerCase().includes(normalizedQuery) ||
                journal.summary.toLowerCase().includes(normalizedQuery) ||
                journal.tags.some((tag) =>
                    tag.toLowerCase().includes(normalizedQuery)
                );

            const matchesTag =
                selectedTag === "All" ||
                journal.tags.includes(selectedTag);

            return matchesSearch && matchesTag;
        })
        .sort(
            (a, b) =>
                b.date.getTime() - a.date.getTime()
        );

    /*
     * ---------------------------------------------------------
     * DELETE
     * ---------------------------------------------------------
     */

    async function handleDelete() {
        if (!journalToDelete) return;

        setIsDeleting(true);

        try {
            await deleteJournal(journalToDelete);

            setDialog({
                open: true,
                title: "Journal Deleted",
                message: "The journal was deleted successfully.",
            });

            setTimeout(() => {
                window.location.reload();
            }, 1200);
        } catch (error) {
            setDialog({
                open: true,
                title: "Delete Failed",
                message:
                    "Couldn't delete the journal. Please try again.\n\n[EXCEPTION] " +
                    (error as Error).message,
            });
        } finally {
            setIsDeleting(false);
            setJournalToDelete(null);
        }
    }

    /*
     * ---------------------------------------------------------
     * UI
     * ---------------------------------------------------------
     */

    return (
        <section
            className="
                min-h-screen
                border-b
                border-zinc-200
                bg-zinc-50
                text-zinc-900
                dark:border-zinc-800
                dark:bg-zinc-950
                dark:text-zinc-100
            "
        >
            <div
                className="
                    mx-auto
                    max-w-7xl
                    px-6
                    py-16
                    sm:px-8
                    sm:py-20
                    lg:px-10
                    lg:py-24
                "
            >
                {/* ------------------------------------------------ */}
                {/* HEADER                                           */}
                {/* ------------------------------------------------ */}

                {!isAdmin ? (
                    <div>
                        <div
                            className="
                                font-mono
                                text-xs
                                font-medium
                                uppercase
                                tracking-wide
                                text-teal-600
                                dark:text-teal-400
                            "
                        >
                            // TECHNICAL NOTEBOOK &amp; LOGS
                        </div>

                        <h1
                            className="
                                mt-4
                                text-4xl
                                font-bold
                                tracking-tight
                                text-zinc-900
                                sm:text-5xl
                                dark:text-zinc-100
                            "
                        >
                            Journal
                        </h1>

                        <p
                            className="
                                mt-5
                                max-w-4xl
                                text-base
                                leading-7
                                text-zinc-600
                                sm:text-lg
                                sm:leading-8
                                dark:text-zinc-400
                            "
                        >
                            Build logs, learnings, and low-level engineering
                            notes. Think of this as a public workspace
                            directory reflecting active research and
                            development.
                        </p>
                    </div>
                ) : (
                    <div>
                        <div
                            className="
                                font-mono
                                text-xs
                                font-medium
                                uppercase
                                tracking-wide
                                text-teal-600
                                dark:text-teal-400
                            "
                        >
                            // JOURNAL MANAGEMENT
                        </div>

                        <div
                            className="
                                mt-4
                                flex
                                flex-col
                                gap-6
                                sm:flex-row
                                sm:items-end
                                sm:justify-between
                            "
                        >
                            <div>
                                <h1
                                    className="
                                        text-4xl
                                        font-bold
                                        tracking-tight
                                        text-zinc-900
                                        sm:text-5xl
                                        dark:text-zinc-100
                                    "
                                >
                                    Manage Journals
                                </h1>

                                <p
                                    className="
                                        mt-3
                                        max-w-2xl
                                        text-zinc-600
                                        dark:text-zinc-400
                                    "
                                >
                                    Create, edit and organize your engineering
                                    journals.
                                </p>

                                <p
                                    className="
                                        mt-2
                                        text-sm
                                        text-zinc-500
                                        dark:text-zinc-500
                                    "
                                >
                                    You are logged in as an admin. You can edit
                                    or delete journals.
                                </p>
                            </div>

                            <Link
                                href="/admin/journals/new"
                                className="
                                    inline-flex
                                    min-h-11
                                    items-center
                                    justify-center
                                    rounded-md
                                    bg-teal-500
                                    px-5
                                    font-semibold
                                    text-zinc-950
                                    transition
                                    hover:bg-teal-400
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-teal-500
                                    focus:ring-offset-2
                                    focus:ring-offset-zinc-50
                                    dark:focus:ring-offset-zinc-950
                                "
                            >
                                + New Journal
                            </Link>
                        </div>
                    </div>
                )}

                {/* ------------------------------------------------ */}
                {/* SEARCH + FILTERS                                 */}
                {/* ------------------------------------------------ */}

                <div
                    className="
                        mt-12
                        flex
                        flex-col
                        gap-5
                        lg:flex-row
                        lg:items-end
                        lg:justify-between
                    "
                >
                    {/* Tags */}

                    <div
                        className="
                            order-2
                            flex
                            max-w-full
                            gap-2
                            overflow-x-auto
                            pb-1
                            scrollbar-thin
                            lg:order-1
                        "
                    >
                        {tags.map((tag) => {
                            const active = selectedTag === tag;

                            return (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => setSelectedTag(tag)}
                                    className={`
                                        shrink-0
                                        rounded-md
                                        border
                                        px-4
                                        py-2
                                        text-sm
                                        font-medium
                                        transition
                                        ${
                                            active
                                                ? `
                                                    border-teal-500
                                                    bg-teal-500/10
                                                    text-teal-600
                                                    dark:text-teal-400
                                                `
                                                : `
                                                    border-zinc-200
                                                    bg-zinc-100
                                                    text-zinc-500
                                                    hover:border-zinc-300
                                                    hover:text-zinc-900
                                                    dark:border-zinc-800
                                                    dark:bg-zinc-900/60
                                                    dark:text-zinc-400
                                                    dark:hover:border-zinc-700
                                                    dark:hover:text-zinc-100
                                                `
                                        }
                                    `}
                                >
                                    {tag}
                                </button>
                            );
                        })}
                    </div>

                    {/* Search */}

                    <div
                        className="
                            order-1
                            relative
                            w-full
                            lg:order-2
                            lg:max-w-sm
                        "
                    >
                        <Search
                            size={20}
                            className="
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2
                                text-zinc-500
                            "
                        />

                        <input
                            type="text"
                            placeholder="Search notebook..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="
                                h-12
                                w-full
                                rounded-md
                                border
                                border-zinc-200
                                bg-white
                                pl-11
                                pr-4
                                text-zinc-900
                                placeholder:text-zinc-400
                                outline-none
                                transition
                                focus:border-teal-500
                                focus:ring-1
                                focus:ring-teal-500
                                dark:border-zinc-800
                                dark:bg-zinc-900/60
                                dark:text-zinc-100
                                dark:placeholder:text-zinc-600
                            "
                        />
                    </div>
                </div>

                {/* ------------------------------------------------ */}
                {/* RESULT COUNT                                     */}
                {/* ------------------------------------------------ */}

                <div
                    className="
                        mt-8
                        border-b
                        border-zinc-200
                        pb-4
                        dark:border-zinc-800
                    "
                >
                    <p
                        className="
                            font-mono
                            text-xs
                            text-zinc-500
                        "
                    >
                        SHOWING{" "}
                        <span
                            className="
                                font-semibold
                                text-zinc-800
                                dark:text-zinc-300
                            "
                        >
                            {filteredJournals.length}
                        </span>{" "}
                        {filteredJournals.length === 1
                            ? "ENTRY"
                            : "ENTRIES"}
                    </p>
                </div>

                {/* ------------------------------------------------ */}
                {/* JOURNALS                                         */}
                {/* ------------------------------------------------ */}

                <div className="mt-8">
                    {filteredJournals.length > 0 ? (
                        <div className="space-y-8">
                            {filteredJournals.map((journal) => (
                                <div key={journal.id}>
                                    <JournalCard journal={journal} />

                                    {isAdmin && (
                                        <div className="mt-3 flex gap-3">
                                            <Link
                                                href={`/admin/journals/${journal.slug}/edit`}
                                                className="
                                                    rounded-md
                                                    border
                                                    border-teal-500/50
                                                    px-4
                                                    py-2
                                                    text-sm
                                                    font-medium
                                                    text-teal-600
                                                    transition
                                                    hover:bg-teal-500/10
                                                    dark:text-teal-400
                                                "
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setJournalToDelete(
                                                        journal.slug
                                                    )
                                                }
                                                className="
                                                    rounded-md
                                                    border
                                                    border-red-500/50
                                                    px-4
                                                    py-2
                                                    text-sm
                                                    font-medium
                                                    text-red-600
                                                    transition
                                                    hover:bg-red-500/10
                                                    dark:text-red-400
                                                "
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div
                            className="
                                rounded-md
                                border
                                border-dashed
                                border-zinc-300
                                py-16
                                text-center
                                dark:border-zinc-800
                            "
                        >
                            <h2
                                className="
                                    text-xl
                                    font-semibold
                                    text-zinc-900
                                    dark:text-zinc-100
                                "
                            >
                                No journal entries found
                            </h2>

                            <p
                                className="
                                    mt-3
                                    text-sm
                                    text-zinc-500
                                "
                            >
                                Try a different search or tag.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* DELETE CONFIRMATION                                  */}
            {/* ---------------------------------------------------- */}

            {journalToDelete && (
                <div
                    className="
                        fixed
                        inset-0
                        z-50
                        flex
                        items-center
                        justify-center
                        bg-black/50
                        p-6
                        backdrop-blur-sm
                    "
                >
                    <div
                        className="
                            w-full
                            max-w-md
                            rounded-lg
                            border
                            border-zinc-200
                            bg-white
                            p-6
                            shadow-2xl
                            dark:border-zinc-800
                            dark:bg-zinc-900
                        "
                    >
                        <h2
                            className="
                                text-xl
                                font-semibold
                                text-zinc-900
                                dark:text-zinc-100
                            "
                        >
                            Delete Journal?
                        </h2>

                        <p
                            className="
                                mt-3
                                text-sm
                                text-zinc-600
                                dark:text-zinc-400
                            "
                        >
                            This action cannot be undone.
                        </p>

                        <div className="mt-8 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setJournalToDelete(null)}
                                disabled={isDeleting}
                                className="
                                    rounded-md
                                    border
                                    border-zinc-300
                                    px-5
                                    py-2
                                    text-sm
                                    text-zinc-700
                                    transition
                                    hover:bg-zinc-100
                                    disabled:opacity-50
                                    dark:border-zinc-700
                                    dark:text-zinc-300
                                    dark:hover:bg-zinc-800
                                "
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="
                                    rounded-md
                                    bg-red-600
                                    px-5
                                    py-2
                                    text-sm
                                    font-medium
                                    text-white
                                    transition
                                    hover:bg-red-500
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                "
                            >
                                {isDeleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* RESULT DIALOG                                        */}
            {/* ---------------------------------------------------- */}

            {dialog.open && (
                <div
                    className="
                        fixed
                        inset-0
                        z-50
                        flex
                        items-center
                        justify-center
                        bg-black/50
                        p-6
                        backdrop-blur-sm
                    "
                >
                    <div
                        className="
                            w-full
                            max-w-sm
                            rounded-lg
                            border
                            border-zinc-200
                            bg-white
                            p-6
                            text-center
                            shadow-2xl
                            dark:border-zinc-800
                            dark:bg-zinc-900
                        "
                    >
                        <h2
                            className="
                                text-xl
                                font-semibold
                                text-zinc-900
                                dark:text-zinc-100
                            "
                        >
                            {dialog.title}
                        </h2>

                        <p
                            className="
                                mt-3
                                whitespace-pre-line
                                text-sm
                                text-zinc-600
                                dark:text-zinc-400
                            "
                        >
                            {dialog.message}
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                setDialog({
                                    open: false,
                                    title: "",
                                    message: "",
                                })
                            }
                            className="
                                mt-6
                                rounded-md
                                bg-teal-500
                                px-6
                                py-2
                                text-sm
                                font-semibold
                                text-zinc-950
                                transition
                                hover:bg-teal-400
                            "
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}

