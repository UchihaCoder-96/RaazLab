import Image from "next/image";
import { FaGithub, FaDiscord } from "react-icons/fa6";

const skills = [
    "Python",
    "C#",
    "Basic C++",
    "Full-Stack Web-Dev",
    "Arduino / Raspberry Pi",
    "Fusion 360",
    "Blender",
    "Game Development",
    "Digital Art",
];

const interests = [
    {
        title: "Programming",
        description:
            "My main interest. I enjoy learning languages, frameworks, tools, and building things to understand how they actually work.",
    },
    {
        title: "Robotics",
        description:
            "I enjoy building robots and experimenting with electronics, from designing hardware to programming the final system.",
    },
    {
        title: "Mathematics",
        description:
            "I enjoy solving problems, learning new concepts, and exploring the patterns and structures behind mathematics.",
    },
];

const journey = [
    {
        period: "2018–2020",
        title: "Started Learning Programming",
        description:
            "Started learning programming by building simple games and experimenting with code.",
    },
    {
        period: "2020–2023",
        title: "Started Exploring Systems",
        description:
            "Began learning about systems, low-level programming, and how software works beneath the surface.",
    },
    {
        period: "2023–2025",
        title: "Built My First Engineering Projects",
        description:
            "Moved from isolated experiments toward larger engineering projects involving software, hardware, and problem solving.",
    },
    {
        period: "Present",
        title: "Exploring Robotics & AI",
        description:
            "Continuing to experiment, build projects, and document what I learn along the way.",
    },
];

const goals = [
    "Build more complete engineering projects.",
    "Learn advanced C++ and Rust.",
    "Improve electronics and CAD skills.",
    "Participate in competitions and hackathons.",
    "Document every project on this website.",
];

export default function Page() {
    return (
        <main className="bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
            <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">

                {/* Header */}
                <header>
                    <p className="font-mono text-xs uppercase tracking-wide text-teal-600 dark:text-teal-400">
                        // IDENTITY_REFS
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                        About RaazLab
                    </h1>
                </header>

                {/* Identity */}
                <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_280px] lg:items-start">

                    <div className="order-2 lg:order-1">
                        <div className="flex flex-col gap-7 sm:flex-row sm:items-start">

                            {/* Avatar */}
                            <div className="shrink-0">
                                <div className="relative h-32 w-32 overflow-hidden rounded-md border border-zinc-300 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 sm:h-36 sm:w-36">
                                    <Image
                                        src="/assets/site/avatar-1.png"
                                        alt="Avatar"
                                        fill
                                        priority
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* Intro */}
                            <div>
                                <p className="max-w-3xl text-base leading-7 text-zinc-600 dark:text-zinc-400 sm:text-lg sm:leading-8">
                                    I'm a student who enjoys building things,
                                    experimenting with software and hardware,
                                    and documenting what I learn. This
                                    laboratory is where I keep track of
                                    projects, mistakes, debugging sessions,
                                    experiments, and ideas.
                                </p>

                                <div className="mt-6 flex flex-wrap gap-2">
                                    {[
                                        "Student",
                                        "Robotics",
                                        "Programming",
                                        "Engineering",
                                    ].map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-sm border border-zinc-300 bg-zinc-100 px-3 py-1.5 font-mono text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Identity panel */}
                    <aside className="order-1 rounded-md border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/50 lg:order-2">
                        <p className="font-mono text-xs text-teal-600 dark:text-teal-400">
                            // PROFILE_STATUS
                        </p>

                        <div className="mt-5 space-y-4 font-mono text-xs">
                            <div>
                                <p className="text-zinc-500">
                                    STATUS
                                </p>
                                <p className="mt-1 text-teal-600 dark:text-teal-400">
                                    ● OPERATIONAL
                                </p>
                            </div>

                            <div>
                                <p className="text-zinc-500">
                                    PRIMARY_FOCUS
                                </p>
                                <p className="mt-1 text-zinc-700 dark:text-zinc-300">
                                    Software + Hardware
                                </p>
                            </div>

                            <div>
                                <p className="text-zinc-500">
                                    CURRENT_MODE
                                </p>
                                <p className="mt-1 text-zinc-700 dark:text-zinc-300">
                                    BUILD / LEARN / DOCUMENT
                                </p>
                            </div>
                        </div>
                    </aside>
                </section>

                <div className="my-16 h-px bg-zinc-200 dark:bg-zinc-800" />

                {/* Main content + sidebar */}
                <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px]">

                    {/* Main */}
                    <div className="space-y-14">

                        {/* Lab Mandate */}
                        <section>
                            <SectionLabel>
                                // LAB_MANDATE
                            </SectionLabel>

                            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                                The Lab Mandate
                            </h2>

                            <div className="mt-5 max-w-3xl space-y-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
                                <p>
                                    RaazLab is an independent laboratory space
                                    curated to design, test, and critique
                                    software, operating systems, and
                                    low-level diagnostic platforms.
                                </p>

                                <p>
                                    I prefer working proofs over polished
                                    claims. Projects are meant to be built,
                                    tested, broken, debugged, and documented.
                                </p>

                                <p>
                                    The goal is simple: understand how things
                                    work instead of treating them as black
                                    boxes.
                                </p>
                            </div>
                        </section>

                        {/* What I Build */}
                        <section>
                            <SectionLabel>
                                // BUILD_SCOPE
                            </SectionLabel>

                            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                                What I Build
                            </h2>

                            <p className="mt-5 max-w-3xl text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
                                Most projects exist to solve specific problems
                                or explore ideas. My interests span
                                programming, robotics, systems, electronics,
                                mathematics, and experimental software.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-2">
                                {[
                                    "Robotics",
                                    "Systems Programming",
                                    "Web Development",
                                    "Electronics",
                                    "Game Development",
                                    "Mathematics",
                                ].map((item) => (
                                    <span
                                        key={item}
                                        className="rounded-sm border border-teal-600/40 bg-teal-500/5 px-3 py-1.5 font-mono text-xs text-teal-700 dark:border-teal-500/40 dark:text-teal-400"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* Interests */}
                        <section>
                            <SectionLabel>
                                // INTEREST_MATRIX
                            </SectionLabel>

                            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                                Interests
                            </h2>

                            <div className="mt-6 grid gap-4 md:grid-cols-3">
                                {interests.map((interest) => (
                                    <article
                                        key={interest.title}
                                        className="rounded-md border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/50"
                                    >
                                        <h3 className="font-semibold">
                                            {interest.title}
                                        </h3>

                                        <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                                            {interest.description}
                                        </p>
                                    </article>
                                ))}
                            </div>
                        </section>

                        {/* Skills */}
                        <section>
                            <SectionLabel>
                                // TOOLCHAIN
                            </SectionLabel>

                            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                                Skills
                            </h2>

                            <div className="mt-6 flex flex-wrap gap-2">
                                {skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="rounded-sm border border-zinc-300 bg-zinc-100 px-3 py-2 font-mono text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* Journey */}
                        <section>
                            <SectionLabel>
                                // TIMELINE
                            </SectionLabel>

                            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                                Journey
                            </h2>

                            <div className="mt-8 border-l border-zinc-300 pl-6 dark:border-zinc-800">
                                <div className="space-y-9">
                                    {journey.map((item, index) => (
                                        <article
                                            key={item.period}
                                            className="relative"
                                        >
                                            <span
                                                className={`absolute -left-[31px] top-1.5 h-2 w-2 rounded-full ${
                                                    index === journey.length - 1
                                                        ? "bg-teal-500"
                                                        : "bg-zinc-400 dark:bg-zinc-700"
                                                }`}
                                            />

                                            <p
                                                className={`font-mono text-xs ${
                                                    index === journey.length - 1
                                                        ? "text-teal-600 dark:text-teal-400"
                                                        : "text-zinc-500"
                                                }`}
                                            >
                                                {item.period}
                                            </p>

                                            <h3 className="mt-1 font-semibold">
                                                {item.title}
                                            </h3>

                                            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                                                {item.description}
                                            </p>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Goals */}
                        <section>
                            <SectionLabel>
                                // CURRENT_OBJECTIVES
                            </SectionLabel>

                            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                                Current Goals
                            </h2>

                            <ul className="mt-6 space-y-3 text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
                                {goals.map((goal) => (
                                    <li
                                        key={goal}
                                        className="flex gap-3"
                                    >
                                        <span className="font-mono text-teal-600 dark:text-teal-400">
                                            +
                                        </span>
                                        <span>{goal}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-5">

                        {/* Philosophy */}
                        <section className="rounded-md border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
                            <SectionLabel>
                                // PHILOSOPHY
                            </SectionLabel>

                            <p className="mt-5 text-lg italic leading-7 text-zinc-600 dark:text-zinc-400">
                                "The unknown is an invitation."
                            </p>
                        </section>

                        {/* Contact */}
                        <section className="rounded-md border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
                            <SectionLabel>
                                // CONNECT_PEERS
                            </SectionLabel>

                            <div className="mt-5 space-y-3">

                                <a
                                    href="https://github.com/UchihaCoder-96/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group flex items-center justify-between gap-3 font-mono text-sm"
                                >
                                    <span className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                                        <FaGithub className="h-4 w-4" />
                                        github
                                    </span>

                                    <span className="text-teal-600 transition-colors group-hover:text-teal-500 dark:text-teal-400">
                                        @UchihaCoder-96
                                    </span>
                                </a>

                                <a
                                    href="https://discord.com/users/1038867403632807947"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group flex items-center justify-between gap-3 font-mono text-sm"
                                >
                                    <span className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                                        <FaDiscord className="h-4 w-4" />
                                        discord
                                    </span>

                                    <span className="text-teal-600 transition-colors group-hover:text-teal-500 dark:text-teal-400">
                                        General Meowth
                                    </span>
                                </a>

                            </div>
                        </section>

                        {/* System note */}
                        <section className="rounded-md border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
                            <SectionLabel>
                                // SYSTEM_NOTE
                            </SectionLabel>

                            <div className="mt-5 space-y-2 font-mono text-xs leading-5 text-zinc-500">
                                <p>
                                    $ cat philosophy.txt
                                </p>

                                <p className="text-zinc-600 dark:text-zinc-400">
                                    Curiosity requires documentation.
                                </p>

                                <p className="text-zinc-600 dark:text-zinc-400">
                                    Experiments require failure.
                                </p>

                                <p className="text-teal-600 dark:text-teal-400">
                                    [OK] keep building.
                                </p>
                            </div>
                        </section>

                    </aside>
                </div>
            </div>
        </main>
    );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <p className="font-mono text-xs uppercase tracking-wide text-teal-600 dark:text-teal-400">
            {children}
        </p>
    );
}

