import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PlannerProgress({ steps, current, onStepClick }) {
  return (
    <ol className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2">
      {steps.map((step, index) => {
        const done = index < current;
        const active = index === current;
        return (
          <li key={step} className="flex flex-1 items-center gap-3">
            <button
              type="button"
              onClick={() => done && onStepClick(index)}
              disabled={!done}
              aria-current={active ? "step" : undefined}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-2xl border px-3 py-2.5 text-left transition-colors sm:border-0 sm:bg-transparent sm:p-0",
                done && "cursor-pointer",
                !done && !active && "cursor-default",
              )}
            >
              <span
                className={cn(
                  "grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[11.5px] font-semibold transition-colors",
                  active && "border-electric bg-electric text-white",
                  done && "border-mint bg-mint text-navy",
                  !active && !done && "border-navy/20 bg-white text-navy/40",
                )}
              >
                {done ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : index + 1}
              </span>
              <span
                className={cn(
                  "text-[12px] font-medium leading-tight",
                  active ? "text-navy" : done ? "text-navy/70" : "text-navy/40",
                )}
              >
                {step}
              </span>
            </button>
            {index < steps.length - 1 ? (
              <span aria-hidden="true" className="hidden h-px flex-1 bg-navy/12 sm:block" />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}