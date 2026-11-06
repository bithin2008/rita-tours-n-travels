import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import { DURATION_BUCKETS, MONTHS } from "@/lib/tour-filters";
import { cn } from "@/lib/utils";

const labelClass = "text-[10.5px] font-semibold uppercase tracking-[0.14em] text-navy/45";

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors",
        active
          ? "border-electric bg-electric/10 text-electric"
          : "border-navy/12 text-navy/65 hover:border-navy/30 hover:text-navy",
      )}
    >
      {children}
    </button>
  );
}

export default function FilterPanel({ filters, onChange, onReset, destinations, categories, moods, bounds, activeCount }) {
  const patch = (next) => onChange({ ...filters, ...next });
  const toggleMood = (id) =>
    patch({ moods: filters.moods.includes(id) ? filters.moods.filter((mood) => mood !== id) : [...filters.moods, id] });

  return (
    <div className="rounded-[26px] border border-navy/10 bg-white p-5 shadow-[0_30px_60px_-52px_rgba(10,31,68,0.75)]">
      <div className="flex items-center justify-between gap-3 border-b border-navy/[0.07] pb-4">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-electric/10 text-electric">
            <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <h2 className="font-heading text-[15px] font-semibold text-navy">Refine</h2>
          {activeCount ? (
            <span className="rounded-full bg-electric px-2 py-0.5 text-[10px] font-semibold text-white">{activeCount}</span>
          ) : null}
        </div>
        {activeCount ? (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-electric transition-colors hover:text-navy"
          >
            <RotateCcw className="h-3 w-3" aria-hidden="true" />
            Reset
          </button>
        ) : null}
      </div>

      <div className="relative mt-4">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/35" aria-hidden="true" />
        <label htmlFor="tour-search" className="sr-only">
          Search journeys
        </label>
        <input
          id="tour-search"
          value={filters.query}
          onChange={(event) => patch({ query: event.target.value })}
          placeholder="Search journeys or places"
          className="h-11 w-full rounded-2xl border border-navy/12 bg-cloud/60 pl-9 pr-3 text-[13px] text-navy outline-none transition-all placeholder:text-navy/35 hover:border-navy/25 focus:border-electric focus:shadow-[0_0_0_3px_rgba(30,107,255,0.12)]"
        />
      </div>

      <div className="mt-5 space-y-5">
        <div>
          <label htmlFor="filter-destination" className={labelClass}>
            Destination
          </label>
          <select
            id="filter-destination"
            value={filters.destination}
            onChange={(event) => patch({ destination: event.target.value })}
            className="mt-2 h-11 w-full rounded-2xl border border-navy/12 bg-white px-3 text-[13px] text-navy outline-none transition-colors hover:border-navy/25 focus:border-electric"
          >
            <option value="all">All destinations</option>
            {destinations.map((destination) => (
              <option key={destination} value={destination}>
                {destination}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className={labelClass}>Journey type</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Chip active={filters.category === "all"} onClick={() => patch({ category: "all" })}>
              All
            </Chip>
            {categories.map((category) => (
              <Chip key={category} active={filters.category === category} onClick={() => patch({ category })}>
                {category}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <p className={labelClass}>Trip length</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Chip active={filters.duration === "all"} onClick={() => patch({ duration: "all" })}>
              Any
            </Chip>
            {DURATION_BUCKETS.map((bucket) => (
              <Chip key={bucket.value} active={filters.duration === bucket.value} onClick={() => patch({ duration: bucket.value })}>
                {bucket.label}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="filter-month" className={labelClass}>
            Travelling in
          </label>
          <select
            id="filter-month"
            value={filters.month}
            onChange={(event) => patch({ month: event.target.value })}
            className="mt-2 h-11 w-full rounded-2xl border border-navy/12 bg-white px-3 text-[13px] text-navy outline-none transition-colors hover:border-navy/25 focus:border-electric"
          >
            <option value="all">Any month</option>
            {MONTHS.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="filter-price" className={labelClass}>
              Max price per person
            </label>
            <span className="rounded-full bg-navy px-2.5 py-1 text-[11px] font-semibold text-white">
              €{filters.maxPrice?.toLocaleString("en-US")}
            </span>
          </div>
          <input
            id="filter-price"
            type="range"
            min={bounds.min}
            max={bounds.max}
            step={50}
            value={filters.maxPrice}
            onChange={(event) => patch({ maxPrice: Number(event.target.value) })}
            className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-navy/15 accent-electric"
          />
          <div className="mt-1.5 flex justify-between text-[10.5px] text-navy/40">
            <span>€{bounds.min.toLocaleString("en-US")}</span>
            <span>€{bounds.max.toLocaleString("en-US")}</span>
          </div>
        </div>

        <div>
          <p className={labelClass}>Mood</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {moods.map((mood) => (
              <Chip key={mood.id} active={filters.moods.includes(mood.id)} onClick={() => toggleMood(mood.id)}>
                {mood.title}
              </Chip>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => patch({ eco: !filters.eco })}
          aria-pressed={filters.eco}
          className={cn(
            "flex w-full items-center justify-between rounded-2xl border px-3.5 py-3 text-[12.5px] font-medium transition-colors",
            filters.eco ? "border-mint bg-mint/10 text-[#0d7a70]" : "border-navy/12 text-navy/65 hover:border-navy/30",
          )}
        >
          Eco-conscious only
          <span
            className={cn(
              "relative h-4 w-7 rounded-full transition-colors",
              filters.eco ? "bg-mint" : "bg-navy/20",
            )}
            aria-hidden="true"
          >
            <span
              className={cn(
                "absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all",
                filters.eco ? "left-3.5" : "left-0.5",
              )}
            />
          </span>
        </button>
      </div>
    </div>
  );
}