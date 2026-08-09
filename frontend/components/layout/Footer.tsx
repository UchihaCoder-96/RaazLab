import Link from "next/link";
import { HeartCrack } from "lucide-react";

import { WEBSITE_NAME } from "@/utils/Utility";

export default function Footer() {
    return (
        <footer
            className="
                border-t
                border-zinc-200
                bg-zinc-50
                text-zinc-500
                transition-colors

                dark:border-zinc-800
                dark:bg-zinc-950
                dark:text-zinc-500
            "
        >
            <div
                className="
                    mx-auto
                    max-w-[1400px]
                    px-6
                    py-14
                    lg:px-16
                "
            >

                {/* TOP ROW */}

                <div
                    className="
                        flex
                        flex-col
                        gap-8
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >

                    {/* Brand */}

                    <div>
                        <div className="flex items-center gap-3">
                            <h2
                                className="
                                    text-base
                                    font-semibold
                                    text-zinc-900
                                    dark:text-zinc-100
                                "
                            >
                                {WEBSITE_NAME}
                            </h2>

                            <span className="font-mono text-zinc-300 dark:text-zinc-700">
                                //
                            </span>

                            <span
                                className="
                                    font-mono
                                    text-sm
                                    text-zinc-500
                                    dark:text-zinc-600
                                "
                            >
                                engineering.experiments.documented.
                            </span>
                        </div>
                    </div>


                    {/* Navigation */}

                    <nav className="flex flex-wrap gap-x-7 gap-y-2">
                        <Link
                            href="/"
                            className="
                                font-mono
                                text-sm
                                transition-colors
                                hover:text-teal-600
                                dark:hover:text-teal-400
                            "
                        >
                            home
                        </Link>

                        <Link
                            href="/projects"
                            className="
                                font-mono
                                text-sm
                                transition-colors
                                hover:text-teal-600
                                dark:hover:text-teal-400
                            "
                        >
                            projects
                        </Link>

                        <Link
                            href="/journal"
                            className="
                                font-mono
                                text-sm
                                transition-colors
                                hover:text-teal-600
                                dark:hover:text-teal-400
                            "
                        >
                            journal
                        </Link>

                        <Link
                            href="/about"
                            className="
                                font-mono
                                text-sm
                                transition-colors
                                hover:text-teal-600
                                dark:hover:text-teal-400
                            "
                        >
                            about
                        </Link>
                    </nav>

                </div>


                {/* DIVIDER */}

                <div
                    className="
                        my-8
                        border-t
                        border-zinc-200
                        dark:border-zinc-800
                    "
                />


                {/* BOTTOM ROW */}

                <div
                    className="
                        flex
                        flex-col
                        gap-4
                        font-mono
                        text-xs
                        text-zinc-500

                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >

                    {/* Copyright */}

                    <p>
                        &copy; {new Date().getFullYear()} {WEBSITE_NAME}. All rights reserved.
                    </p>


                    {/* Built with */}

                    <p className="flex items-center gap-1.5">
                        <span>
                            Built with Next.js, React & Tailwind CSS.
                            {" "} (and a few headaches)
                        </span>

                        <HeartCrack
                            className="
                                h-4
                                w-4
                                shrink-0
                                text-red-500
                            "
                        />
                    </p>

                </div>

            </div>
        </footer>
    );
}

