import strapi, {Link} from "@/lib/strapi";

export interface Socials {
  instagram: Link;
  github: Link;
  linkedin: Link;
  email: Link;
}

export default async function getSocials(): Promise<Socials> {
  return (await strapi.find<Socials>("social", {
    populate: "*"
  })).data;
}