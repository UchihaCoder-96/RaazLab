"use client";

import {
    PROJECT_CATEGORIES,
    PROJECT_DIFFICULTIES,
    PROJECT_STATUSES,
    Project,
} from "@/types/project";

import { useState } from "react";

import ChipInput from "@/components/form/ChipInput";
import SelectField from "@/components/form/SelectField";
import TextArea from "@/components/form/TextArea";
import TextField from "@/components/form/TextField";

type ProjectFormProps = {
    initialData?: Partial<Project>;
    submitText?: string;
    onSubmit: (project: {
        title: string;
        shortDescription: string;
        content: string;
        category: Project["category"];
        difficulty: Project["difficulty"];
        status: Project["status"];
        githubUrl: string;
        demoUrl: string;
        thumbnail: string;
        technologies: string[];
        featuredOrder: number;
    }) => Promise<void>;
};

export default function ProjectForm({
    initialData,
    submitText = "Save Project",
    onSubmit,
}: ProjectFormProps) {
    const [title, setTitle] = useState(initialData?.title ?? "");
    const [description, setDescription] = useState(
        initialData?.shortDescription ?? ""
    );

    const [content, setContent] = useState(
        initialData?.content ?? ""
    );

    const [category, setCategory] = useState<Project["category"]>(
        initialData?.category ?? PROJECT_CATEGORIES[0]
    );

    const [difficulty, setDifficulty] =
        useState<Project["difficulty"]>(
            initialData?.difficulty ?? PROJECT_DIFFICULTIES[0]
        );

    const [status, setStatus] = useState<Project["status"]>(
        initialData?.status ?? PROJECT_STATUSES[0]
    );

    const [githubUrl, setGithubUrl] = useState(
        initialData?.githubUrl ?? ""
    );

    const [demoUrl, setDemoUrl] = useState(
        initialData?.demoUrl ?? ""
    );

    const [thumbnail, setThumbnail] = useState(
        initialData?.thumbnail ?? ""
    );

    const [technologies, setTechnologies] = useState<string[]>(
        initialData?.technologies ?? []
    );

    const [featuredOrder, setFeaturedOrder] = useState<number>(
        initialData?.featuredOrder ?? 0
    );

    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        setLoading(true);

        try {
            await onSubmit({
                title,
                shortDescription: description,
                content,
                category,
                difficulty,
                status,
                githubUrl,
                demoUrl,
                thumbnail,
                technologies,
                featuredOrder,
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-8"
        >
            <TextField
                label="Title"
                value={title}
                onChange={setTitle}
                required
            />

            <TextArea
                label="Short Description"
                value={description}
                rows={6}
                onChange={setDescription}
                required
            />

            <TextArea
                label="Content"
                value={content}
                rows={18}
                onChange={setContent}
                required
            />

            <div className="grid gap-6 md:grid-cols-2">

                <SelectField
                    label="Category"
                    value={category}
                    options={PROJECT_CATEGORIES}
                    onChange={setCategory}
                />

                <SelectField
                    label="Difficulty"
                    value={difficulty}
                    options={PROJECT_DIFFICULTIES}
                    onChange={setDifficulty}
                />

            </div>
            <div className="grid gap-6 md:grid-cols-2">
                <SelectField
                    label="Status"
                    value={status}
                    options={PROJECT_STATUSES}
                    onChange={setStatus}
                />

                <div>
                    <label
                        className="
                mb-2
                block
                text-sm
                font-medium
                text-zinc-700
                dark:text-zinc-300
            "
                    >
                        Featured Order
                    </label>

                    <input
                        type="number"
                        min={0}
                        value={featuredOrder}
                        onChange={(e) =>
                            setFeaturedOrder(Number(e.target.value))
                        }
                        className="
                w-full
                rounded-xl
                border
                border-zinc-300
                bg-white
                px-4
                py-3
                text-zinc-900
                transition-colors
                focus:border-teal-500
                focus:outline-none
                focus:ring-2
                focus:ring-teal-500/20
                dark:border-zinc-700
                dark:bg-zinc-900
                dark:text-zinc-100
            "
                    />
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <TextField
                    label="GitHub URL"
                    value={githubUrl}
                    onChange={setGithubUrl}
                    type="url"
                />

                <TextField
                    label="Demo URL"
                    value={demoUrl}
                    onChange={setDemoUrl}
                    type="url"
                />
            </div>

            <TextField
                label="Thumbnail URL"
                value={thumbnail}
                onChange={setThumbnail}
                type="url"
            />

            <ChipInput
                label="Technologies"
                values={technologies}
                onChange={setTechnologies}
                placeholder="Press Enter to add..."
            />

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="
            rounded-xl
            border
            border-teal-500
            bg-teal-500
            px-6
            py-3
            font-medium
            text-zinc-950
            transition-colors
            hover:bg-teal-400
            disabled:cursor-not-allowed
            disabled:opacity-50
        "
                >
                    {loading ? "Saving..." : submitText}
                </button>
            </div>
        </form>
    );
}
