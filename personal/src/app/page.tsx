import {Container} from '@/components/ui/Container'
import {GitHubIcon, InstagramIcon, LinkedInIcon,} from '@/components/icons/SocialIcons'
import {getAllArticles} from '@/lib/strapi/collection/articles'
import {Article} from "@/components/home/article";
import {SocialLink} from "@/components/home/socialLink";
import Resume from "@/components/home/resume";
import {Photos} from "@/components/home/photos";
import getHome from "@/lib/strapi/single/home";
import getSocials from "@/lib/strapi/collection/socials";

export default async function Home() {
  const articles = (await getAllArticles()).slice(0, 4)
  const home = await getHome();
  const socials = await getSocials();

  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            {home.title}
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            {home.description}
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href={socials.instagram.url}
              aria-label={`Instagram ${socials.instagram.label}`}
              icon={InstagramIcon}
            />
            <SocialLink
              href={socials.github.url}
              aria-label={`Github ${socials.github.label}`}
              icon={GitHubIcon}
            />
            <SocialLink
              href={socials.linkedin.url}
              aria-label={`LinkedIn ${socials.linkedin.label}`}
              icon={LinkedInIcon}
            />
          </div>
        </div>
      </Container>
      <Photos images={home.images} />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles.length === 0 && (
              <p className={"text-zinc-400 dark:text-zinc-600 text-center"}>
                there are no articles published yet.
              </p>
            )}
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            {/*<Newsletter*/}
            {/*  title={home.newsletterTitle}*/}
            {/*  description={home.newsletterDescription}*/}
            {/*  placeholder={home.newsletterPlaceholder}*/}
            {/*  button={home.newsletterButton}*/}
            {/*/>*/}
            <Resume
              title={home.workTitle}
              resumeButton={home.workButton}
              resumeUrl={home.resume.url}
            />
          </div>
        </div>
      </Container>
    </>
  )
}
