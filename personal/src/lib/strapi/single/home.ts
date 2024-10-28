import strapi, {prefixUrl, StrapiImage, StrapiMedia} from "@/lib/strapi";

export interface StrapiHome {
  title: string;
  description: string;
  images: StrapiImage[];
  newsletterTitle: string;
  newsletterDescription: string;
  newsletterPlaceholder: string;
  newsletterButton: string;
  workTitle: string;
  workButton: string;
  resume: StrapiMedia;
}

export default async function getHome(): Promise<StrapiHome> {
  let home = (await strapi.find<StrapiHome>(
    "home", {
      populate: "*"
    }));
  for (const image of home.data.images)
    image.url = prefixUrl(image).url;
  home.data.resume.url = prefixUrl(home.data.resume).url;

  return home.data;
}