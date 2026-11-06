import { useState } from "react";
import { format, isValid, parseISO } from "date-fns";
import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const calendarClassNames = {
  months: "flex flex-col",
  month: "space-y-3",
  caption: "relative flex items-center justify-between px-1 pb-1",
  caption_label: "font-heading text-[14px] font-semibold text-navy",
  nav: "flex items-center gap-1",
  nav_button:
    "inline-flex h-8 w-8 items-center justify-center rounded-full text-navy/45 transition-colors hover:bg-electric/10 hover:text-electric",
  nav_button_previous: "",
  nav_button_next: "",
  table: "w-full border-collapse",
  head_row: "flex",
  head_cell: "w-9 pb-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-navy/35",
  row: "mt-0.5 flex w-full",
  cell: "relative p-0 text-center text-[13px] focus-within:relative focus-within:z-20",
  day: "h-9 w-9 rounded-xl p-0 text-[13px] font-medium text-navy/70 transition-colors hover:bg-electric/10 hover:text-electric focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric/40",
  day_selected:
    "bg-electric text-white shadow-[0_10px_20px_-12px_rgba(30,107,255,0.9)] hover:bg-electric hover:text-white focus:bg-electric focus:text-white",
  day_today: "font-bold",
  day_outside: "text-navy/20",
  day_disabled: "text-navy/20 opacity-60",
  day_hidden: "invisible",
};

function toDate(value, mode) {
  if (!value) return undefined;
  const parsed = parseISO(mode === "month" ? `${value}-01` : value);
  return isValid(parsed) ? parsed : undefined;
}

function MonthGrid({ value, year, onYearChange, onSelect }) {
  return (
    <div className="w-[252px] p-3">
      <div className="flex items-center justify-between px-1 pb-2">
        <button
          type="button"
          onClick={() => onYearChange(year - 1)}
          aria-label="Previous year"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-navy/45 transition-colors hover:bg-electric/10 hover:text-electric"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <span className="font-heading text-[14px] font-semibold text-navy">{year}</span>
        <button
          type="button"
          onClick={() => onYearChange(year + 1)}
          aria-label="Next year"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-navy/45 transition-colors hover:bg-electric/10 hover:text-electric"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {MONTH_LABELS.map((label, index) => {
          const monthValue = `${year}-${String(index + 1).padStart(2, "0")}`;
          const active = value === monthValue;
          return (
            <button
              key={label}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(monthValue)}
              className={cn(
                "rounded-xl py-2 text-[12.5px] font-medium transition-colors",
                active
                  ? "bg-electric text-white shadow-[0_10px_20px_-14px_rgba(30,107,255,0.9)]"
                  : "bg-cloud/60 text-navy/70 hover:bg-electric/10 hover:text-electric",
              )}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function CalendarField({ id, value, onChange, mode = "date", minDate, placeholder = "Choose a date" }) {
  const [open, setOpen] = useState(false);
  const [yearOverride, setYearOverride] = useState(null);

  const selected = toDate(value, mode);
  const earliest = minDate ? toDate(minDate, "date") : undefined;
  const year = yearOverride ?? selected?.getFullYear() ?? new Date().getFullYear();

  const label = selected ? format(selected, mode === "month" ? "MMMM yyyy" : "EEE d MMM yyyy") : placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          id={id}
          aria-haspopup="dialog"
          className={cn(
            "flex h-12 w-full items-center gap-2.5 rounded-2xl border px-3.5 text-left text-[13.5px] transition-all duration-200",
            open
              ? "border-electric bg-white shadow-[0_0_0_4px_rgba(30,107,255,0.12)]"
              : "border-navy/12 bg-cloud/50 hover:border-navy/25 hover:bg-white",
          )}
        >
          <CalendarDays className="h-4 w-4 shrink-0 text-navy/30" aria-hidden="true" />
          <span className={cn("flex-1 truncate", selected ? "font-medium text-navy" : "font-normal text-navy/35")}>
            {label}
          </span>
          <ChevronDown
            className={cn("h-4 w-4 shrink-0 text-navy/35 transition-transform duration-200", open && "rotate-180")}
            aria-hidden="true"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={8}
        className="w-auto rounded-[22px] border-navy/10 bg-white p-0 shadow-[0_30px_60px_-30px_rgba(10,31,68,0.45)]"
      >
        {mode === "month" ? (
          <MonthGrid
            value={value}
            year={year}
            onYearChange={setYearOverride}
            onSelect={(month) => {
              onChange(month);
              setYearOverride(null);
              setOpen(false);
            }}
          />
        ) : (
          <div className="p-2">
            <Calendar
              mode="single"
              selected={selected}
              defaultMonth={selected}
              disabled={earliest ? { before: earliest } : undefined}
              onSelect={(day) => {
                if (!day) return;
                onChange(format(day, "yyyy-MM-dd"));
                setOpen(false);
              }}
              classNames={calendarClassNames}
            />
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}