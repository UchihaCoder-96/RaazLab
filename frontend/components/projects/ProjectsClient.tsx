"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, X } from "lucide-react";

import ProjectCard from "@/components/projects/ProjectCard";
import { deleteProject } from "@/lib/projects";
import { formatEnums } from "@/utils/Utility";

import {
    Project,
    ProjectCategory,
    ProjectDifficulty,
    ProjectStatus,
} from "@/types/project";

type ProjectsClientProps = {
    projects: Project[];
    isAdmin?: boolean;
};

export default function ProjectsClient({
    projects,
    isAdmin = false,
}: ProjectsClientProps) {
    const [query, setQuery] = useState("");

    const [category, setCategory] =
        useState<ProjectCategory | "all">("all");

    const [status, setStatus] =
        useState<ProjectStatus | "all">("all");

    const [difficulty, setDifficulty] =
        useState<ProjectDifficulty | "all">("all");

    const [projectToDelete, setProjectToDelete] =
        useState<string | null>(null);

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
    |--------------------------------------------------------------------------
    | Available filter values
    |--------------------------------------------------------------------------
    */

    const categories = Array.from(
        new Set(projects.map((project) => project.category))
    ).sort();

    const statuses = Array.from(
        new Set(projects.map((project) => project.status))
    );

    const difficulties = Array.from(
        new Set(projects.map((project) => project.difficulty))
    );

    /*
    |--------------------------------------------------------------------------
    | Filtering
    |--------------------------------------------------------------------------
    */

    const normalizedQuery = query.trim().toLowerCase();

    const filteredProjects = projects.filter((project) => {
        const matchesSearch =
            normalizedQuery === "" ||
            project.title.toLowerCase().includes(normalizedQuery) ||
            project.shortDescription
                .toLowerCase()
                .includes(normalizedQuery);

        const matchesCategory =
            category === "all" ||
            project.category === category;

        const matchesStatus =
            status === "all" ||
            project.status === status;

        const matchesDifficulty =
            difficulty === "all" ||
            project.difficulty === difficulty;

        return (
            matchesSearch &&
            matchesCategory &&
            matchesStatus &&
            matchesDifficulty
        );
    });

    /*
    |--------------------------------------------------------------------------
    | Reset
    |--------------------------------------------------------------------------
    */

    const hasActiveFilters =
        query.trim() !== "" ||
        category !== "all" ||
        status !== "all" ||
        difficulty !== "all";

    function resetFilters() {
        setQuery("");
        setCategory("all");
        setStatus("all");
        setDifficulty("all");
    }

    /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

    async function handleDelete() {
        if (!projectToDelete) return;

        setIsDeleting(true);

        try {
            await deleteProject(projectToDelete);

            setProjectToDelete(null);

            setDialog({
                open: true,
                title: "Project Deleted",
                message: "The project was deleted successfully.",
            });

            setTimeout(() => {
                window.location.reload();
            }, 1200);
        } catch (error) {
            setDialog({
                open: true,
                title: "Delete Failed",
                message:
                    "Couldn't delete the project. Please try again.\n\n" +
                    "[EXCEPTION] " +
                    (error as Error).message,
            });
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <section
            className="
                min-h-screen
                bg-zinc-50
                text-zinc-900
                transition-colors
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
                    sm:py-20
                    lg:px-10
                    lg:py-24
                "
            >
                {/* ================================================== */}
                {/* HEADER                                             */}
                {/* ================================================== */}

                {!isAdmin ? (
                    <header>
                        <div
                            className="
                                mb-5
                                flex
                                items-center
                                gap-3
                                font-mono
                                text-sm
                                text-teal-600
                                dark:text-teal-400
                            "
                        >
                            <span
                                className="
                                    h-2
                                    w-2
                                    rounded-full
                                    bg-teal-500
                                    dark:bg-teal-400
                                "
                            />

                            <span>R_LABS</span>

                            <span className="text-zinc-400 dark:text-zinc-600">
                                //
                            </span>

                            <span>BUILD CATALOG</span>
                        </div>

                        <h1
                            className="
                                text-4xl
                                font-bold
                                tracking-tight
                                text-zinc-950
                                sm:text-5xl
                                lg:text-5xl
                                dark:text-zinc-100
                            "
                        >
                            Engineering Works
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
                            An index of physical prototypes, open source
                            modules, microbenchmarks, and specialized tools.
                            Hand-built architecture logs and metrics included
                            for every project.
                        </p>
                    </header>
                ) : (
                    <header
                        className="
                            flex
                            flex-col
                            gap-6
                            sm:flex-row
                            sm:items-end
                            sm:justify-between
                        "
                    >
                        <div>
                            <div
                                className="
                                    mb-4
                                    font-mono
                                    text-sm
                                    text-teal-600
                                    dark:text-teal-400
                                "
                            >
                                // ADMIN // PROJECT MANAGEMENT
                            </div>

                            <h1
                                className="
                                    text-4xl
                                    font-bold
                                    tracking-tight
                                    text-zinc-950
                                    dark:text-zinc-100
                                "
                            >
                                Manage Projects
                            </h1>

                            <p
                                className="
                                    mt-2
                                    text-zinc-600
                                    dark:text-zinc-400
                                "
                            >
                                Create, edit and organize your engineering
                                projects.
                            </p>
                        </div>

                        <Link
                            href="/admin/projects/new"
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
                            + New Project
                        </Link>
                    </header>
                )}

                {/* ================================================== */}
                {/* FILTER BAR                                         */}
                {/* ================================================== */}

                <div
                    className="
                        mt-10
                        border-y
                        border-zinc-200
                        py-6
                        dark:border-zinc-800
                        sm:mt-12
                    "
                >
                    {/* Search */}

                    <div
                        className="
                            flex
                            flex-col
                            gap-4
                            lg:flex-row
                            lg:items-center
                            lg:justify-between
                        "
                    >
                        <div className="relative w-full lg:max-w-md">
                            <Search
                                size={20}
                                className="
                                    pointer-events-none
                                    absolute
                                    left-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-zinc-400
                                    dark:text-zinc-500
                                "
                            />

                            <input
                                type="text"
                                value={query}
                                onChange={(event) =>
                                    setQuery(event.target.value)
                                }
                                placeholder="Search builds..."
                                aria-label="Search projects"
                                className="
                                    h-11
                                    w-full
                                    rounded-md
                                    border
                                    border-zinc-300
                                    bg-white
                                    pl-11
                                    pr-10
                                    text-sm
                                    text-zinc-900
                                    outline-none
                                    transition
                                    placeholder:text-zinc-400
                                    hover:border-zinc-400
                                    focus:border-teal-500
                                    focus:ring-2
                                    focus:ring-teal-500/20
                                    dark:border-zinc-800
                                    dark:bg-zinc-900
                                    dark:text-zinc-100
                                    dark:placeholder:text-zinc-600
                                    dark:hover:border-zinc-700
                                "
                            />

                            {query && (
                                <button
                                    type="button"
                                    onClick={() => setQuery("")}
                                    aria-label="Clear search"
                                    className="
                                        absolute
                                        right-3
                                        top-1/2
                                        -translate-y-1/2
                                        rounded
                                        p-1
                                        text-zinc-400
                                        transition
                                        hover:bg-zinc-100
                                        hover:text-zinc-700
                                        dark:hover:bg-zinc-800
                                        dark:hover:text-zinc-200
                                    "
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>

                        {/* Secondary filters */}

                        <div className="flex flex-col gap-3 sm:flex-row">
                            {/* Status */}

                            <div className="relative">
                                <label
                                    htmlFor="project-status"
                                    className="
                                        sr-only
                                    "
                                >
                                    Status
                                </label>

                                <select
                                    id="project-status"
                                    value={status}
                                    onChange={(event) =>
                                        setStatus(
                                            event.target.value as
                                                | ProjectStatus
                                                | "all"
                                        )
                                    }
                                    className="
                                        h-11
                                        w-full
                                        appearance-none
                                        rounded-md
                                        border
                                        border-zinc-300
                                        bg-white
                                        px-4
                                        pr-9
                                        text-sm
                                        text-zinc-700
                                        outline-none
                                        transition
                                        focus:border-teal-500
                                        focus:ring-2
                                        focus:ring-teal-500/20
                                        dark:border-zinc-800
                                        dark:bg-zinc-900
                                        dark:text-zinc-300
                                        sm:w-40
                                    "
                                >
                                    <option value="all">
                                        All Status
                                    </option>

                                    {statuses.map((item) => (
                                        <option
                                            key={item}
                                            value={item}
                                        >
                                            {formatEnums(item)}
                                        </option>
                                    ))}
                                </select>

                                <span
                                    className="
                                        pointer-events-none
                                        absolute
                                        right-3
                                        top-1/2
                                        -translate-y-1/2
                                        text-xs
                                        text-zinc-400
                                    "
                                >
                                    ▾
                                </span>
                            </div>

                            {/* Difficulty */}

                            <div className="relative">
                                <label
                                    htmlFor="project-difficulty"
                                    className="sr-only"
                                >
                                    Difficulty
                                </label>

                                <select
                                    id="project-difficulty"
                                    value={difficulty}
                                    onChange={(event) =>
                                        setDifficulty(
                                            event.target.value as
                                                | ProjectDifficulty
                                                | "all"
                                        )
                                    }
                                    className="
                                        h-11
                                        w-full
                                        appearance-none
                                        rounded-md
                                        border
                                        border-zinc-300
                                        bg-white
                                        px-4
                                        pr-9
                                        text-sm
                                        text-zinc-700
                                        outline-none
                                        transition
                                        focus:border-teal-500
                                        focus:ring-2
                                        focus:ring-teal-500/20
                                        dark:border-zinc-800
                                        dark:bg-zinc-900
                                        dark:text-zinc-300
                                        sm:w-40
                                    "
                                >
                                    <option value="all">
                                        All Difficulty
                                    </option>

                                    {difficulties.map((item) => (
                                        <option
                                            key={item}
                                            value={item}
                                        >
                                            {formatEnums(item)}
                                        </option>
                                    ))}
                                </select>

                                <span
                                    className="
                                        pointer-events-none
                                        absolute
                                        right-3
                                        top-1/2
                                        -translate-y-1/2
                                        text-xs
                                        text-zinc-400
                                    "
                                >
                                    ▾
                                </span>
                            </div>

                            {/* Reset */}

                            {hasActiveFilters && (
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="
                                        inline-flex
                                        h-11
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-md
                                        border
                                        border-zinc-300
                                        px-4
                                        text-sm
                                        font-medium
                                        text-zinc-600
                                        transition
                                        hover:border-zinc-400
                                        hover:bg-zinc-100
                                        hover:text-zinc-900
                                        dark:border-zinc-800
                                        dark:text-zinc-400
                                        dark:hover:border-zinc-700
                                        dark:hover:bg-zinc-900
                                        dark:hover:text-zinc-100
                                    "
                                >
                                    <X size={15} />
                                    Reset
                                </button>
                            )}
                        </div>
                    </div>

                    {/* ================================================== */}
                    {/* CATEGORY FILTERS                                   */}
                    {/* ================================================== */}

                    <div className="mt-5">
                        <div
                            className="
                                flex
                                gap-2
                                overflow-x-auto
                                pb-1
                                scrollbar-none
                            "
                        >
                            <button
                                type="button"
                                onClick={() => setCategory("all")}
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
                                        category === "all"
                                            ? `
                                                border-teal-500
                                                bg-teal-500/10
                                                text-teal-600
                                                dark:text-teal-400
                                            `
                                            : `
                                                border-zinc-300
                                                bg-transparent
                                                text-zinc-600
                                                hover:border-zinc-400
                                                hover:text-zinc-900
                                                dark:border-zinc-800
                                                dark:text-zinc-400
                                                dark:hover:border-zinc-700
                                                dark:hover:text-zinc-200
                                            `
                                    }
                                `}
                            >
                                All
                            </button>

                            {categories.map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => setCategory(item)}
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
                                            category === item
                                                ? `
                                                    border-teal-500
                                                    bg-teal-500/10
                                                    text-teal-600
                                                    dark:text-teal-400
                                                `
                                                : `
                                                    border-zinc-300
                                                    bg-transparent
                                                    text-zinc-600
                                                    hover:border-zinc-400
                                                    hover:text-zinc-900
                                                    dark:border-zinc-800
                                                    dark:text-zinc-400
                                                    dark:hover:border-zinc-700
                                                    dark:hover:text-zinc-200
                                                `
                                        }
                                    `}
                                >
                                    {formatEnums(item)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ================================================== */}
                {/* RESULT COUNT                                       */}
                {/* ================================================== */}

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        border-b
                        border-zinc-200
                        py-4
                        dark:border-zinc-800
                    "
                >
                    <p
                        className="
                            font-mono
                            text-xs
                            text-zinc-500
                            dark:text-zinc-500
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
                            {filteredProjects.length}
                        </span>{" "}
                        PROJECT
                        {filteredProjects.length !== 1 ? "S" : ""}
                    </p>

                    {hasActiveFilters && (
                        <div
                            className="
                                hidden
                                items-center
                                gap-2
                                text-xs
                                text-zinc-500
                                sm:flex
                            "
                        >
                            <SlidersHorizontal size={14} />
                            Filters active
                        </div>
                    )}
                </div>

                {/* ================================================== */}
                {/* PROJECTS                                            */}
                {/* ================================================== */}

                <div className="mt-6 grid gap-8">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                            <div
                                key={project.id}
                                className="relative"
                            >
                                <ProjectCard
                                    project={project}
                                    variant="full"
                                />

                                {isAdmin && (
                                    <div
                                        className="
                                            relative
                                            z-20
                                            mt-4
                                            flex
                                            flex-wrap
                                            gap-3
                                        "
                                    >
                                        <Link
                                            href={`/admin/projects/${project.slug}/edit`}
                                            className="
                                                rounded-md
                                                border
                                                border-teal-500
                                                px-5
                                                py-2
                                                text-sm
                                                font-medium
                                                text-teal-600
                                                transition
                                                hover:bg-teal-500
                                                hover:text-zinc-950
                                                dark:text-teal-400
                                            "
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setProjectToDelete(
                                                    project.slug
                                                )
                                            }
                                            className="
                                                rounded-md
                                                border
                                                border-red-500/60
                                                px-5
                                                py-2
                                                text-sm
                                                font-medium
                                                text-red-600
                                                transition
                                                hover:bg-red-500
                                                hover:text-white
                                                dark:text-red-400
                                            "
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div
                            className="
                                rounded-md
                                border
                                border-dashed
                                border-zinc-300
                                px-6
                                py-20
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
                                No projects found
                            </h2>

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    text-zinc-500
                                    dark:text-zinc-500
                                "
                            >
                                Try changing the search or filter options.
                            </p>

                            {hasActiveFilters && (
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="
                                        mt-5
                                        rounded-md
                                        bg-teal-500
                                        px-5
                                        py-2
                                        text-sm
                                        font-semibold
                                        text-zinc-950
                                        transition
                                        hover:bg-teal-400
                                    "
                                >
                                    Clear Filters
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* ====================================================== */}
            {/* DELETE CONFIRMATION                                    */}
            {/* ====================================================== */}

            {projectToDelete && (
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
                                text-zinc-950
                                dark:text-zinc-100
                            "
                        >
                            Delete Project?
                        </h2>

                        <p
                            className="
                                mt-3
                                text-sm
                                leading-6
                                text-zinc-600
                                dark:text-zinc-400
                            "
                        >
                            This action cannot be undone.
                        </p>

                        <div className="mt-8 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() =>
                                    setProjectToDelete(null)
                                }
                                disabled={isDeleting}
                                className="
                                    rounded-md
                                    border
                                    border-zinc-300
                                    px-5
                                    py-2
                                    text-sm
                                    font-medium
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
                                {isDeleting
                                    ? "Deleting..."
                                    : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ====================================================== */}
            {/* RESULT DIALOG                                         */}
            {/* ====================================================== */}

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
                                text-zinc-950
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
                                leading-6
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

