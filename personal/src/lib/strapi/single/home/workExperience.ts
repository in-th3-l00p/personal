import strapi, {prefixUrl, StrapiImage} from "@/lib/strapi";

interface StrapiJob {
  name: string;
  title: string;
  start: string;
  end?: string;
  logo: StrapiImage;
}

export type JobDate = {
  label: string;
  dateTime: Date;
};

export interface Job {
  name: string;
  title: string;
  start: JobDate;
  end?: JobDate;
  logo: StrapiImage;
}

export default async function getWorkExperience(): Promise<Job[]> {
  const strapiJobs = (await strapi.find<StrapiJob[]>("work-experiences", {
    populate: "*"
  })).data;

  return strapiJobs.map(job => ({
    name: job.name,
    title: job.title,
    start: {
      label: job.start.substring(0, 4),
      dateTime: new Date(job.start)
    },
    end: job.end ? {
      label: job.end.substring(0, 4),
      dateTime: new Date(job.end)
    } : undefined,
    logo: prefixUrl(job.logo)
  }));
}