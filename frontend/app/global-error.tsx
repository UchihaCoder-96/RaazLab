"use client";

import { WEBSITE_NAME } from "@/utils/Utility";
import { useEffect } from "react";
import { BiErrorCircle } from "react-icons/bi";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <html lang="en">
            <body className="bg-zinc-950 text-white">

                <section className="flex min-h-screen items-center justify-center px-6">

                    <div className="w-full max-w-xl rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center shadow-xl">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
                            <BiErrorCircle className="text-3xl" />
                        </div>

                        <h1 className="mt-6 text-3xl font-bold">
                            Fatal Application Error
                        </h1>

                        <p className="mt-3 text-zinc-400">
                            {WEBSITE_NAME} encountered a critical error and couldn't continue.
                        </p>

                        {process.env.NODE_ENV === "development" && (
                            <pre className="mt-6 overflow-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-left text-sm text-red-400">
                                {error.message}
                            </pre>
                        )}

                        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

                            <button
                                onClick={() => reset()}
                                className="rounded-xl bg-blue-600 px-6 py-3 font-medium transition hover:bg-blue-500"
                            >
                                Try Again
                            </button>

                            <button
                                onClick={() => window.location.href = "/"}
                                className="rounded-xl border border-zinc-700 px-6 py-3 font-medium text-zinc-300 transition hover:border-zinc-600 hover:bg-zinc-800"
                            >
                                Go Home
                            </button>

                        </div>

                    </div>

                </section>

            </body>
        </html>
    );
}