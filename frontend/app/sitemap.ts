import { MetadataRoute } from "next";
import {getProjects} from "@/lib/projects";
import { WEBSITE_BASE_URL } from "@/utils/Utility";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const projects = await getProjects();

    return [

        {
            url: WEBSITE_BASE_URL,
            priority: 1,
        },

        {
            url: `${WEBSITE_BASE_URL}/projects`,
        },

        ...projects.map(project => ({
            url: `${WEBSITE_BASE_URL}/projects/${project.slug}`,
        })),

    ];
}