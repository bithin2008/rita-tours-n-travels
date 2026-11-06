import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { SORT_OPTIONS } from "@/lib/tour-filters";
import { cn } from "@/lib/utils";

export default function ToursToolbar({ count, sort, onSortChange, view, onViewChange, onOpenFilters, activeCount }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-[20px] border border-navy/10 bg-white/95 px-4 py-3 shadow-[0_18px_40px_-42px_rgba(10,31,68,0.9)] backdrop-blur">
      <p className="flex items-center gap-2 text-[13px] text-navy/60" aria-live="polite">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-mint" />
        <strong className="font-heading text-[15px] font-semibold text-navy">{count}</strong>{" "}
        {count === 1 ? "journey" : "journeys"} available
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onOpenFilters}
          className="inline-flex items-center gap-1.5 rounded-full border border-navy/15 px-3 py-2 text-[12px] font-semibold text-navy/75 transition-colors hover:border-electric hover:text-electric lg:hidden"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
          Filters
          {activeCount ? (
            <span className="grid h-4 min-w-4 place-items-center rounded-full bg-electric px-1 text-[10px] font-semibold text-white">
              {activeCount}
            </span>
          ) : null}
        </button>

        <div className="relative">
          <label htmlFor="tour-sort" className="sr-only">
            Sort journeys
          </label>
          <select
            id="tour-sort"
            value={sort}
            onChange={(event) => onSortChange(event.target.value)}
            className="h-10 rounded-full border border-navy/15 bg-white pl-3.5 pr-7 text-[12px] font-medium text-navy/75 outline-none transition-colors hover:border-navy/30 focus:border-electric"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1 rounded-full border border-navy/15 p-1" role="group" aria-label="Change layout">
          <button
            type="button"
            onClick={() => onViewChange("grid")}
            aria-pressed={view === "grid"}
            aria-label="Grid view"
            className={cn(
              "grid h-7 w-7 place-items-center rounded-full transition-colors",
              view === "grid" ? "bg-navy text-white" : "text-navy/50 hover:text-navy",
            )}
          >
            <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onViewChange("list")}
            aria-pressed={view === "list"}
            aria-label="List view"
            className={cn(
              "grid h-7 w-7 place-items-center rounded-full transition-colors",
              view === "list" ? "bg-navy text-white" : "text-navy/50 hover:text-navy",
            )}
          >
            <List className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}