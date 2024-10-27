import {type Metadata} from 'next'
import Image from 'next/image'

import {Container} from '@/components/ui/Container'
import {GitHubIcon, InstagramIcon, LinkedInIcon,} from '@/components/icons/SocialIcons'
import constants from "@/lib/constants";
import {SocialLink} from "@/components/about/socialLink";
import {MailIcon} from "@/components/about/icons/mailIcon";
import getAbout from "@/lib/strapi/single/about";
import {remark} from "remark";
import html from "remark-html";
import getSocials from "@/lib/strapi/collection/socials";

export const metadata: Metadata = {
  title: 'About',
  description:
    'I’m Tișcă Cătălin. I live in Romania, where I design the future.',
}

export default async function About() {
  const about = await getAbout();
  const content = await remark()
    .use(html)
    .process(about.content);
  const socials = await getSocials();

  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              width={600}
              height={600}
              src={about.image.url}
              alt={about.image.alternativeText}
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            {about.title}
          </h1>
          <div
            className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400"
            dangerouslySetInnerHTML={{__html: content.value }}
          />
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink
              href={socials.instagram.url}
              icon={InstagramIcon}
              className="mt-4"
            >
              <span className="sr-only">Instagram</span> {socials.instagram.label}
            </SocialLink>
            <SocialLink
              href={socials.github.url}
              icon={GitHubIcon}
              className="mt-4"
            >
              <span className="sr-only">GitHub</span> {socials.github.label}
            </SocialLink>
            <SocialLink
              href={socials.linkedin.url}
              icon={LinkedInIcon}
              className="mt-4"
            >
              <span className="sr-only">LinkedIn</span> {socials.linkedin.label}
            </SocialLink>
            <SocialLink
              href={`mailto:${socials.email.url}`}
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              {socials.email.label}
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
