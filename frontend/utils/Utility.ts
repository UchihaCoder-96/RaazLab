const WEBSITE_NAME = process.env.NEXT_PUBLIC_WEBSITE_NAME || "Raaz Lab";
const WEBSITE_BASE_URL = process.env.NEXT_PUBLIC_WEBSITE_BASE_URL || "https://raazlab.vercel.app/";
const WEBSITE_AUTHOR = process.env.NEXT_PUBLIC_AUTHOR || "Uwuchiha san";
const WEBSITE_VERSION = process.env.NEXT_PUBLIC_WEBSITE_VERSION || "2.0";

export { WEBSITE_NAME, WEBSITE_BASE_URL, WEBSITE_AUTHOR, WEBSITE_VERSION };

export function formatEnums(status: string) {
    return status.replace(/([a-z])([A-Z])/g, "$1 $2");
}

export function stripEmptyFields(body: any) {
    return Object.fromEntries(
        Object.entries(body).filter(([_, value]) => value !== "")
    );
}

export function getAuthHeaders() {
    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

