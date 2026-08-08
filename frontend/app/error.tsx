"use client";

import { useEffect } from "react";
import { PiWarningCircle } from "react-icons/pi";

export default function Error({
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
        <section className="flex min-h-screen items-center justify-center bg-zinc-950 px-6">
            <div className="w-full max-w-xl rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center shadow-xl">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
                    <PiWarningCircle className="text-3xl" />
                </div>

                <h1 className="mt-6 text-3xl font-bold text-white">
                    Something went wrong
                </h1>

                <p className="mt-3 text-zinc-400">
                    An unexpected error occurred while processing your request.
                </p>

                {process.env.NODE_ENV === "development" && (
                    <pre className="mt-6 overflow-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-left text-sm text-red-400">
                        {error.message}
                    </pre>
                )}

                <div className="mt-8 flex justify-center gap-4">

                    <button
                        onClick={reset}
                        className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-500"
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
    );
}