import { BedDouble, Check, Compass, Moon, Zap } from "lucide-react";
import { Chip, Field, SelectInput, TextArea } from "@/components/planning/FormBits";
import { cn } from "@/lib/utils";

const PACES = [
  { value: "slow", label: "Slow", hint: "Long stays, late breakfasts.", icon: Moon },
  { value: "balanced", label: "Balanced", hint: "A little of everything.", icon: Compass },
  { value: "full", label: "Full", hint: "Early starts, every highlight.", icon: Zap },
];

const STAYS = [
  { value: "boutique", label: "Boutique hotels" },
  { value: "guesthouse", label: "Family-run guesthouses" },
  { value: "apartment", label: "Apartments" },
  { value: "luxury", label: "Luxury hotels" },
  { value: "any", label: "No preference" },
];

export default function StepPreferences({ data, moods, onChange }) {
  const budgetPct = Math.round(((data.budget - 600) / (6000 - 600)) * 100);

  const toggleStyle = (id) =>
    onChange({
      styles: data.styles.includes(id) ? data.styles.filter((style) => style !== id) : [...data.styles, id],
    });

  return (
    <div>
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-electric/15 to-mint/20 text-electric">
          <Compass className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-heading text-[20px] font-semibold leading-tight text-navy">How do you like to travel?</h2>
          <p className="mt-1 text-[13px] leading-relaxed text-navy/55">
            These answers decide the pace, the stays and how much we plan versus leave open.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <div>
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-navy/50">Pace</p>
          <div className="mt-2.5 grid gap-2 sm:grid-cols-3">
            {PACES.map((pace) => {
              const Icon = pace.icon;
              const active = data.pace === pace.value;
              return (
                <button
                  key={pace.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onChange({ pace: pace.value })}
                  className={cn(
                    "relative flex flex-col gap-2 rounded-2xl border p-3.5 text-left transition-all duration-200",
                    active
                      ? "border-electric bg-electric/[0.06] shadow-[0_16px_30px_-26px_rgba(30,107,255,0.9)]"
                      : "border-navy/12 bg-white hover:border-navy/25 hover:bg-cloud/60",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-8 w-8 place-items-center rounded-full transition-colors",
                      active ? "bg-electric text-white" : "bg-navy/[0.06] text-navy/55",
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="font-heading text-[13px] font-semibold text-navy">{pace.label}</span>
                  <span className="text-[11.5px] leading-relaxed text-navy/50">{pace.hint}</span>
                  {active ? (
                    <span className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-electric text-white shadow-[0_6px_14px_-6px_rgba(30,107,255,0.95)]">
                      <Check className="h-3 w-3" aria-hidden="true" />
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-navy/50">
            Travel style <span className="font-medium normal-case tracking-normal text-navy/35">— choose any</span>
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {moods.map((mood) => (
              <Chip key={mood.id} active={data.styles.includes(mood.id)} onClick={() => toggleStyle(mood.id)}>
                {mood.title}
              </Chip>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Preferred stays" htmlFor="planning-stay">
            <SelectInput
              id="planning-stay"
              icon={BedDouble}
              value={data.stay}
              onChange={(event) => onChange({ stay: event.target.value })}
            >
              {STAYS.map((stay) => (
                <option key={stay.value} value={stay.value}>
                  {stay.label}
                </option>
              ))}
            </SelectInput>
          </Field>

          <div>
            <div className="flex items-center justify-between gap-3">
              <label
                htmlFor="planning-budget"
                className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-navy/50"
              >
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-electric/70" />
                Budget per person
              </label>
              <span className="rounded-full bg-navy px-2.5 py-1 text-[11px] font-semibold text-white">
                €{data.budget.toLocaleString("en-US")}
              </span>
            </div>
            <div className="mt-3.5 rounded-2xl border border-navy/12 bg-cloud/50 px-4 py-4">
              <input
                id="planning-budget"
                type="range"
                min={600}
                max={6000}
                step={100}
                value={data.budget}
                onChange={(event) => onChange({ budget: Number(event.target.value) })}
                className="range-brand w-full cursor-pointer"
                style={{
                  background: `linear-gradient(90deg, #1E6BFF 0%, #19C3B1 ${budgetPct}%, rgba(10,31,68,0.14) ${budgetPct}%, rgba(10,31,68,0.14) 100%)`,
                }}
              />
              <div className="mt-2.5 flex justify-between text-[10.5px] font-medium text-navy/40">
                <span>€600</span>
                <span>€6,000</span>
              </div>
            </div>
          </div>
        </div>

        <Field
          label="Anything else we should know?"
          htmlFor="planning-notes"
          hint="Dietary needs, accessibility, celebrations, a place you have always wanted to see."
        >
          <TextArea
            id="planning-notes"
            value={data.notes}
            onChange={(event) => onChange({ notes: event.target.value })}
            placeholder="We would love a quiet week with one big walk, and a table with a view on the last night…"
          />
        </Field>
      </div>
    </div>
  );
}