import strapi, {prefixUrl, StrapiImage} from "@/lib/strapi";

export interface About {
  title: string;
  content: string;
  image: StrapiImage;
}

export default async function getAbout() {
  let about = (await strapi.find<About>(
    "about", {
      populate: "*"
    }));
  about.data.image.url = prefixUrl(about.data.image).url;
  return about.data;
}