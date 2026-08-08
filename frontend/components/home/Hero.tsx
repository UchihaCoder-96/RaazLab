import Link from "next/link";
import { WEBSITE_NAME } from "@/utils/Utility";

const navLinkStyle = "text-zinc-400 hover:text-white transition-colors";

export default function Hero() {
    return (
        <section className="bg-zinc-950 text-white">
            <div className="mx-auto max-w-6xl px-6 py-32 text-center">
                <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
                    {WEBSITE_NAME}
                </h1>
                <p className="mt-4 text-lg text-zinc-300">
                    Build. Learn. Document. Improve.
                </p>
                <p className="mt-4 text-lg text-zinc-400">
                    A public engineering notebook where I document everything I build, break, fix, and learn.
                </p>
                <Link
                    href="/projects"
                    className="mt-8 inline-block rounded bg-blue-600 px-6 py-3 text-lg font-semibold text-white hover:bg-blue-700 transition-colors"
                >
                    View Projects
                </Link>
                <Link
                    href="/journal"
                    className="mt-8 ml-4 inline-block rounded border border-blue-600 px-6 py-3 text-lg font-semibold text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                >
                    Read Journal
                </Link>
            </div>
        </section>
    );
}
