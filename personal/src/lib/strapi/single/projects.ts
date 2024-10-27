import strapi from "@/lib/strapi";

interface ProjectsPage {
  title: string;
  description: string;
}

export default async function getProjectsPage(): Promise<ProjectsPage> {
  return (await strapi.find<ProjectsPage>("projects-page")).data;
}