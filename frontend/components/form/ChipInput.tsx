"use client";

import { KeyboardEvent, useState } from "react";

type ChipInputProps = {
    label: string;
    values: string[];
    onChange: (values: string[]) => void;
    placeholder?: string;
};

export default function ChipInput({
    label,
    values,
    onChange,
    placeholder = "Press Enter to add..."
}: ChipInputProps) {
    const [input, setInput] = useState("");

    function addChip() {
        const value = input.trim();

        if (!value) return;
        if (values.includes(value)) {
            setInput("");
            return;
        }

        onChange([...values, value]);
        setInput("");
    }

    function removeChip(chip: string) {
        onChange(values.filter((v) => v !== chip));
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            e.preventDefault();
            addChip();
        }

        if (
            e.key === "Backspace" &&
            input === "" &&
            values.length > 0
        ) {
            removeChip(values[values.length - 1]);
        }
    }

    return (
        <div>
            <label className="
            mb-2
            block
            text-sm
            font-medium
            text-zinc-700
            dark:text-zinc-300
        ">
                {label}
            </label>

            <div className="
            flex
            min-h-[52px]
            flex-wrap
            gap-2
            rounded-xl
            border
            border-zinc-300
            bg-white
            p-3
            transition-colors
            focus-within:border-teal-500
            focus-within:ring-2
            focus-within:ring-teal-500/20
            dark:border-zinc-700
            dark:bg-zinc-900
        ">

                {values.map((chip) => (
                    <span
                        key={chip}
                        className="
                        flex
                        items-center
                        gap-2
                        rounded-full
                        bg-teal-500/10
                        px-3
                        py-1
                        text-sm
                        font-medium
                        text-teal-700
                        dark:text-teal-400
                    "
                    >
                        {chip}

                        <button
                            type="button"
                            onClick={() => removeChip(chip)}
                            aria-label={`Remove ${chip}`}
                            className="
                            font-bold
                            text-teal-600/70
                            transition-colors
                            hover:text-teal-900
                            dark:text-teal-400/70
                            dark:hover:text-teal-200
                        "
                        >
                            ×
                        </button>
                    </span>
                ))}

                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="
                    min-w-[180px]
                    flex-1
                    bg-transparent
                    px-1
                    py-1
                    text-zinc-900
                    outline-none
                    placeholder:text-zinc-400
                    dark:text-zinc-100
                    dark:placeholder:text-zinc-500
                "
                />

            </div>
        </div>
    );
}

