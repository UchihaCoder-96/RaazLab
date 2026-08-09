"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import {
    Menu,
    X,
    Monitor,
    Moon,
    Sun,
} from "lucide-react";

import { WEBSITE_NAME, WEBSITE_VERSION } from "@/utils/Utility";

export default function Navbar() {
    const pathname = usePathname();

    const { theme, setTheme } = useTheme();

    const [mounted, setMounted] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
        setToken(localStorage.getItem("token"));
    }, [pathname]);

    // Close mobile menu whenever the route changes.
    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    function logout() {
        localStorage.removeItem("token");
        setToken(null);
        setMenuOpen(false);

        window.location.href = "/";
    }

    function cycleTheme() {
        if (theme === "system") {
            setTheme("light");
        } else if (theme === "light") {
            setTheme("dark");
        } else {
            setTheme("system");
        }
    }

    function getThemeIcon() {
        if (!mounted) {
            return <Monitor size={18} />;
        }

        if (theme === "light") {
            return <Sun size={18} />;
        }

        if (theme === "dark") {
            return <Moon size={18} />;
        }

        return <Monitor size={18} />;
    }

    const navItems = [
        {
            name: "Home",
            href: "/",
        },
        {
            name: "Projects",
            href: "/projects",
        },
        {
            name: "Journal",
            href: "/journal",
        },
        {
            name: "About",
            href: "/about",
        },
    ];

    function isActive(href: string) {
        if (href === "/") {
            return pathname === "/";
        }

        return pathname.startsWith(href);
    }

    const currentPage =
        navItems.find((item) => isActive(item.href))?.name ?? "Home";

    return (
        <>
            <nav
                className="
                    sticky
                    top-0
                    z-50
                    border-b
                    border-zinc-200
                    bg-white/95
                    backdrop-blur-md
                    transition-colors

                    dark:border-zinc-800
                    dark:bg-zinc-950/95
                "
            >
                <div
                    className="
                        mx-auto
                        flex
                        h-[78px]
                        max-w-[1400px]
                        items-center
                        justify-between
                        px-[22px]

                        sm:px-6
                        lg:h-[88px]
                        lg:px-16
                    "
                >

                    {/* ========================================= */}
                    {/* LEFT SIDE                                 */}
                    {/* ========================================= */}

                    <div className="flex items-center">

                        {/* Mobile menu button */}

                        <button
                            type="button"
                            onClick={() => setMenuOpen((open) => !open)}
                            aria-label={
                                menuOpen
                                    ? "Close navigation menu"
                                    : "Open navigation menu"
                            }
                            aria-expanded={menuOpen}
                            className="
                                mr-3
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-md
                                border
                                border-zinc-200
                                bg-zinc-50
                                text-zinc-600
                                transition-colors

                                hover:border-zinc-300
                                hover:bg-zinc-100
                                hover:text-zinc-900

                                dark:border-zinc-800
                                dark:bg-zinc-950
                                dark:text-zinc-400

                                dark:hover:border-zinc-700
                                dark:hover:bg-zinc-900
                                dark:hover:text-zinc-100

                                md:hidden
                            "
                        >
                            {menuOpen ? (
                                <X size={20} />
                            ) : (
                                <Menu size={20} />
                            )}
                        </button>


                        {/* RL Logo */}

                        <Link
                            href="/"
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-[5px]
                                border
                                border-teal-500
                                text-sm
                                font-bold
                                text-teal-600
                                transition-colors

                                hover:bg-teal-500/10

                                dark:text-teal-400
                            "
                        >
                            RL
                        </Link>


                        {/* Website name */}

                        <Link
                            href="/"
                            className="
                                ml-3
                                text-xl
                                font-semibold
                                tracking-tight
                                text-zinc-900
                                transition-colors

                                hover:text-teal-600

                                dark:text-zinc-100
                                dark:hover:text-teal-400
                            "
                        >
                            {WEBSITE_NAME}
                        </Link>


                        {/* Version */}

                        <span
                            className="
                                ml-3
                                hidden
                                text-sm
                                font-medium
                                text-zinc-400

                                dark:text-zinc-600

                                sm:inline
                            "
                        >
                            v{WEBSITE_VERSION}
                        </span>

                    </div>


                    {/* ========================================= */}
                    {/* DESKTOP NAVIGATION                        */}
                    {/* ========================================= */}

                    <div
                        className="
                            absolute
                            left-1/2
                            hidden
                            -translate-x-1/2
                            items-center
                            gap-10

                            md:flex
                        "
                    >
                        {navItems.map((item) => {
                            const active = isActive(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`
                                        text-[17px]
                                        font-medium
                                        transition-colors

                                        ${
                                            active
                                                ? `
                                                    text-teal-600
                                                    dark:text-teal-400
                                                `
                                                : `
                                                    text-zinc-600
                                                    hover:text-zinc-950

                                                    dark:text-zinc-400
                                                    dark:hover:text-zinc-100
                                                `
                                        }
                                    `}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>


                    {/* ========================================= */}
                    {/* RIGHT SIDE                                 */}
                    {/* ========================================= */}

                    <div className="flex items-center gap-3 sm:gap-4">

                        {/* Desktop technical label */}

                        <span
                            className="
                                hidden
                                font-mono
                                text-xs
                                text-zinc-500

                                lg:inline
                            "
                        >
                            [0x7F]
                        </span>


                        {/* Mobile current page */}

                        <span
                            className="
                                font-mono
                                text-xs
                                text-zinc-500

                                sm:text-sm

                                md:hidden
                            "
                        >
                            [{currentPage.toUpperCase()}]
                        </span>


                        {/* Theme button */}

                        <button
                            type="button"
                            onClick={cycleTheme}
                            aria-label="Change theme"
                            title={
                                mounted
                                    ? `Theme: ${theme}`
                                    : "Change theme"
                            }
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-md
                                border
                                border-zinc-200
                                bg-zinc-50
                                text-zinc-600
                                transition-colors

                                hover:border-zinc-300
                                hover:bg-zinc-100
                                hover:text-zinc-900

                                dark:border-zinc-800
                                dark:bg-zinc-950
                                dark:text-zinc-400

                                dark:hover:border-zinc-700
                                dark:hover:bg-zinc-900
                                dark:hover:text-zinc-100
                            "
                        >
                            {getThemeIcon()}
                        </button>


                        {/* Desktop logout */}

                        {token && (
                            <button
                                type="button"
                                onClick={logout}
                                className="
                                    hidden
                                    rounded-md
                                    border
                                    border-red-200
                                    bg-red-50
                                    px-4
                                    py-2
                                    text-sm
                                    font-medium
                                    text-red-600
                                    transition-colors

                                    hover:border-red-300
                                    hover:bg-red-100
                                    hover:text-red-700

                                    dark:border-red-500/40
                                    dark:bg-transparent
                                    dark:text-red-400

                                    dark:hover:bg-red-500/10
                                    dark:hover:text-red-300

                                    sm:block
                                "
                            >
                                Logout
                            </button>
                        )}

                    </div>

                </div>


                {/* ============================================= */}
                {/* MOBILE MENU                                    */}
                {/* ============================================= */}

                {menuOpen && (
                    <div
                        className="
                            border-t
                            border-zinc-200
                            bg-white

                            dark:border-zinc-800
                            dark:bg-zinc-950

                            md:hidden
                        "
                    >
                        <div className="px-[22px] py-5">

                            <div className="flex flex-col">

                                {navItems.map((item) => {
                                    const active = isActive(item.href);

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`
                                                border-b
                                                border-zinc-100
                                                py-4
                                                font-mono
                                                text-sm
                                                transition-colors

                                                dark:border-zinc-900

                                                ${
                                                    active
                                                        ? `
                                                            text-teal-600
                                                            dark:text-teal-400
                                                        `
                                                        : `
                                                            text-zinc-600
                                                            hover:text-zinc-950

                                                            dark:text-zinc-400
                                                            dark:hover:text-zinc-100
                                                        `
                                                }
                                            `}
                                        >
                                            <span className="mr-3 text-zinc-400">
                                                {active ? ">" : "$"}
                                            </span>

                                            {item.name}
                                        </Link>
                                    );
                                })}


                                {/* Mobile logout */}

                                {token && (
                                    <button
                                        type="button"
                                        onClick={logout}
                                        className="
                                            mt-4
                                            rounded-md
                                            border
                                            border-red-200
                                            bg-red-50
                                            px-4
                                            py-3
                                            text-left
                                            font-mono
                                            text-sm
                                            text-red-600
                                            transition-colors

                                            hover:bg-red-100

                                            dark:border-red-500/30
                                            dark:bg-red-500/5
                                            dark:text-red-400

                                            dark:hover:bg-red-500/10
                                        "
                                    >
                                        $ logout
                                    </button>
                                )}

                            </div>

                        </div>
                    </div>
                )}

            </nav>
        </>
    );
}

