"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FolderGit2, NotebookPen } from "lucide-react";

export default function Page() {
    const router = useRouter();

    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (!storedToken) {
            router.push("/admin/login");
            return;
        }

        setToken(storedToken);
    }, [router]);

    if (token === null) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 dark:bg-zinc-950">
                <div className="text-center">

                    <div className="
                        mx-auto
                        h-2
                        w-2
                        animate-pulse
                        rounded-full
                        bg-teal-500"
                    >

                    <p className="
                        mt-4
                        font-mono
                        text-xs
                        text-zinc-500
                    ">
                        AUTHENTICATING...
                    </p>

                </div>
                </div>
            </main>
        );
    }

    return (
        <main className="
            min-h-screen
            bg-white
            text-zinc-900
            dark:bg-zinc-950
            dark:text-zinc-100
        ">
            <section className="
                mx-auto
                max-w-7xl
                px-5
                py-16
                sm:px-6
                sm:py-20
                lg:px-10
                lg:py-24
            ">

                {/* Header */}
                <div>

                    <div className="
                        flex
                        items-center
                        gap-2
                        font-mono
                        text-xs
                        text-teal-600
                        dark:text-teal-400
                    ">
                        <span className="text-teal-600 dark:text-teal-400">
    ADMIN PANEL
</span>
                        <span className="text-zinc-400 dark:text-zinc-600">
    //
</span>

<span className="text-teal-600 dark:text-teal-400">
    AUTHENTICATED
</span>
                    </div>

                    <h1 className="
                        mt-6
                        text-4xl
                        font-bold
                        tracking-tight
                        text-zinc-950
                        sm:text-5xl
                        dark:text-zinc-100
                    ">
                        Admin Dashboard
                    </h1>

                    <p className="
                        mt-4
                        max-w-2xl
                        text-base
                        leading-7
                        text-zinc-600
                        sm:text-lg
                        dark:text-zinc-400
                    ">
                        Manage engineering projects and developer journals
                        from a single place.
                    </p>

                </div>

                {/* Divider */}
                <div className="
                    my-10
                    h-px
                    bg-zinc-200
                    dark:bg-zinc-800
                " />

                {/* Management cards */}
                <div className="grid gap-6 lg:grid-cols-2">

                    {/* Projects */}
                    <div className="
                        group
                        border
                        border-zinc-200
                        bg-zinc-50
                        p-6
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:border-teal-500/50
                        hover:shadow-xl
                        hover:shadow-teal-500/5
                        sm:p-8
                        dark:border-zinc-800
                        dark:bg-zinc-900/50
                    ">

                        <div className="
                            flex
                            flex-col
                            gap-5
                            sm:flex-row
                            sm:items-start
                        ">

                            <div className="
                                flex
                                h-14
                                w-14
                                shrink-0
                                items-center
                                justify-center
                                border
                                border-teal-500/20
                                bg-teal-500/10
                                text-teal-600
                                dark:text-teal-400
                            ">
                                <FolderGit2 size={27} />
                            </div>

                            <div>
                                <h2 className="
                                    text-2xl
                                    font-semibold
                                    text-zinc-950
                                    dark:text-zinc-100
                                ">
                                    Projects
                                </h2>

                                <p className="
                                    mt-2
                                    max-w-md
                                    leading-7
                                    text-zinc-600
                                    dark:text-zinc-400
                                ">
                                    Create, edit and organize engineering
                                    projects.
                                </p>
                            </div>

                        </div>

                        <div className="
                            mt-8
                            flex
                            items-center
                            justify-between
                            border-t
                            border-zinc-200
                            pt-5
                            dark:border-zinc-800
                        ">

                            <span className="
                                font-mono
                                text-xs
                                text-zinc-400
                                dark:text-zinc-600
                            ">
                                /projects
                            </span>

                            <Link
                                href="/admin/projects"
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    border
                                    border-teal-500
                                    bg-teal-500
                                    px-5
                                    py-2.5
                                    text-sm
                                    font-semibold
                                    text-zinc-950
                                    transition-colors
                                    hover:bg-teal-400
                                "
                            >
                                Manage →
                            </Link>

                        </div>

                    </div>

                    {/* Journals */}
                    <div className="
                        group
                        border
                        border-zinc-200
                        bg-zinc-50
                        p-6
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:border-teal-500/50
                        hover:shadow-xl
                        hover:shadow-teal-500/5
                        sm:p-8
                        dark:border-zinc-800
                        dark:bg-zinc-900/50
                    ">

                        <div className="
                            flex
                            flex-col
                            gap-5
                            sm:flex-row
                            sm:items-start
                        ">

                            <div className="
                                flex
                                h-14
                                w-14
                                shrink-0
                                items-center
                                justify-center
                                border
                                border-teal-500/20
                                bg-teal-500/10
                                text-teal-600
                                dark:text-teal-400
                            ">
                                <NotebookPen size={27} />
                            </div>

                            <div>
                                <h2 className="
                                    text-2xl
                                    font-semibold
                                    text-zinc-950
                                    dark:text-zinc-100
                                ">
                                    Journals
                                </h2>

                                <p className="
                                    mt-2
                                    max-w-md
                                    leading-7
                                    text-zinc-600
                                    dark:text-zinc-400
                                ">
                                    Write and manage engineering journal
                                    entries.
                                </p>
                            </div>

                        </div>

                        <div className="
                            mt-8
                            flex
                            items-center
                            justify-between
                            border-t
                            border-zinc-200
                            pt-5
                            dark:border-zinc-800
                        ">

                            <span className="
                                font-mono
                                text-xs
                                text-zinc-400
                                dark:text-zinc-600
                            ">
                                /journal
                            </span>

                            <Link
                                href="/admin/journals"
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    border
                                    border-teal-500
                                    bg-teal-500
                                    px-5
                                    py-2.5
                                    text-sm
                                    font-semibold
                                    text-zinc-950
                                    transition-colors
                                    hover:bg-teal-400
                                "
                            >
                                Manage →
                            </Link>

                        </div>

                    </div>

                </div>

            </section>
        </main>
    );
}

