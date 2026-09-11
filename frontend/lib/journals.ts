import { stripEmptyFields, getAuthHeaders } from "@/utils/Utility";
import API_BASE_URL from "./api";
import { Journal } from "@/types/journal";

export async function getJournals(): Promise<Journal[]> {
    const response = await fetch(`${API_BASE_URL}/api/journals`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch journals");
    }

    const journals = await response.json();

    return journals.map((journal: Journal) => ({
        ...journal,
        date: new Date(journal.date),
    }));
}

export async function getJournal(slug: string): Promise<Journal> {
    const response = await fetch(`${API_BASE_URL}/api/journals/${slug}`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch journal");
    }

    const journal = await response.json();

    return {
        ...journal,
        date: new Date(journal.date),
    };
}

export async function deleteJournal(slug:string) {
    const response = await fetch(`${API_BASE_URL}/api/journals/${slug}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });
    if (!response.ok) {
        throw new Error("[DELETE FETCH ERROR] Status: " + response.status);
    }
    return response;
}

export async function createJournal(journal: any) {
    const formattedJournal = stripEmptyFields(journal);

    const response = await fetch(`${API_BASE_URL}/api/journals`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(formattedJournal),
    });

    if (!response.ok) {
        throw new Error("[POST FETCH ERROR] Status: " + response.status);
    }

    return response;
}

export async function updateJournal(
    slug: string,
    journal: any
) {
    const formattedJournal = stripEmptyFields(journal);

    const response = await fetch(`${API_BASE_URL}/api/journals/${slug}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(formattedJournal),
    });

    if (!response.ok) {
        throw new Error("[PUT FETCH ERROR] Status: " + response.status);
    }

    return response;
}

