"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Image } from "@/components/ui/image";
import SearchCard from "@/components/home/SearchCard";
import useReducedMotion from "@/hooks/useReducedMotion";
import { formatPrice, getTourList } from "@/lib/data-service";
import { useApp } from "@/lib/AppContext";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 5000;

export default function Hero({ onSearch, onOpenTour }) {
  const { t, currency } = useApp();
  const slides = getTourList().slice(0, 4);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const pointerStart = useRef(null);

  const go = useCallback((next) => {
    setIndex((current) => (next + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (paused || reduced) return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % slides.length), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, reduced, slides.length]);

  const onPointerDown = (event) => {
    pointerStart.current = event.clientX;
  };
  const onPointerUp = (event) => {
    if (pointerStart.current === null) return;
    const delta = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(delta) > 60) go(index + (delta < 0 ? 1 : -1));
  };

  const slide = slides[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured European destinations"
      className="relative isolate min-h-[94vh] overflow-hidden bg-navy"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") go(index + 1);
        if (event.key === "ArrowLeft") go(index - 1);
      }}
    >
      {slides.map((item, slideIndex) => (
        <div
          key={item.id}
          aria-hidden={slideIndex !== index}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-out",
            slideIndex === index ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={item.heroImage}
            alt={`${item.destination}, ${item.country} — ${item.title}`}
            className={cn(
              "h-full w-full object-cover",
              slideIndex === index && !reduced && "animate-kenburns",
            )}
            loading={slideIndex === 0 ? "eager" : "lazy"}
            fetchPriority={slideIndex === 0 ? "high" : "auto"}
          />
        </div>
      ))}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(100deg,rgba(10,31,68,0.98)_0%,rgba(10,31,68,0.85)_45%,rgba(10,31,68,0.6)_70%,rgba(10,31,68,0.75)_100%)]"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy/80 to-transparent" />

      <div className="shell relative z-10 grid min-h-[94vh] grid-cols-1 items-center gap-10 pb-16 pt-32 lg:grid-cols-12 lg:gap-8 lg:pb-20 lg:pt-28">
        <div className="lg:col-span-7">
          <div key={slide.id} className="animate-enter">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
              <MapPin className="h-3.5 w-3.5 text-mint" aria-hidden="true" />
              {slide.destination} · {slide.country}
            </span>

            <h1 className="mt-6 max-w-[15ch] font-heading text-[38px] font-semibold leading-[1.06] tracking-[-0.03em] text-white sm:text-[52px] lg:text-[62px]">
              {slide.heroTitle}
            </h1>

            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/80 sm:text-[17px]">
              {slide.heroDescription}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => onOpenTour(slide.id)}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-electric px-6 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#1560f0] hover:shadow-[0_18px_36px_-16px_rgba(30,107,255,0.9)]"
              >
                {t("hero.explore")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onOpenTour(slide.id, "enquiry")}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/40 px-6 text-sm font-semibold text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-navy"
              >
                {t("hero.plan")}
              </button>
            </div>

            <dl className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-white/80">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.18em] text-white/50">{t("search.travellers")}</dt>
                <dd className="mt-0.5 text-sm font-medium">Max {slide.maxTravellers}</dd>
              </div>
              <div className="h-8 w-px bg-white/20" aria-hidden="true" />
              <div>
                <dt className="text-[10px] uppercase tracking-[0.18em] text-white/50">{t("label.nights")}</dt>
                <dd className="mt-0.5 text-sm font-medium">{slide.durationNights} {t("label.nights")}</dd>
              </div>
              <div className="h-8 w-px bg-white/20" aria-hidden="true" />
              <div>
                <dt className="text-[10px] uppercase tracking-[0.18em] text-white/50">{t("label.from")}</dt>
                <dd className="mt-0.5 text-sm font-medium">{formatPrice(slide.priceFrom, currency)}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex items-center gap-2" role="tablist" aria-label="Choose a destination">
              {slides.map((item, dotIndex) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={dotIndex === index}
                  aria-label={`${item.destination} — slide ${dotIndex + 1} of ${slides.length}`}
                  onClick={() => go(dotIndex)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    dotIndex === index ? "w-9 bg-white" : "w-4 bg-white/35 hover:bg-white/60",
                  )}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous destination"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/30 text-white transition-colors hover:border-white hover:bg-white/10"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next destination"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/30 text-white transition-colors hover:border-white hover:bg-white/10"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <span className="text-[11px] font-semibold tracking-[0.14em] text-white/50">
              {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 lg:justify-self-end xl:col-span-4">
          <SearchCard onSearch={onSearch} />
        </div>
      </div>
    </section>
  );
}