import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
            <section className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-5 py-20 sm:px-6 lg:px-10">

                <div className="w-full max-w-2xl text-center">

                    {/* Status */}
                    <div className="mb-6 flex items-center justify-center gap-2 font-mono text-xs text-teal-600 dark:text-teal-400">
                        <span className="h-2 w-2 rounded-full bg-teal-500 dark:bg-teal-400" />
                        <span>SYS_STATUS</span>
                        <span className="text-zinc-400 dark:text-zinc-600">
                            //
                        </span>
                        <span>RESOURCE_NOT_FOUND</span>
                    </div>

                    {/* Error code */}
                    <div className="
                        mx-auto
                        flex
                        h-28
                        w-28
                        items-center
                        justify-center
                        border
                        border-zinc-200
                        bg-zinc-50
                        dark:border-zinc-800
                        dark:bg-zinc-900/50
                    ">
                        <span className="
                            font-mono
                            text-3xl
                            font-bold
                            text-teal-600
                            dark:text-teal-400
                        ">
                            404
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="
                        mt-8
                        text-4xl
                        font-bold
                        tracking-tight
                        text-zinc-950
                        sm:text-5xl
                        dark:text-zinc-100
                    ">
                        Page Not Found
                    </h1>

                    <p className="
                        mx-auto
                        mt-4
                        max-w-lg
                        text-base
                        leading-7
                        text-zinc-600
                        sm:text-lg
                        dark:text-zinc-400
                    ">
                        The requested resource could not be located.
                        It may have been moved, removed, or never existed.
                    </p>

                    {/* Terminal-style diagnostic */}
                    <div className="
                        mx-auto
                        mt-8
                        max-w-xl
                        overflow-hidden
                        border
                        border-zinc-200
                        bg-zinc-50
                        text-left
                        dark:border-zinc-800
                        dark:bg-zinc-900/60
                    ">
                        <div className="
                            flex
                            h-9
                            items-center
                            justify-between
                            border-b
                            border-zinc-200
                            px-4
                            dark:border-zinc-800
                        ">
                            <div className="flex items-center gap-1.5">
                                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                            </div>

                            <span className="font-mono text-[11px] text-zinc-500">
                                request.log
                            </span>
                        </div>

                        <div className="
                            space-y-2
                            p-4
                            font-mono
                            text-xs
                            leading-6
                            sm:p-5
                            sm:text-sm
                        ">
                            <p className="text-zinc-500">
                                $ resolve requested_resource
                            </p>

                            <p className="text-red-500 dark:text-red-400">
                                &gt; ERROR: resource returned HTTP 404
                            </p>

                            <p className="text-zinc-500">
                                [!] No matching route found.
                            </p>

                            <p className="text-teal-600 dark:text-teal-400">
                                [i] Returning to safe navigation.
                            </p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="
                        mt-8
                        flex
                        flex-col
                        gap-3
                        sm:flex-row
                        sm:justify-center
                    ">
                        <Link
                            href="/"
                            className="
                                flex
                                min-h-12
                                items-center
                                justify-center
                                border
                                border-teal-500
                                bg-teal-500
                                px-6
                                font-semibold
                                text-zinc-950
                                transition-colors
                                hover:bg-teal-400
                                focus:outline-none
                                focus:ring-2
                                focus:ring-teal-500
                                focus:ring-offset-2
                                focus:ring-offset-white
                                dark:focus:ring-offset-zinc-950
                            "
                        >
                            Return Home
                        </Link>

                        <Link
                            href="/projects"
                            className="
                                flex
                                min-h-12
                                items-center
                                justify-center
                                border
                                border-zinc-200
                                bg-white
                                px-6
                                font-mono
                                text-sm
                                text-zinc-700
                                transition-colors
                                hover:border-zinc-400
                                hover:bg-zinc-50
                                dark:border-zinc-800
                                dark:bg-zinc-950
                                dark:text-zinc-300
                                dark:hover:border-zinc-600
                                dark:hover:bg-zinc-900
                            "
                        >
                            Browse Projects
                        </Link>
                    </div>

                    {/* Footer status */}
                    <p className="
                        mt-8
                        font-mono
                        text-[11px]
                        text-zinc-400
                        dark:text-zinc-600
                    ">
                        R_LABS // NAVIGATION_RECOVERY
                    </p>

                </div>

            </section>
        </main>
    );
}

