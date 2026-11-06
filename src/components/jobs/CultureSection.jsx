import { Compass, HeartHandshake, Sprout } from "lucide-react";
import { Image } from "@/components/ui/image";
import SectionHeading from "@/components/site/SectionHeading";

const values = [
  {
    icon: HeartHandshake,
    title: "Small team, real ownership",
    body: "Every planner owns their journeys end to end — no handovers between departments, no scripts to read from.",
  },
  {
    icon: Compass,
    title: "Travel is part of the job",
    body: "Two research trips a year on us, plus time to walk the routes we sell before we sell them.",
  },
  {
    icon: Sprout,
    title: "Slower, lighter travel",
    body: "Rail over flights, longer stays and local partners. Sustainability decisions are made in the planning, not marketing.",
  },
];

export default function CultureSection() {
  return (
    <section className="section bg-white">
      <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Life at RITA"
            title="A studio of route obsessives"
            subtitle="We are twelve people in Amsterdam and across Europe, planning a few hundred journeys a year — deliberately fewer than we could sell."
          />

          <div className="mt-9 grid gap-4 sm:grid-cols-3">
            {values.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-[20px] border border-navy/10 bg-cloud/60 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-electric/30 hover:bg-white hover:shadow-[0_24px_48px_-32px_rgba(10,31,68,0.55)]"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-electric shadow-[0_10px_24px_-18px_rgba(10,31,68,0.6)]">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-heading text-[14px] font-semibold leading-snug text-navy">{item.title}</h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-navy/60">{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[26px] border border-navy/10">
            <Image
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
              alt="The RITA team working together around a planning table"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-6 right-6 rounded-[20px] border border-navy/10 bg-white p-5 soft-shadow sm:left-10 sm:right-auto sm:max-w-[280px]">
            <p className="font-heading text-[26px] font-semibold leading-none tracking-[-0.02em] text-navy">4.9/5</p>
            <p className="mt-2 text-[12px] leading-relaxed text-navy/55">
              Average guest rating across 640 journeys planned by this team.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}