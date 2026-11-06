import { useState } from "react";
import { ArrowRight, Heart } from "lucide-react";
import { Image } from "@/components/ui/image";
import SectionHeading from "@/components/site/SectionHeading";
import { getMoods, getToursForMood, getTourList, formatPrice } from "@/lib/data-service";
import { useApp } from "@/lib/AppContext";
import { cn } from "@/lib/utils";

export default function MoodSelector({ onDiscover, onOpenTour }) {
  const { t, currency, isWished, toggleWishlist } = useApp();
  const moods = getMoods();
  const [activeId, setActiveId] = useState(moods[0].id);
  const active = moods.find((item) => item.id === activeId) ?? moods[0];
  const matches = getToursForMood(active.id);
  const totalTours = getTourList().length;

  return (
    <section id="moods" className="section scroll-mt-24 bg-white">
      <div className="shell">
        <SectionHeading
          eyebrow="04 — Travel mood"
          title={t("section.moods")}
          subtitle={t("section.moodsSub")}
        />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
          {moods.map((mood) => (
            <button
              key={mood.id}
              type="button"
              onClick={() => setActiveId(mood.id)}
              aria-pressed={mood.id === activeId}
              className={cn(
                "group relative isolate aspect-[3/4] overflow-hidden rounded-[18px] text-left transition-all duration-500",
                mood.id === activeId ? "ring-2 ring-electric ring-offset-2 ring-offset-white" : "hover:-translate-y-1",
              )}
            >
              <Image
                src={mood.image}
                alt={mood.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
              />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/25 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-3.5">
                <span className="block font-heading text-[13.5px] font-semibold leading-tight text-white">{mood.title}</span>
                <span className="mt-1 block text-[10.5px] leading-snug text-white/65">{mood.description}</span>
              </span>
            </button>
          ))}
        </div>

        <div key={active.id} className="animate-fade mt-8 rounded-[24px] border border-navy/10 bg-cloud p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="eyebrow">{active.title}</p>
              <h3 className="mt-2 font-heading text-[22px] font-semibold text-navy">
                {matches.length} of {totalTours} journeys suit this mood
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onDiscover(active.id)}
              className="group inline-flex h-12 w-fit items-center gap-2 rounded-full bg-electric px-6 text-[13.5px] font-semibold text-white transition-all duration-300 hover:bg-[#1560f0] hover:shadow-[0_16px_32px_-16px_rgba(30,107,255,0.9)]"
            >
              {t("cta.discoverTrip")}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </div>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {matches.map((tour) => (
              <li key={tour.id} className="flex items-center gap-3 rounded-2xl bg-white p-3">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  className="h-16 w-16 shrink-0 overflow-hidden rounded-xl object-cover"
                  loading="lazy"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-heading text-[14px] font-semibold text-navy">{tour.title}</p>
                  <p className="mt-0.5 text-[11.5px] text-navy/55">
                    {tour.destination} · {formatPrice(tour.priceFrom, currency)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleWishlist(tour.id)}
                  aria-pressed={isWished(tour.id)}
                  aria-label={`Save ${tour.title} to wishlist`}
                  className={cn(
                    "grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors",
                    isWished(tour.id)
                      ? "border-coral bg-coral text-white"
                      : "border-navy/15 text-navy/40 hover:border-coral hover:text-coral",
                  )}
                >
                  <Heart className={cn("h-3.5 w-3.5", isWished(tour.id) && "fill-current")} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenTour(tour.id)}
                  className="shrink-0 rounded-full border border-navy/15 px-3 py-1.5 text-[11.5px] font-semibold text-navy transition-colors hover:border-electric hover:text-electric"
                >
                  {t("cta.exploreExperience")}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}