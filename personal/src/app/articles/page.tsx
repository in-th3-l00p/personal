import {type Metadata} from 'next'
import SimpleLayout from '@/components/layout/simpleLayout'
import {getAllArticles} from '@/lib/strapi/collection/articles'
import {Article} from "@/components/articles/article";
import getArticlesPage from "@/lib/strapi/single/articles";

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'Whatever I thought might be worth sharing among others, including experiences, projects, studies and many more.',
}

export default async function ArticlesIndex() {
  const articles = await getAllArticles();
  const page = await getArticlesPage();

  return (
    <SimpleLayout
      title={page.title}
      intro={page.description}
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {articles.length === 0 && (
            <p className={"text-zinc-400 dark:text-zinc-600 text-center"}>
              there are no articles published yet.
            </p>
          )}
          {articles.map((article) => (
            <Article
              key={article.slug}
              article={article}
            />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
