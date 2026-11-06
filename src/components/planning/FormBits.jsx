import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const fieldBase =
  "h-12 w-full rounded-2xl border border-navy/12 bg-cloud/50 text-[13.5px] font-medium text-navy outline-none transition-all duration-200 placeholder:font-normal placeholder:text-navy/35 hover:border-navy/25 hover:bg-white focus:border-electric focus:bg-white focus:shadow-[0_0_0_4px_rgba(30,107,255,0.12)]";

const labelClass =
  "flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-navy/50";

const iconClass = "pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/30";

export function Field({ label, htmlFor, hint, children, className }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className={labelClass}>
        <span aria-hidden="true" className="h-1 w-1 rounded-full bg-electric/70" />
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {hint ? <p className="mt-2 text-[11.5px] leading-relaxed text-navy/40">{hint}</p> : null}
    </div>
  );
}

export function TextInput({ className, icon: Icon, ...props }) {
  return (
    <div className="relative">
      {Icon ? <Icon className={iconClass} aria-hidden="true" /> : null}
      <input className={cn(fieldBase, Icon ? "pl-10 pr-4" : "px-4", className)} {...props} />
    </div>
  );
}

export function SelectInput({ className, icon: Icon, children, ...props }) {
  return (
    <div className="relative">
      {Icon ? <Icon className={iconClass} aria-hidden="true" /> : null}
      <select
        className={cn(fieldBase, "cursor-pointer appearance-none pr-10", Icon ? "pl-10" : "pl-4", className)}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/35" aria-hidden="true" />
    </div>
  );
}

export function TextArea({ className, ...props }) {
  return (
    <textarea
      className={cn(fieldBase, "h-auto min-h-[112px] resize-none px-4 py-3 leading-relaxed", className)}
      rows={4}
      {...props}
    />
  );
}

export function Chip({ active, className, children, ...props }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[12.5px] font-medium transition-all duration-200",
        active
          ? "border-electric bg-electric text-white shadow-[0_10px_22px_-14px_rgba(30,107,255,0.95)]"
          : "border-navy/15 bg-white text-navy/65 hover:border-electric/40 hover:bg-electric/[0.04] hover:text-navy",
        className,
      )}
      {...props}
    >
      {active ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : null}
      {children}
    </button>
  );
}