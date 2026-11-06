import { MapPin } from "lucide-react";
import SectionHeading from "@/components/site/SectionHeading";

export default function TeamSection({ team }) {
  return (
    <section id="team" className="section scroll-mt-24 bg-white">
      <div className="shell">
        <SectionHeading eyebrow={team.eyebrow} title={team.title} subtitle={team.subtitle} />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.members.map((member) => (
            <article
              key={member.name}
              className="group rounded-[22px] border border-navy/10 bg-cloud/60 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-electric/30 hover:bg-white hover:shadow-[0_24px_48px_-32px_rgba(10,31,68,0.5)]"
            >
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(140deg,#0A1F44_0%,#163B77_100%)] font-heading text-[16px] font-semibold tracking-[0.04em] text-white">
                  {member.initials}
                </span>
                <div className="min-w-0">
                  <h3 className="font-heading text-[15.5px] font-semibold leading-tight text-navy">{member.name}</h3>
                  <p className="mt-1 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-electric">{member.role}</p>
                </div>
              </div>

              <p className="mt-4 text-[13px] leading-relaxed text-navy/60">{member.focus}</p>

              <p className="mt-4 flex items-center gap-1.5 text-[11.5px] font-medium text-navy/45">
                <MapPin className="h-3.5 w-3.5 text-mint" aria-hidden="true" />
                {member.base}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}