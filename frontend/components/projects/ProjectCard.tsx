import Link from "next/link";
import Image from "next/image";

import { Project } from "@/types/project";
import { formatEnums } from "@/utils/Utility";
import { EyeIcon } from "lucide-react";

export default function ProjectCard({
    project,
    variant = "compact",
    showDescription = true,
}: {
    project: Project;
    variant?: "compact" | "full";
    showDescription?: boolean;
}) {
    const compact = variant === "compact";

    const technologies = compact
        ? project.technologies.slice(0, 4)
        : project.technologies;

    const remainingTechnologies =
        project.technologies.length - technologies.length;

    const statusDot =
        project.status === "Completed"
            ? "bg-teal-500"
            : project.status === "InProgress"
                ? "bg-amber-500"
                : "bg-blue-500";

    return (
        <article
            className={`
                group
                overflow-hidden
                rounded-lg
                border
                border-zinc-200
                bg-white
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-teal-500/50
                hover:shadow-lg
                hover:shadow-teal-500/5
                dark:border-zinc-800
                dark:bg-zinc-900
                dark:hover:border-teal-500/50
                dark:hover:shadow-teal-500/10
                ${compact ? "flex h-full flex-col" : ""}
            `}
        >
            <Link
                href={`/projects/${project.slug}`}
                className={compact ? "flex h-full flex-col" : "block"}
            >
                {/* ------------------------------------------------ */}
                {/* IMAGE                                            */}
                {/* ------------------------------------------------ */}

                <div
                    className="
                        relative
                        aspect-video
                        overflow-hidden
                        border-b
                        border-zinc-200
                        bg-zinc-100
                        dark:border-zinc-800
                        dark:bg-zinc-950
                    "
                >
                    {project.thumbnail ? (
                        <Image
                            src={project.thumbnail}
                            alt={project.title}
                            fill
                            unoptimized
                            className="
                                object-cover
                                transition-transform
                                duration-500
                                group-hover:scale-105
                            "
                            sizes="
                                (max-width: 640px) 100vw,
                                (max-width: 1024px) 50vw,
                                33vw
                            "
                        />
                    ) : (
                        <div
                            className="
                                flex
                                h-full
                                items-center
                                justify-center
                                font-mono
                                text-sm
                                text-zinc-500
                            "
                        >
                            No Thumbnail
                        </div>
                    )}

                    {/* Terminal-style status overlay */}

                    {compact && (
                        <div
                            className="
                                absolute
                                left-4
                                top-4
                                font-mono
                                text-xs
                                text-teal-600
                                dark:text-teal-400
                            "
                        >
                            [ SYS_STATUS: OK ]
                        </div>
                    )}
                </div>

                {/* ------------------------------------------------ */}
                {/* CONTENT                                          */}
                {/* ------------------------------------------------ */}

                <div
                    className={`
                        p-5
                        sm:p-6
                        ${compact ? "flex flex-1 flex-col" : ""}
                    `}
                >
                    {/* Category + Status */}

                    <div className="flex items-center justify-between gap-4">
                        <span
                            className="
                                text-xs
                                font-medium
                                uppercase
                                tracking-[0.16em]
                                text-teal-600
                                dark:text-teal-400
                            "
                        >
                            {formatEnums(project.category)}
                        </span>

                        <span
                            className="
                                flex
                                shrink-0
                                items-center
                                gap-2
                                font-mono
                                text-xs
                                text-zinc-500
                                dark:text-zinc-400
                            "
                        >
                            <span
                                className={`
                                    h-2
                                    w-2
                                    rounded-full
                                    ${statusDot}
                                `}
                            />

                            {formatEnums(project.status)}
                        </span>
                    </div>

                    {/* Title */}

                    <h3
                        className={`
                            mt-4
                            font-bold
                            tracking-tight
                            text-zinc-900
                            transition-colors
                            group-hover:text-teal-600
                            dark:text-zinc-100
                            dark:group-hover:text-teal-400
                            ${
                                compact
                                    ? "line-clamp-2 min-h-[3.5rem] text-xl sm:text-2xl"
                                    : "text-2xl sm:text-3xl"
                            }
                        `}
                    >
                        {project.title}
                    </h3>

                    {/* Description */}

                    {showDescription && (
                        <p
                            className={`
                                mt-3
                                text-zinc-600
                                dark:text-zinc-400
                                ${
                                    compact
                                        ? "line-clamp-2 min-h-[3rem] leading-6"
                                        : "leading-7"
                                }
                            `}
                        >
                            {project.shortDescription}
                        </p>
                    )}

                    {/* Technologies */}

                    <div
                        className={`
                            mt-5
                            flex
                            flex-wrap
                            gap-2
                            ${
                                compact
                                    ? "min-h-[2rem] max-h-[4rem] overflow-hidden"
                                    : ""
                            }
                        `}
                    >
                        {technologies.map((tech) => (
                            <span
                                key={tech}
                                className="
                                    rounded-md
                                    border
                                    border-zinc-200
                                    bg-zinc-50
                                    px-2.5
                                    py-1
                                    font-mono
                                    text-xs
                                    text-zinc-600
                                    transition-colors
                                    group-hover:border-zinc-300
                                    dark:border-zinc-700
                                    dark:bg-zinc-950
                                    dark:text-zinc-400
                                    dark:group-hover:border-zinc-600
                                "
                            >
                                {tech}
                            </span>
                        ))}

                        {compact && remainingTechnologies > 0 && (
                            <span
                                className="
                                    rounded-md
                                    border
                                    border-teal-500/20
                                    bg-teal-500/5
                                    px-2.5
                                    py-1
                                    font-mono
                                    text-xs
                                    text-teal-600
                                    dark:text-teal-400
                                "
                            >
                                +{remainingTechnologies}
                            </span>
                        )}
                    </div>

                    {/* Push footer to bottom for compact cards */}

                    {compact && <div className="flex-1" />}

                    {/* ------------------------------------------------ */}
                    {/* FOOTER                                           */}
                    {/* ------------------------------------------------ */}

                    <div
                        className="
                            mt-6
                            border-t
                            border-zinc-200
                            pt-4
                            dark:border-zinc-800
                        "
                    >
                        <div className="flex items-center justify-between gap-4">
                            {/* Difficulty for full cards */}

                            {!compact ? (
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`
                                            rounded-md
                                            border
                                            px-2.5
                                            py-1
                                            font-mono
                                            text-xs
                                            ${
                                                project.status === "Completed"
                                                    ? "border-teal-500/20 bg-teal-500/5 text-teal-600 dark:text-teal-400"
                                                    : project.status ===
                                                        "InProgress"
                                                        ? "border-amber-500/20 bg-amber-500/5 text-amber-600 dark:text-amber-400"
                                                        : "border-blue-500/20 bg-blue-500/5 text-blue-600 dark:text-blue-400"
                                            }
                                        `}
                                    >
                                        {formatEnums(project.status)}
                                    </span>

                                    <span
                                        className="
                                            font-mono
                                            text-xs
                                            text-zinc-500
                                        "
                                    >
                                        {formatEnums(project.difficulty)}
                                    </span>
                                </div>
                            ) : (
                                <div />
                            )}

                            {/* View Count */}

                            <span
                                className="
                                    flex
                                    shrink-0
                                    items-center
                                    gap-1.5
                                    font-mono
                                    text-xs
                                    text-zinc-500
                                "
                            >
                                <EyeIcon className="h-3.5 w-3.5" />
                                {project.viewCount}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </article>
    );
}

