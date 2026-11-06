import { Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Headset, Leaf, MapPinned, Sparkles } from "lucide-react";
import SectionHeading from "@/components/site/SectionHeading";
import { useApp } from "@/lib/AppContext";

const values = [
  {
    icon: Sparkles,
    title: "Personalised planning",
    body: "A real planner reads your answers and builds the route around your pace, budget and interests — never a fixed package.",
  },
  {
    icon: Compass,
    title: "Curated experiences",
    body: "Small boats, family-run kitchens and guides we have travelled with ourselves. We only list what we would book for our own families.",
  },
  {
    icon: Headset,
    title: "Dedicated assistance",
    body: "One named contact from first question to last day away, reachable on the phone if a train is cancelled or plans change.",
  },
  {
    icon: MapPinned,
    title: "Memorable destinations",
    body: "Fewer places, properly seen. We plan around the quiet hours so the places you came for are the places you actually experience.",
  },
  {
    icon: Leaf,
    title: "Responsible travel",
    body: "Longer stays, rail where it works and local partners who keep the money in the region. Fewer flights, better trips.",
  },
];

export default function WhyRita() {
  const { t } = useApp();

  return (
    <section id="why-rita" className="section scroll-mt-24 bg-white">
      <div className="shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="07 — Why RITA" title={t("section.why")} subtitle={t("section.whySub")} />
          <Link
            to="/about"
            className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-navy/15 px-5 py-2.5 text-[13px] font-semibold text-navy transition-colors hover:border-electric hover:text-electric"
          >
            Our story & team
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {values.map((item, index) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="group rounded-[20px] border border-navy/10 bg-cloud/60 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-electric/30 hover:bg-white hover:shadow-[0_24px_48px_-32px_rgba(10,31,68,0.55)]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-electric shadow-[0_10px_24px_-18px_rgba(10,31,68,0.6)] transition-colors duration-500 group-hover:bg-electric group-hover:text-white">
                  <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-heading text-[15.5px] font-semibold leading-snug text-navy">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-navy/60">{item.body}</p>
                <span className="mt-4 block text-[10px] font-semibold uppercase tracking-[0.2em] text-navy/25">
                  0{index + 1}
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}