"use client";
import { useRef, useState } from "react";
import { ArrowDown, Sparkles } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import SectionHeading from "@/components/site/SectionHeading";
import CultureSection from "@/components/jobs/CultureSection";
import JobCard from "@/components/jobs/JobCard";
import ApplicationForm from "@/components/jobs/ApplicationForm";
import Reveal from "@/components/animation/Reveal";

const HIRES = [
  { title: "You apply", body: "A short form and a few lines about what you would bring. No cover-letter theatre." },
  { title: "A conversation", body: "45 minutes with the team lead — about journeys, not trick questions." },
  { title: "A planning exercise", body: "Plan a three-day route for a real brief. Paid, and yours to keep." },
];

export default function JobsClient({ openings }) {
  const [role, setRole] = useState("");
  const formRef = useRef(null);

  const applyFor = (title) => {
    setRole(title);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <main>
        <PageHero
          eyebrow="Careers"
          title="Plan journeys for a living"
          subtitle="We are a small European studio who believe the best itineraries come from people who have walked the streets themselves. If that sounds like your kind of work, we would like to meet you."
          image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1800&q=80"
          imageAlt="A team collaborating around a table"
        >
          <a
            href="#open-roles"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-[12.5px] font-semibold text-white ring-1 ring-inset ring-white/25 backdrop-blur transition-colors hover:bg-white hover:text-navy"
          >
            See open roles
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </a>
        </PageHero>

        <Reveal>
          <CultureSection />
        </Reveal>

        <section id="open-roles" className="section scroll-mt-24 bg-cloud">
          <Reveal className="shell">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="Open roles"
                title="Where we need help right now"
                subtitle="Roles are listed as they open. Everything is hybrid from Amsterdam unless stated otherwise."
              />
              <span className="shrink-0 rounded-full border border-navy/12 bg-white px-4 py-2 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-navy/50">
                {openings.length} open {openings.length === 1 ? "role" : "roles"}
              </span>
            </div>

            <div className="mt-9 space-y-4">
              {openings.map((job) => (
                <JobCard key={job.id} job={job} onApply={applyFor} />
              ))}

              {openings.length === 0 ? (
                <div className="rounded-[22px] border border-dashed border-navy/15 bg-white px-6 py-14 text-center">
                  <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-electric/10 text-electric">
                    <Sparkles className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="mt-4 font-heading text-[16px] font-semibold text-navy">No open roles this week</p>
                  <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-navy/55">
                    We still read speculative applications — tell us the job you would invent here.
                  </p>
                </div>
              ) : null}
            </div>
          </Reveal>
        </section>

        <section id="apply" ref={formRef} className="section scroll-mt-24 bg-white">
          <Reveal className="shell grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Apply"
                title="One form, read by a person"
                subtitle="No ATS keyword games. Tell us what you have planned and where you want to go next."
              />

              <ol className="mt-8 space-y-5">
                {HIRES.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-electric/10 font-heading text-[12.5px] font-semibold text-electric">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-heading text-[14.5px] font-semibold text-navy">{step.title}</h3>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-navy/60">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <p className="mt-8 rounded-2xl border border-navy/10 bg-cloud/60 p-4 text-[12px] leading-relaxed text-navy/55">
                RITA is an equal-opportunity employer. Applications are stored securely and kept for twelve months
                unless you ask us to delete them.
              </p>
            </div>

            <ApplicationForm
              roles={openings.map((job) => job.title)}
              role={role}
              onRoleChange={setRole}
            />
          </Reveal>
        </section>
      </main>
    </>
  );
}
