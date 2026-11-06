import { useState } from "react";
import { ArrowUpRight, CalendarRange, Sparkles } from "lucide-react";
import { Image } from "@/components/ui/image";
import SectionHeading from "@/components/site/SectionHeading";
import { getDestinations, getTourById } from "@/lib/data-service";
import { useApp } from "@/lib/AppContext";
import { cn } from "@/lib/utils";

export default function DestinationExplorer({ onOpenTour }) {
  const { t } = useApp();
  const destinations = getDestinations();
  const [activeId, setActiveId] = useState(destinations[0].id);
  const active = destinations.find((item) => item.id === activeId) ?? destinations[0];
  const featuredTour = getTourById(active.featuredTourId);

  return (
    <section id="destinations" className="section scroll-mt-24 bg-cloud">
      <div className="shell">
        <SectionHeading
          eyebrow="03 — Destination explorer"
          title={t("section.destinations")}
          subtitle={t("section.destinationsSub")}
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar lg:flex-col lg:gap-1.5 lg:overflow-visible lg:pb-0">
              {destinations.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  aria-pressed={item.id === activeId}
                  className={cn(
                    "flex shrink-0 items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-300 lg:w-full",
                    item.id === activeId
                      ? "border-transparent bg-navy text-white shadow-[0_18px_40px_-28px_rgba(10,31,68,0.8)]"
                      : "border-navy/10 bg-white text-navy hover:border-electric/40",
                  )}
                >
                  <span className="font-heading text-[15px] font-semibold">{item.name}</span>
                  <ArrowUpRight
                    className={cn(
                      "h-4 w-4 transition-transform duration-300",
                      item.id === activeId ? "text-mint" : "text-navy/30",
                    )}
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8">
            <div key={active.id} className="animate-fade overflow-hidden rounded-[24px] bg-white soft-shadow">
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={active.image}
                  alt={`${active.name} — travel photography`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
                <h3 className="absolute bottom-5 left-6 font-heading text-[26px] font-semibold text-white">
                  {active.name}
                </h3>
              </div>

              <div className="grid gap-6 p-6 sm:p-7 lg:grid-cols-5">
                <div className="lg:col-span-3">
                  <p className="text-[15px] leading-relaxed text-navy/70">{active.description}</p>

                  <h4 className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy/45">
                    Popular experiences
                  </h4>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {active.experiences.map((experience) => (
                      <li
                        key={experience}
                        className="inline-flex items-center gap-1.5 rounded-full bg-cloud px-3 py-1.5 text-[12.5px] font-medium text-navy/75"
                      >
                        <Sparkles className="h-3 w-3 text-mint" aria-hidden="true" />
                        {experience}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-2">
                  <div className="rounded-2xl border border-navy/10 bg-cloud/70 p-4">
                    <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/45">
                      <CalendarRange className="h-3.5 w-3.5" aria-hidden="true" />
                      Best season
                    </p>
                    <p className="mt-1.5 text-[14px] font-medium text-navy">{active.bestSeason}</p>
                  </div>

                  {featuredTour ? (
                    <div className="mt-3 rounded-2xl border border-navy/10 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/45">
                        Featured journey
                      </p>
                      <p className="mt-1.5 font-heading text-[15px] font-semibold leading-snug text-navy">
                        {featuredTour.title}
                      </p>
                      <button
                        type="button"
                        onClick={() => onOpenTour(featuredTour.id)}
                        className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-electric px-4 py-2.5 text-[12.5px] font-semibold text-white transition-colors hover:bg-[#1560f0]"
                      >
                        {t("cta.exploreExperience")}
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}