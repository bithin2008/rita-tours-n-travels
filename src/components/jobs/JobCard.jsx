"use client";
import { useState } from "react";
import { ArrowRight, Briefcase, ChevronDown, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const TYPE_LABELS = {
  full_time: "Full time",
  part_time: "Part time",
  contract: "Contract",
  internship: "Internship",
};

export default function JobCard({ job, onApply }) {
  const [open, setOpen] = useState(false);
  const responsibilities = job.responsibilities ?? [];
  const requirements = job.requirements ?? [];

  return (
    <article className="rounded-[22px] border border-navy/10 bg-white p-6 transition-all duration-500 hover:border-electric/30 hover:shadow-[0_28px_56px_-40px_rgba(10,31,68,0.6)]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="font-heading text-[19px] font-semibold leading-snug tracking-[-0.01em] text-navy">
            {job.title}
          </h3>
          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px] text-navy/55">
            {job.department ? (
              <span className="inline-flex items-center gap-1.5">
                <Briefcase className="h-3.5 w-3.5 text-navy/30" aria-hidden="true" />
                {job.department}
              </span>
            ) : null}
            {job.location ? (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-navy/30" aria-hidden="true" />
                {job.location}
              </span>
            ) : null}
            <span className="rounded-full bg-electric/10 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-electric">
              {TYPE_LABELS[job.type] ?? "Full time"}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onApply(job.title)}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-[12.5px] font-semibold text-white transition-colors hover:bg-electric"
        >
          Apply
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>

      {job.summary ? <p className="mt-4 text-[13.5px] leading-relaxed text-navy/65">{job.summary}</p> : null}

      {responsibilities.length || requirements.length ? (
        <div className="mt-5 border-t border-navy/[0.08] pt-1">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-navy/45 transition-colors hover:text-electric"
          >
            {open ? "Hide details" : "Role details"}
            <ChevronDown
              className={cn("h-3.5 w-3.5 transition-transform duration-300", open && "rotate-180")}
              aria-hidden="true"
            />
          </button>

          {open ? (
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-navy/40">What you own</h4>
                <ul className="mt-3 space-y-2">
                  {responsibilities.map((item) => (
                    <li key={item} className="flex gap-2 text-[12.5px] leading-relaxed text-navy/65">
                      <span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-electric" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-navy/40">What we look for</h4>
                <ul className="mt-3 space-y-2">
                  {requirements.map((item) => (
                    <li key={item} className="flex gap-2 text-[12.5px] leading-relaxed text-navy/65">
                      <span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-mint" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}