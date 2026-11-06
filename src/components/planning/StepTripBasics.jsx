import { AlertCircle, MapPin, Minus, Plus } from "lucide-react";
import { Chip, Field, SelectInput } from "@/components/planning/FormBits";
import CalendarField from "@/components/planning/CalendarField";

function Stepper({ id, label, value, min, max, onChange }) {
  return (
    <Field label={label} htmlFor={id}>
      <div className="flex h-12 items-center justify-between rounded-2xl border border-navy/12 bg-cloud/50 px-2 transition-colors hover:border-navy/25 hover:bg-white">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          aria-label={`Decrease ${label.toLowerCase()}`}
          className="grid h-8 w-8 place-items-center rounded-full bg-white text-navy/55 shadow-[0_1px_3px_rgba(10,31,68,0.14)] transition-colors hover:bg-electric hover:text-white"
        >
          <Minus className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
        <output id={id} className="font-heading text-[15px] font-semibold text-navy">
          {value}
        </output>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          aria-label={`Increase ${label.toLowerCase()}`}
          className="grid h-8 w-8 place-items-center rounded-full bg-white text-navy/55 shadow-[0_1px_3px_rgba(10,31,68,0.14)] transition-colors hover:bg-electric hover:text-white"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </Field>
  );
}

export default function StepTripBasics({ data, destinations, onChange, error }) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-electric/15 to-sunshine/25 text-electric">
          <MapPin className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-heading text-[20px] font-semibold leading-tight text-navy">Where and when?</h2>
          <p className="mt-1 text-[13px] leading-relaxed text-navy/55">
            Rough is fine — a planner will come back with two or three route options.
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field label="Destination" htmlFor="planning-destination" hint="City, region or country — or pick undecided.">
          <SelectInput
            id="planning-destination"
            icon={MapPin}
            value={data.destination}
            onChange={(event) => onChange({ destination: event.target.value })}
          >
            <option value="">Choose a destination</option>
            {destinations.map((destination) => (
              <option key={destination} value={destination}>
                {destination}
              </option>
            ))}
            <option value="Undecided">Somewhere in Europe — undecided</option>
            <option value="Elsewhere">Somewhere else entirely</option>
          </SelectInput>
        </Field>

        <Field label="Travel month or date" htmlFor="planning-month" hint="An approximate month is enough for now.">
          <CalendarField
            id="planning-month"
            mode="month"
            value={data.month}
            placeholder="Choose a month"
            onChange={(month) => onChange({ month })}
          />
        </Field>

        <Field label="Arrive" htmlFor="planning-start">
          <CalendarField
            id="planning-start"
            value={data.startDate}
            placeholder="Arrival date"
            onChange={(startDate) => onChange({ startDate })}
          />
        </Field>

        <Field label="Depart" htmlFor="planning-end">
          <CalendarField
            id="planning-end"
            value={data.endDate}
            minDate={data.startDate}
            placeholder="Departure date"
            onChange={(endDate) => onChange({ endDate })}
          />
        </Field>

        <Stepper id="planning-adults" label="Adults" value={data.adults} min={1} max={16} onChange={(adults) => onChange({ adults })} />
        <Stepper id="planning-children" label="Children" value={data.children} min={0} max={10} onChange={(children) => onChange({ children })} />
      </div>

      <div className="mt-7">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-navy/50">Date flexibility</p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {[
            { value: "fixed", label: "Dates are fixed" },
            { value: "flexible", label: "Dates are flexible" },
            { value: "month", label: "Only the month is set" },
          ].map((option) => (
            <Chip
              key={option.value}
              active={data.flexibility === option.value}
              onClick={() => onChange({ flexibility: option.value })}
            >
              {option.label}
            </Chip>
          ))}
        </div>
      </div>

      {error ? (
        <p
          role="alert"
          className="mt-5 flex items-center gap-2 rounded-xl bg-coral/10 px-3.5 py-2.5 text-[12.5px] font-medium text-coral"
        >
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}