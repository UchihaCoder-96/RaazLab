"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import TextField from "@/components/form/TextField";
import { login } from "@/lib/auth";
import Dialog from "@/components/ui/Dialog";
import { WEBSITE_VERSION } from "@/utils/Utility";

export default function Page() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogMessage, setDialogMessage] = useState("");

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await login(username, password);

            if (!response.ok) {
                setDialogTitle("Login Failed");
                setDialogMessage("Invalid username or password.");
                setDialogOpen(true);
                return;
            }

            const data = await response.json();
            localStorage.setItem("token", data.token);
            console.log("Token stored in localStorage:", localStorage.getItem("token"));

            router.push("/admin");
        } catch (error) {
            console.error(error);

            setDialogTitle("Connection Error");
            setDialogMessage("Unable to connect to the server.");
            setDialogOpen(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <section className="flex min-h-screen items-center justify-center bg-zinc-100 px-4 py-12 transition-colors sm:px-6 lg:px-8 dark:bg-[#0c0d0f]">
                <div className="w-full max-w-md rounded-[5px] border border-zinc-200 bg-white p-6 shadow-xl sm:p-10 dark:border-zinc-800/80 dark:bg-[#121316]">

                    {/* Logo Badge */}
                    <div className="flex justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-[5px] border border-teal-500/30 bg-teal-500/10 text-teal-600 dark:border-teal-500/40 dark:bg-teal-500/10 dark:text-teal-400">
                            <span className="font-mono text-sm font-bold">RL</span>
                        </div>
                    </div>

                    {/* Titles matching Figma image */}
                    <div className="mt-6 text-center">
                        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
                            RaazLab Admin
                        </h1>

                        <p className="mt-2 font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                            SECURE_GATEWAY_v{WEBSITE_VERSION}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="mt-8 space-y-6">
                        <div className="space-y-1">
                            <label className="block font-mono text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                OPERATOR_EMAIL
                            </label>
                            <TextField
                                label=""
                                value={username}
                                onChange={setUsername}
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="block font-mono text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                CRYPTOGRAPHIC_PASSKEY
                            </label>
                            <TextField
                                label=""
                                type="password"
                                value={password}
                                onChange={setPassword}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-[5px] bg-teal-500 py-3.5 text-sm font-semibold text-zinc-950 transition hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#00b894] dark:text-zinc-950 dark:hover:bg-[#00a383] dark:focus:ring-teal-500 dark:focus:ring-offset-zinc-900"
                        >
                            {loading ? "Signing in..." : "Sign In to Laboratory"}
                        </button>

                        <div className="text-center">
                            <button
                                type="button"
                                className="font-mono text-xs text-zinc-500 underline underline-offset-4 transition hover:text-zinc-800 dark:text-zinc-500 dark:hover:text-zinc-300"
                            >
                                Forgot security passkey?
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            <Dialog
                open={dialogOpen}
                title={dialogTitle}
                message={dialogMessage}
                onClose={() => setDialogOpen(false)}
            />
        </>
    );
}

