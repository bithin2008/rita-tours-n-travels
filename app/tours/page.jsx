"use client";
import PageHero from "@/components/site/PageHero";
import FilterPanel from "@/components/tours/FilterPanel";
import ToursToolbar from "@/components/tours/ToursToolbar";
import TourListRow from "@/components/tours/TourListRow";
import CustomTripCard from "@/components/tours/CustomTripCard";
import TourCard from "@/components/home/TourCard";
import TourDialog from "@/components/home/TourDialog";
import FinalCta from "@/components/home/FinalCta";
import RevealGroup from "@/components/animation/RevealGroup";
import Reveal from "@/components/animation/Reveal";
import { getMoods, getTourList } from "@/lib/data-service";
import { countActiveFilters, createEmptyFilters, filterTours, sortTours } from "@/lib/tour-filters";
import { cn } from "@/lib/utils";
import { useState } from "react";

const tours = getTourList();
const destinations = Array.from(new Set(tours.map((tour) => tour.destination))).sort();
const categories = Array.from(new Set(tours.map((tour) => tour.category))).sort();
const moods = getMoods();
const priceBounds = {
  min: Math.floor(Math.min(...tours.map((tour) => tour.priceFrom)) / 50) * 50,
  max: Math.ceil(Math.max(...tours.map((tour) => tour.priceFrom)) / 50) * 50,
};
const initialFilters = createEmptyFilters(priceBounds.max);

export default function ToursPage() {
  const [filters, setFilters] = useState(initialFilters);
  const [sort, setSort] = useState("recommended");
  const [view, setView] = useState("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [dialog, setDialog] = useState({ tourId: null, open: false });

  const activeCount = countActiveFilters(filters, priceBounds.max);
  const results = sortTours(filterTours(tours, filters), sort);
  const reset = () => setFilters(initialFilters);

  const toggleFilters = () => {
    const next = !filtersOpen;
    setFiltersOpen(next);
    if (next) {
      window.setTimeout(() => {
        document.getElementById("tour-filters")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
    }
  };

  const openTour = (tourId) => setDialog({ tourId, open: true });

  return (
    <>

      <main>
        <PageHero
          eyebrow="Tours"
          title="Every journey in the catalogue."
          subtitle="Hand-built weeks and short escapes across six European countries. Filter by place, season, budget and mood — then open any journey for the full picture."
          image="images/tours-banner.jpg"
          imageAlt="Alpine peaks reflected in a still Swiss lake"
        />

        <div className="shell grid gap-8 pt-8 lg:grid-cols-[290px_minmax(0,1fr)] lg:items-start lg:pt-10">
          <aside className="lg:sticky lg:top-24">
            <div id="tour-filters" className={cn("scroll-mt-24 lg:block", filtersOpen ? "block" : "hidden")}>
              <FilterPanel
                filters={filters}
                onChange={setFilters}
                onReset={reset}
                destinations={destinations}
                categories={categories}
                moods={moods}
                bounds={priceBounds}
                activeCount={activeCount}
              />
            </div>
            <div className="mt-4">
              <CustomTripCard />
            </div>
          </aside>

          <div>
            <Reveal>
              <ToursToolbar
                count={results.length}
                sort={sort}
                onSortChange={setSort}
                view={view}
                onViewChange={setView}
                activeCount={activeCount}
                onOpenFilters={toggleFilters}
              />
            </Reveal>

            {results.length ? (
              view === "grid" ? (
                <RevealGroup className="mt-5 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {results.map((tour) => (
                    <TourCard key={tour.id} tour={tour} />
                  ))}
                </RevealGroup>
              ) : (
                <div className="mt-5 flex flex-col gap-4">
                  {results.map((tour) => (
                    <TourListRow key={tour.id} tour={tour} onOpen={openTour} />
                  ))}
                </div>
              )
            ) : (
              <div className="mt-5 flex flex-col items-center gap-4 rounded-[22px] border border-dashed border-navy/15 bg-white px-6 py-16 text-center">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-electric/10 text-electric">
                  <svg className="h-5 w-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </span>
                <p className="max-w-md text-[14.5px] leading-relaxed text-navy/65">
                  No journey matches those filters yet. Widen the season or budget — or let a planner build the trip
                  around your dates instead.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={reset}
                    className="rounded-full bg-navy px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-electric"
                  >
                    Clear filters
                  </button>
                  <a
                    href="/tour-planning"
                    className="rounded-full border border-navy/15 px-5 py-2.5 text-[13px] font-semibold text-navy transition-colors hover:border-electric hover:text-electric"
                  >
                    Plan a custom trip
                  </a>
                </div>
              </div>
            )}

            <p className="mt-6 text-[11.5px] leading-relaxed text-navy/40">
              Prices are per person in EUR, based on two sharing, and exclude international flights. Every journey is
              confirmed with a personal quotation before anything is booked.
            </p>
          </div>
        </div>

        <Reveal className="mt-20">
          <FinalCta />
        </Reveal>
      </main>


      <TourDialog
        tourId={dialog.tourId}
        open={dialog.open}
        onOpenChange={(open) => setDialog((current) => ({ ...current, open }))}
      />
    </>
  );
}
