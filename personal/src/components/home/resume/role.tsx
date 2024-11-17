import Image from "next/image";
import {Job} from "@/lib/strapi/collection/workExperience";

export function Role({job}: { job: Job }) {
  return (
    <li className="flex gap-4">
      <div
        className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Image
          width={128}
          height={128}
          src={job.logo.url}
          alt={job.logo.alternativeText}
          className="h-7 w-7 invert object-cover dark:invert-0"
          unoptimized
        />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {job.name}
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {job.title}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
          aria-label={`${job.start.label} until ${job.end ? job.end.label : 'present'}`}
        >
          <time dateTime={job.start.dateTime.toLocaleDateString()}>{job.start.label}</time>
          {' '}
          <span aria-hidden="true">—</span>{' '}
          <time dateTime={
            job.end ?
              job.end.dateTime.toLocaleDateString() :
              new Date().toLocaleDateString()
          }>{job.end ? job.end.label : 'present'}</time>
        </dd>
      </dl>
    </li>
  )
}
