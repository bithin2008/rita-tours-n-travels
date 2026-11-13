"use client";
import { ArrowRight, Clock, Heart, Leaf, MapPin, Users } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useApp } from "@/lib/AppContext";
import { formatPrice } from "@/lib/data-service";
import { cn } from "@/lib/utils";

export default function TourListRow({ tour, onOpen }) {
  const { t, currency, isWished, toggleWishlist } = useApp();
  const wished = isWished(tour.id);

  return (
    <article className="group grid gap-5 rounded-[22px] border border-navy/10 bg-white p-4 transition-all duration-500 hover:border-electric/25 hover:shadow-[0_26px_50px_-34px_rgba(10,31,68,0.5)] sm:grid-cols-[230px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)_190px] lg:items-center">
      <button
        type="button"
        onClick={() => onOpen(tour.id)}
        className="relative block overflow-hidden rounded-[16px] bg-navy text-left"
        aria-label={`Open ${tour.title}`}
      >
        <Image
          src={tour.image}
          alt={`${tour.title} — ${tour.destination}, ${tour.country}`}
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/92 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-navy">
          {tour.category}
        </span>
      </button>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11.5px] font-medium text-navy/50">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-electric" aria-hidden="true" />
            {tour.destination}, {tour.country}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {tour.durationNights} {t("label.nights")}
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5" aria-hidden="true" />
            Max {tour.maxTravellers}
          </span>
          {tour.eco ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-mint/15 px-2 py-0.5 text-[10.5px] font-semibold text-[#0d7a70]">
              <Leaf className="h-3 w-3" aria-hidden="true" />
              {t("label.eco")}
            </span>
          ) : null}
        </div>

        <h3 className="mt-2 font-heading text-[19px] font-semibold leading-snug text-navy">{tour.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-navy/60">{tour.summary}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {tour.highlights.slice(0, 2).map((highlight) => (
            <span key={highlight} className="rounded-full bg-cloud px-2.5 py-1 text-[11px] text-navy/55">
              {highlight}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-navy/10 pt-4 sm:col-span-2 lg:col-span-1 lg:flex-col lg:items-end lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
        <div className="lg:text-right">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-navy/40">{t("label.from")}</p>
          <p className="font-heading text-[20px] font-semibold text-navy">{formatPrice(tour.priceFrom, currency)}</p>
          <p className="text-[10.5px] text-navy/45">{t("label.perPerson")}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => toggleWishlist(tour.id)}
            aria-pressed={wished}
            aria-label={wished ? `Remove ${tour.title} from wishlist` : `Save ${tour.title} to wishlist`}
            className={cn(
              "grid h-9 w-9 place-items-center rounded-full border transition-colors",
              wished ? "border-coral bg-coral text-white" : "border-navy/15 text-navy/50 hover:border-coral hover:text-coral",
            )}
          >
            <Heart className={cn("h-4 w-4", wished && "fill-current")} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onOpen(tour.id)}
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-navy px-4 text-[12px] font-semibold text-white transition-colors hover:bg-electric"
          >
            Details
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}