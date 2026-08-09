"use client";

import { useEffect, useState } from "react";

import type { Journal } from "@/types/journal";
import type { Project } from "@/types/project";

import ChipInput from "@/components/form/ChipInput";
import SelectField from "@/components/form/SelectField";
import TextArea from "@/components/form/TextArea";
import TextField from "@/components/form/TextField";

export type CreateJournalRequest = {
    title: string;
    summary: string;
    content: string;
    tags: string[];
    projectSlug?: string;
};

type JournalFormProps = {
    projects: Project[];
    initialData?: Partial<Journal>;
    submitText?: string;
    onSubmit: (journal: CreateJournalRequest) => Promise<void>;
};

export default function JournalForm({
    projects,
    initialData,
    submitText = "Save Journal",
    onSubmit,
}: JournalFormProps) {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [projectSlug, setProjectSlug] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!initialData) return;

        setTitle(initialData.title ?? "");
        setSummary(initialData.summary ?? "");
        setContent(initialData.content ?? "");
        setTags(initialData.tags ?? []);
        setProjectSlug(initialData.projectSlug ?? "");
    }, [initialData]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        setLoading(true);

        try {
            const journal: CreateJournalRequest = {
                title,
                summary,
                content,
                tags,
            };

            if (projectSlug.trim()) {
                journal.projectSlug = projectSlug;
            }

            await onSubmit(journal);
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
                placeholder="Worked on project physics..."
            />

            <TextArea
                label="Summary"
                value={summary}
                onChange={setSummary}
                rows={6}
                required
                placeholder="Describe today's progress..."
            />

            <TextArea
                label="Content"
                value={content}
                onChange={setContent}
                rows={18}
                required
                placeholder="Describe today's progress..."
            />

            <ChipInput
                label="Tags"
                values={tags}
                onChange={setTags}
                placeholder="Press Enter to add tags..."
            />

            <SelectField
                label="Related Project"
                value={projectSlug}
                onChange={setProjectSlug}
                options={[
                    "",
                    ...projects.map((project) => project.slug),
                ]}
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

