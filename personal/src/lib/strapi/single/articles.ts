import strapi from "@/lib/strapi";

interface ArticlesPage {
  title: string;
  description: string;
}

export default async function getArticlesPage(): Promise<ArticlesPage> {
  return (await strapi.find<ArticlesPage>("articles-page")).data;
}