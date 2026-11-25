"use client";
import Link from "next/link";
import { ArrowRight, SearchX, X } from "lucide-react";
import SectionHeading from "@/components/site/SectionHeading";
import TourCard from "@/components/home/TourCard";
import RevealGroup from "@/components/animation/RevealGroup";
import { getTourList, searchTours } from "@/lib/data-service";
import { useApp } from "@/lib/AppContext";

export default function FeaturedTours({ filters, onClear, onOpen }) {
  const { t } = useApp();
  const searching = Boolean(filters);
  const tours = searching ? searchTours(filters) : getTourList();

  return (
    <section id="experiences" className="section scroll-mt-24 bg-cloud">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={searching ? t("search.button") : "01 — Featured experiences"}
            title={t("section.experiences")}
            subtitle={t("section.experiencesSub")}
          />
          <Link
            href="/tours"
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-navy/15 px-5 py-2.5 text-[13px] font-semibold text-navy transition-colors duration-300 hover:border-electric hover:text-electric"
          >
            {t("cta.viewAllTours")}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3" aria-live="polite">
          {searching ? (
            <>
              <p className="text-[13px] font-medium text-navy/70">
                <strong className="font-semibold text-navy">{tours.length}</strong> {t("tours.results")}
              </p>
              <button
                type="button"
                onClick={onClear}
                className="inline-flex items-center gap-1.5 rounded-full bg-navy/5 px-3 py-1.5 text-[12px] font-semibold text-navy/70 transition-colors hover:bg-navy/10 hover:text-navy"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
                {t("tours.clear")}
              </button>
            </>
          ) : (
            <p className="text-[13px] text-navy/50">{t("tours.showingAll")}</p>
          )}
        </div>

        {tours.length ? (
          <RevealGroup className="mt-6 grid grid-cols-4 gap-5">
            {tours.slice(0, 4).map((tour) => (
              <TourCard key={tour.id} tour={tour} onOpen={onOpen} />
            ))}
          </RevealGroup>
        ) : (
          <div className="mt-8 flex flex-col items-center gap-4 rounded-[22px] border border-dashed border-navy/15 bg-white px-6 py-14 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-electric/10 text-electric">
              <SearchX className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="max-w-md text-[15px] leading-relaxed text-navy/70">{t("tours.noResults")}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={onClear}
                className="rounded-full bg-electric px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#1560f0]"
              >
                {t("tours.clear")}
              </button>
              <Link
                href="/tour-planning"
                className="rounded-full border border-navy/15 px-5 py-2.5 text-[13px] font-semibold text-navy transition-colors hover:border-electric hover:text-electric"
              >
                {t("cta.planJourney")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}