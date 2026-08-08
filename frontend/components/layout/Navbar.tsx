"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { WEBSITE_NAME } from "@/utils/Utility";

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();

    const [token, setToken] = useState<string | null>(null);

    const navLinkStyle =
        "text-zinc-400 transition-colors hover:text-white py-2";

    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, [pathname]);

    function logout() {
        localStorage.removeItem("token");
        setToken(null);

        window.location.href = "/";
    }

    return (
        <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

                <Link
                    href="/"
                    className="text-xl font-bold tracking-wide text-white transition-colors hover:text-zinc-300"
                >
                    {WEBSITE_NAME}
                </Link>

                <div className="flex items-center gap-8">

                    <Link
                        href="/projects"
                        className={navLinkStyle}
                    >
                        Projects
                    </Link>

                    <Link
                        href="/journal"
                        className={navLinkStyle}
                    >
                        Journal
                    </Link>

                    <Link
                        href="/about"
                        className={navLinkStyle}
                    >
                        About
                    </Link>

                    {token && (
                        <button
                            onClick={logout}
                            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                        >
                            Logout
                        </button>
                    )}

                </div>

            </div>
        </nav>
    );
}