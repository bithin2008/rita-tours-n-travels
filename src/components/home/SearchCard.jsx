"use client";
import { useMemo, useState } from "react";
import { format } from "date-fns";
import { CalendarDays, MapPin, Minus, Plus, Search, Users } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getDestinationOptions } from "@/lib/data-service";
import { useApp } from "@/lib/AppContext";
import { cn } from "@/lib/utils";

function Stepper({ label, value, min, max, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div>
        <p className="text-[13px] font-semibold text-navy">{label}</p>
        <p className="text-[11px] text-navy/50">{min === 1 ? "Ages 12+" : "Ages 2–11"}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="grid h-8 w-8 place-items-center rounded-full border border-navy/15 text-navy transition-colors hover:border-electric hover:text-electric disabled:opacity-35 disabled:hover:border-navy/15 disabled:hover:text-navy"
        >
          <Minus className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
        <span aria-live="polite" className="w-5 text-center text-sm font-semibold text-navy">{value}</span>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="grid h-8 w-8 place-items-center rounded-full border border-navy/15 text-navy transition-colors hover:border-electric hover:text-electric disabled:opacity-35 disabled:hover:border-navy/15 disabled:hover:text-navy"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export default function SearchCard({ onSearch }) {
  const { t } = useApp();
  const [destination, setDestination] = useState("");
  const [range, setRange] = useState({ from: null, to: null });
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [datesOpen, setDatesOpen] = useState(false);
  const [travellersOpen, setTravellersOpen] = useState(false);

  const destinations = useMemo(
    () => getDestinationOptions().filter((option) => option.value !== "anywhere"),
    [],
  );

  const travellersLabel = `${adults} ${t("search.adults").toLowerCase()}${children ? ` · ${children} ${t("search.children").toLowerCase()}` : ""}`;
  const dateLabel = range.from
    ? `${format(range.from, "dd MMM")} – ${range.to ? format(range.to, "dd MMM") : "…"}`
    : t("search.datesPlaceholder");

  const submit = () => {
    onSearch({
      destination: destination.trim() || "anywhere",
      startDate: range.from ? format(range.from, "yyyy-MM-dd") : null,
      endDate: range.to ? format(range.to, "yyyy-MM-dd") : null,
      adults,
      children,
    });
  };

  const fieldShell = "w-full rounded-xl border border-navy/10 bg-white px-3 py-2.5 text-left transition-colors hover:border-electric/45";

  return (
    <div
      id="search-panel"
      className="w-full scroll-mt-28 rounded-[26px] border border-white/60 bg-white/95 p-5 text-navy card-shadow backdrop-blur-xl sm:p-6"
    >
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-electric/10 text-electric">
          <Search className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
        <p className="font-heading text-[13px] font-semibold uppercase tracking-[0.16em] text-navy/70">
          {t("search.title")}
        </p>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="search-destination" className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/55">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {t("search.destination")}
          </label>
          <input
            id="search-destination"
            type="text"
            list="rita-destinations"
            autoComplete="off"
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            placeholder={t("search.destinationPlaceholder")}
            className={cn(fieldShell, "text-sm font-medium placeholder:font-normal placeholder:text-navy/40")}
          />
          <datalist id="rita-destinations">
            {destinations.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </datalist>
        </div>

        <div>
          <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/55">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" /> {t("search.dates")}
          </span>
          <Popover open={datesOpen} onOpenChange={setDatesOpen}>
            <PopoverTrigger asChild>
              <button type="button" className={cn(fieldShell, "flex items-center justify-between gap-2 text-sm", !range.from && "text-navy/50")}>
                <span className="truncate">{dateLabel}</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-electric">
                  {range.from ? "Change" : "Select"}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto border-navy/10 p-0">
              <Calendar
                mode="range"
                selected={range}
                onSelect={(next) => {
                  setRange(next ?? { from: null, to: null });
                  if (next?.from && next?.to) setDatesOpen(false);
                }}
                numberOfMonths={1}
                disabled={{ before: new Date() }}
                initialFocus
              />
              {range.from ? (
                <div className="flex justify-end border-t border-navy/10 px-3 py-2">
                  <button
                    type="button"
                    onClick={() => { setRange({ from: null, to: null }); setDatesOpen(false); }}
                    className="text-[11px] font-semibold uppercase tracking-[0.12em] text-navy/50 hover:text-electric"
                  >
                    Clear dates
                  </button>
                </div>
              ) : null}
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/55">
            <Users className="h-3.5 w-3.5" aria-hidden="true" /> {t("search.travellers")}
          </span>
          <Popover open={travellersOpen} onOpenChange={setTravellersOpen}>
            <PopoverTrigger asChild>
              <button type="button" className={cn(fieldShell, "flex items-center justify-between gap-2 text-sm font-medium")}>
                <span className="truncate">{travellersLabel}</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-electric">
                  {travellersOpen ? "Done" : "Edit"}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-[268px] border-navy/10 px-4 py-2">
              <Stepper label={t("search.adults")} value={adults} min={1} max={12} onChange={setAdults} />
              <div className="h-px bg-navy/[0.08]" />
              <Stepper label={t("search.children")} value={children} min={0} max={8} onChange={setChildren} />
            </PopoverContent>
          </Popover>
        </div>

        <button
          type="button"
          onClick={submit}
          className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-electric text-sm font-semibold text-white transition-all duration-300 hover:bg-[#1560f0] hover:shadow-[0_16px_32px_-16px_rgba(30,107,255,0.9)]"
        >
          <Search className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
          {t("search.button")}
        </button>
      </div>
    </div>
  );
}