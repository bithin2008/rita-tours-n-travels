"use client";
import Link from "next/link";
import { ArrowUpRight, Clock, Heart, Leaf, MapPin } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useApp } from "@/lib/AppContext";
import { formatPrice } from "@/lib/data-service";
import { cn } from "@/lib/utils";

export default function TourCard({ tour }) {
  const { t, currency, isWished, toggleWishlist } = useApp();
  const wished = isWished(tour.id);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-navy/10 bg-white shadow-[0_20px_45px_-38px_rgba(10,31,68,0.65)] transition-all duration-500 hover:-translate-y-1.5 hover:border-electric/25 hover:shadow-[0_36px_60px_-34px_rgba(10,31,68,0.45)]">
      <Link href={`/tours/${tour.id}`} className="block h-full">
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-navy">
          <Image
            src={tour.image}
            alt={`${tour.title} — ${tour.destination}, ${tour.country}`}
            className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.07]"
            loading="lazy"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,31,68,0.32)_0%,rgba(10,31,68,0.02)_38%,rgba(10,31,68,0.62)_100%)]"
          />

          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-4">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-white/92 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-navy backdrop-blur-sm">
                {tour.category}
              </span>
              {tour.eco ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-mint/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-navy">
                  <Leaf className="h-3 w-3" aria-hidden="true" />
                  {t("label.eco")}
                </span>
              ) : null}
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(tour.id);
              }}
              aria-pressed={wished}
              aria-label={wished ? `Remove ${tour.title} from wishlist` : `Save ${tour.title} to wishlist`}
              className={cn(
                "grid h-9 w-9 shrink-0 place-items-center rounded-full border backdrop-blur-sm transition-all duration-300",
                wished
                  ? "border-coral bg-coral text-white"
                  : "border-white/50 bg-white/15 text-white hover:border-white hover:bg-white hover:text-coral",
              )}
            >
              <Heart className={cn("h-4 w-4", wished && "fill-current")} aria-hidden="true" />
            </button>
          </div>

          <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-navy/65 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm">
            <Clock className="h-3 w-3 text-mint" aria-hidden="true" />
            {tour.durationLabel ?? `${tour.durationNights} ${t("label.nights")}`}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <p className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-navy/45">
            <MapPin className="h-3 w-3 text-electric" aria-hidden="true" />
            {tour.destination}, {tour.country}
          </p>

          <h3 className="mt-2 line-clamp-2 min-h-[3.05rem] font-heading text-[18px] font-semibold leading-snug text-navy">
            {tour.title}
          </h3>

          <p className="mt-1.5 line-clamp-2 min-h-[2.5rem] text-[12.5px] leading-relaxed text-navy/55">{tour.summary}</p>

          <div aria-hidden="true" className="flex-1" />

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-navy/[0.08] pt-4">
            <div className="leading-none">
              <span className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-navy/40">
                {t("label.from")}
              </span>
              <p className="mt-1 flex items-baseline gap-1">
                <span className="font-heading text-[19px] font-semibold text-navy">
                  {formatPrice(tour.priceFrom, currency)}
                </span>
                <span className="text-[10.5px] font-medium text-navy/45">{t("label.perPerson")}</span>
              </p>
            </div>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy text-white">
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}