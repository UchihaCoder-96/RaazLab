import Link from "next/link";
import { WEBSITE_AUTHOR, WEBSITE_NAME } from "@/utils/Utility";

export default function Hero() {
    return (
        <section
            className="
                bg-white
                text-zinc-900
                dark:bg-zinc-950
                dark:text-zinc-100
            "
        >
            <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-10 lg:py-28">

                {/* Status */}
                <div
                    className="
                        mb-8
                        flex
                        flex-wrap
                        items-center
                        gap-2
                        font-mono
                        text-xs
                        text-teal-600
                        sm:mb-10
                        sm:text-sm
                        dark:text-teal-400
                    "
                >
                    <span
                        className="
                            h-2.5
                            w-2.5
                            shrink-0
                            rounded-full
                            bg-teal-500
                            dark:bg-teal-400
                        "
                    />

                    <span>R_LABS</span>

                    <span className="text-zinc-400 dark:text-zinc-600">
                        //
                    </span>

                    <span>OPERATIONAL</span>
                </div>


                {/* Main content */}
                <div
                    className="
                        grid
                        items-center
                        gap-12
                        lg:grid-cols-[1.05fr_0.95fr]
                        lg:gap-16
                    "
                >

                    {/* Left side */}
                    <div>

                        {/* Heading */}
                        <h1
                            className="
                                max-w-4xl
                                text-4xl
                                font-bold
                                leading-[1.08]
                                tracking-tight
                                text-zinc-900
                                sm:text-5xl
                                md:text-6xl
                                lg:text-7xl
                                dark:text-zinc-100
                            "
                        >
                            Engineering experiments,
                            <br />
                            documented.
                        </h1>


                        {/* Description */}
                        <p
                            className="
                                mt-6
                                max-w-3xl
                                text-base
                                leading-7
                                text-zinc-600
                                sm:mt-8
                                sm:text-lg
                                sm:leading-8
                                md:text-xl
                                dark:text-zinc-400
                            "
                        >
                            Hi, I'm {WEBSITE_AUTHOR}. I explore the space between ideas and 
                            reality through robotics, software, AI, and engineering. This 
                            laboratory houses my technical logs, where I document the ideas, 
                            experiments, failures, and systems behind what I make.
                        </p>


                        {/* Buttons */}
                        <div
                            className="
                                mt-8
                                flex
                                flex-col
                                gap-3
                                sm:mt-9
                                sm:flex-row
                            "
                        >

                            {/* Explore Projects */}
                            <Link
                                href="/projects"
                                className="
                                    flex
                                    min-h-14
                                    w-full
                                    items-center
                                    justify-center
                                    rounded-md
                                    bg-teal-500
                                    px-7
                                    font-semibold
                                    text-white
                                    transition
                                    hover:bg-teal-600
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-teal-500
                                    focus:ring-offset-2
                                    focus:ring-offset-white
                                    sm:w-auto
                                    sm:min-w-48
                                    dark:bg-teal-400
                                    dark:text-zinc-950
                                    dark:hover:bg-teal-300
                                    dark:focus:ring-teal-400
                                    dark:focus:ring-offset-zinc-950
                                "
                            >
                                ./explore_projects
                            </Link>


                            {/* Journal */}
                            <Link
                                href="/journal"
                                className="
                                    flex
                                    min-h-14
                                    w-full
                                    items-center
                                    justify-center
                                    rounded-md
                                    border
                                    border-zinc-300
                                    bg-white
                                    px-7
                                    font-mono
                                    text-zinc-700
                                    transition
                                    hover:border-zinc-400
                                    hover:bg-zinc-100
                                    hover:text-zinc-950
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-zinc-400
                                    focus:ring-offset-2
                                    focus:ring-offset-white
                                    sm:w-auto
                                    sm:min-w-60
                                    dark:border-zinc-800
                                    dark:bg-transparent
                                    dark:text-zinc-300
                                    dark:hover:border-zinc-600
                                    dark:hover:bg-zinc-900
                                    dark:hover:text-white
                                    dark:focus:ring-zinc-500
                                    dark:focus:ring-offset-zinc-950
                                "
                            >
                                cat read_journals.md
                            </Link>

                        </div>


                        {/* Tagline */}
                        <p
                            className="
                                mt-6
                                font-mono
                                text-xs
                                text-zinc-400
                                sm:text-sm
                                dark:text-zinc-600
                            "
                        >
                            {WEBSITE_NAME} // Build. Learn. Document. Improve.
                        </p>

                    </div>


                    {/* Terminal */}
                    <div
                        className="
                            w-full
                            overflow-hidden
                            rounded-md
                            border
                            border-zinc-200
                            bg-zinc-100
                            shadow-xl
                            dark:border-zinc-800
                            dark:bg-zinc-900/60
                            dark:shadow-2xl
                        "
                    >

                        {/* Terminal header */}
                        <div
                            className="
                                flex
                                h-10
                                items-center
                                justify-between
                                border-b
                                border-zinc-200
                                px-3
                                sm:px-4
                                dark:border-zinc-800
                            "
                        >

                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-red-500" />
                                <span className="h-3 w-3 rounded-full bg-amber-400" />
                                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                            </div>

                            <span
                                className="
                                    max-w-[60%]
                                    truncate
                                    font-mono
                                    text-xs
                                    text-zinc-500
                                "
                            >
                                spider_init.sh
                            </span>

                        </div>


                        {/* Terminal content */}
                        <div
                            className="
                                space-y-3
                                p-4
                                font-mono
                                text-xs
                                leading-6
                                sm:p-5
                                sm:text-sm
                                sm:leading-6
                            "
                        >

                            <p className="break-words text-zinc-500 dark:text-zinc-500">
                                $ ./spider --initialize
                            </p>

                            <p className="break-words text-teal-600 dark:text-teal-400">
                                hw.machine: aarch64
                            </p>

                            <p className="break-words text-zinc-500 dark:text-zinc-500">
                                [i] Loading kinematics model...
                            </p>

                            <p className="break-words text-zinc-500 dark:text-zinc-500">
                                [i] Calibrating 18 servo joints...
                            </p>

                            <p className="break-words text-teal-600 dark:text-teal-400">
                                &gt; Target acquired: (124.6, 82.1, 47.3)
                            </p>
                            <p className="break-words text-teal-600 dark:text-teal-400">
                                &gt; IK solution: converged
                            </p>

                            <p className="break-words text-zinc-400 dark:text-zinc-600">
                                [i] System initialized.
                            </p>

                        </div>

                    </div>

                </div>

            </div>


            {/* Section divider */}
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
                <hr className="border-zinc-200 dark:border-zinc-800" />
            </div>

        </section>
    );
}

