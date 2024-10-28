import { Feed } from 'feed'
import {getAllArticles} from "@/lib/strapi/collection/articles";

export async function GET() {
  let siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl) {
    throw Error('Missing NEXT_PUBLIC_SITE_URL environment variable')
  }

  let author = {
    name: 'Tișcă Cătălin',
    email: 'admin@tiscacatalin.com',
  }

  let feed = new Feed({
    title: author.name,
    description: 'Articles that talk about my experiences, work, and everything I consider that it is worth talking about',
    author,
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${siteUrl}/feed.xml`,
    },
  });

  (await getAllArticles())
    .forEach(article => feed.addItem({
      id: article.id,
      link: `${siteUrl}/articles/${article.slug}`,
      title: article.title,
      content: article.description,
      author: [author],
      contributor: [author],
      date: new Date(article.date)
    }));

  return new Response(feed.rss2(), {
    status: 200,
    headers: {
      'content-type': 'application/xml',
      'cache-control': 's-maxage=31556952',
    },
  })
}
