import Link from "next/link";
import { HeartCrack } from "lucide-react";
import { WEBSITE_NAME } from "@/utils/Utility";

export default function Footer() {
    return (
        <footer className="border-t border-zinc-800 bg-zinc-950">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-zinc-400 md:flex-row">

                <div>
                    <h2 className="text-lg font-semibold text-white">
                        {WEBSITE_NAME}
                    </h2>

                    <p className="mt-1">
                        Documenting projects, experiments and the journey of learning new things.
                    </p>
                </div>

                <nav className="flex gap-6">
                    <Link
                        href="/"
                        className="transition-colors hover:text-white"
                    >
                        Home
                    </Link>

                    <Link
                        href="/projects"
                        className="transition-colors hover:text-white"
                    >
                        Projects
                    </Link>

                    <Link
                        href="/journal"
                        className="transition-colors hover:text-white"
                    >
                        Journal
                    </Link>

                    <Link
                        href="/about"
                        className="transition-colors hover:text-white"
                    >
                        About
                    </Link>
                </nav>
            </div>

            <div className="border-t border-zinc-800">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-xs text-zinc-500">

                    <p>
                        &copy; {new Date().getFullYear()} {WEBSITE_NAME}. All rights reserved.
                    </p>

                    <p>
                        Built with Next.js, React & Tailwind CSS. (and a few headaches) <HeartCrack className="inline h-4 w-4 text-red-500" />
                    </p>

                </div>
            </div>
        </footer>
    );
}
