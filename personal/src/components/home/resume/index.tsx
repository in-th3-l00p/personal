import {Role} from "@/components/home/resume/role";
import wildcardLogo from "@/images/logos/wildcard.svg";
import {BriefcaseIcon} from "@/components/home/icons/briefcaseIcon";
import {Button} from "@/components/ui/Button";
import {ArrowDownIcon} from "@/components/home/icons/arrowDownIcon";
import getWorkExperience from "@/lib/strapi/single/home/workExperience";

export default async function Resume({ title, resumeButton, resumeUrl }: {
  title: string;
  resumeButton: string;
  resumeUrl: string;
}) {
  const jobs = await getWorkExperience();

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none"/>
        <span className="ml-3">{title}</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {jobs.map((jobs, roleIndex) => (
          <Role key={roleIndex} job={jobs}/>
        ))}
      </ol>
      <Button href={resumeUrl} variant="secondary" className="group mt-6 w-full">
        {resumeButton}
        <ArrowDownIcon
          className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50"/>
      </Button>
    </div>
  )
}