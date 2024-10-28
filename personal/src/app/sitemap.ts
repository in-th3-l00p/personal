import type { MetadataRoute } from 'next'
import {getAllArticles} from "@/lib/strapi/collection/articles";
import strapi from "@/lib/strapi";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();

  const homePage = await strapi.find<{ updatedAt: string }>('home', {
    fields: ['updatedAt']
  });
  const aboutPage = await strapi.find<{ updatedAt: string }>('about', {
    fields: ['updatedAt']
  });
  const articlesPage = await strapi.find<{ updatedAt: string }>('articles-page', {
    fields: ['updatedAt']
  });
  const projectsPage = await strapi.find<{ updatedAt: string }>('projects-page', {
    fields: ['updatedAt']
  });

  const sitemap = [
    {
      url: 'https://tiscacatalin.com',
      lastModified: new Date(homePage.data.updatedAt),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://tiscacatalin.com/about',
      lastModified: new Date(aboutPage.data.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://tiscacatalin.com/projects',
      lastModified: new Date(projectsPage.data.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://tiscacatalin.com/articles',
      lastModified: new Date(articlesPage.data.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  articles.forEach((article) => {
    sitemap.push({
      url: `https://tiscacatalin.com/projects/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: 'monthly',
      priority: 0.5,
    });
  });

  return sitemap as any;
}