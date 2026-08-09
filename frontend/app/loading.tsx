export default function Loading() {
    return (
        <main className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
            <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">

                {/* Header skeleton */}
                <div className="animate-pulse">

                    <div className="h-3 w-40 bg-zinc-200 dark:bg-zinc-800" />

                    <div className="mt-6 h-10 w-72 bg-zinc-200 sm:h-12 sm:w-96 dark:bg-zinc-800" />

                    <div className="mt-4 h-5 w-full max-w-2xl bg-zinc-200 dark:bg-zinc-800" />
                    <div className="mt-2 h-5 w-4/5 max-w-xl bg-zinc-200 dark:bg-zinc-800" />

                    {/* Filters / controls */}
                    <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div className="flex flex-wrap gap-2">
                            {[72, 96, 112, 80, 88].map((width, index) => (
                                <div
                                    key={index}
                                    className="h-10 bg-zinc-200 dark:bg-zinc-800"
                                    style={{ width }}
                                />
                            ))}
                        </div>

                        <div className="h-10 w-full max-w-sm bg-zinc-200 dark:bg-zinc-800" />

                    </div>

                </div>

                {/* Journal skeletons */}
                <div className="mt-10 space-y-0 animate-pulse">

                    {[...Array(4)].map((_, index) => (
                        <article
                            key={index}
                            className="
                                border-b
                                border-zinc-200
                                py-7
                                first:border-t
                                dark:border-zinc-800
                            "
                        >
                            <div className="
                                grid
                                gap-5
                                sm:grid-cols-[130px_1fr_auto]
                                sm:items-center
                            ">

                                {/* Date */}
                                <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800" />

                                {/* Content */}
                                <div>
                                    <div className="h-6 w-3/4 max-w-xl bg-zinc-200 dark:bg-zinc-800" />

                                    <div className="mt-3 h-4 w-full max-w-2xl bg-zinc-200 dark:bg-zinc-800" />
                                    <div className="mt-2 h-4 w-4/5 max-w-xl bg-zinc-200 dark:bg-zinc-800" />

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <div className="h-6 w-20 bg-zinc-200 dark:bg-zinc-800" />
                                        <div className="h-6 w-24 bg-zinc-200 dark:bg-zinc-800" />
                                        <div className="h-6 w-16 bg-zinc-200 dark:bg-zinc-800" />
                                    </div>
                                </div>

                                {/* Metadata */}
                                <div className="flex gap-3 sm:flex-col sm:items-end">
                                    <div className="h-6 w-20 bg-zinc-200 dark:bg-zinc-800" />
                                    <div className="h-4 w-16 bg-zinc-200 dark:bg-zinc-800" />
                                </div>

                            </div>
                        </article>
                    ))}

                </div>

            </section>
        </main>
    );
}

