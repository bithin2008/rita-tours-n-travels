import { AlertCircle, Check, ClipboardList, Loader2, Mail, Phone, Send, User } from "lucide-react";
import { Field, TextInput } from "@/components/planning/FormBits";
import { cn } from "@/lib/utils";

export default function StepContact({ data, onChange, recap, error, status, onSubmit, onBack }) {
  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit}>
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-electric/15 to-coral/20 text-electric">
          <Mail className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-heading text-[20px] font-semibold leading-tight text-navy">Where do we send the plan?</h2>
          <p className="mt-1 text-[13px] leading-relaxed text-navy/55">
            A named planner replies within one business day with an outline and next steps. No payment, no obligation.
          </p>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-electric/15 bg-gradient-to-br from-cloud to-white">
        <div className="flex items-center gap-2 border-b border-electric/10 bg-white/60 px-4 py-2.5">
          <ClipboardList className="h-3.5 w-3.5 text-electric" aria-hidden="true" />
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-navy/60">Your plan so far</span>
        </div>
        <dl className="grid gap-x-5 gap-y-3 px-4 py-4 sm:grid-cols-2">
          {recap.map((item) => (
            <div key={item.label}>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-navy/40">{item.label}</dt>
              <dd className="mt-0.5 text-[13px] font-medium leading-snug text-navy/80">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="planning-name">
          <TextInput
            id="planning-name"
            icon={User}
            value={data.name}
            onChange={(event) => onChange({ name: event.target.value })}
            autoComplete="name"
            required
          />
        </Field>

        <Field label="Email address" htmlFor="planning-email">
          <TextInput
            id="planning-email"
            icon={Mail}
            type="email"
            value={data.email}
            onChange={(event) => onChange({ email: event.target.value })}
            autoComplete="email"
            required
          />
        </Field>

        <Field label="Phone or WhatsApp" htmlFor="planning-phone" hint="Optional — useful if plans change on the road." className="sm:col-span-2">
          <TextInput
            id="planning-phone"
            icon={Phone}
            value={data.phone}
            onChange={(event) => onChange({ phone: event.target.value })}
            autoComplete="tel"
          />
        </Field>
      </div>

      <label
        htmlFor="planning-consent"
        className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-navy/12 bg-cloud/50 px-4 py-3.5 text-[12px] leading-relaxed text-navy/65 transition-colors hover:border-navy/20 hover:bg-white"
      >
        <input
          id="planning-consent"
          type="checkbox"
          checked={data.consent}
          onChange={(event) => onChange({ consent: event.target.checked })}
          className="peer sr-only"
        />
        <span
          aria-hidden="true"
          className={cn(
            "mt-px grid h-[18px] w-[18px] shrink-0 place-items-center rounded-md border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-electric/45 peer-focus-visible:ring-offset-2",
            data.consent ? "border-electric bg-electric text-white" : "border-navy/25 bg-white",
          )}
        >
          {data.consent ? <Check className="h-3 w-3" /> : null}
        </span>
        <span>I agree to be contacted about this request and accept the privacy policy.</span>
      </label>

      {error ? (
        <p
          role="alert"
          className="mt-4 flex items-center gap-2 rounded-xl bg-coral/10 px-3.5 py-2.5 text-[12.5px] font-medium text-coral"
        >
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
      {status === "error" ? (
        <p className="mt-4 rounded-xl bg-coral/10 px-3.5 py-2.5 text-[12.5px] font-medium text-coral">
          Something went wrong sending your request. Please email us directly and we will pick it up straight away.
        </p>
      ) : null}

      <div className="mt-7 flex flex-col-reverse gap-3 border-t border-navy/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={sending}
          className="inline-flex h-12 items-center justify-center rounded-full border border-navy/15 px-5 text-[13px] font-semibold text-navy transition-colors hover:border-navy/35 disabled:opacity-50"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={sending}
          className={cn(
            "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#1E6BFF,#3D82FF)] px-7 text-[13px] font-semibold text-white shadow-[0_18px_34px_-18px_rgba(30,107,255,0.95)] transition-all duration-300 hover:-translate-y-0.5",
            sending && "translate-y-0 opacity-70",
          )}
        >
          {sending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
          {sending ? "Sending…" : "Send my request"}
        </button>
      </div>

      <p className="mt-3 flex items-center gap-1.5 text-[11px] text-navy/40">
        <Check className="h-3.5 w-3.5 text-mint" aria-hidden="true" />
        No payment is taken and nothing is booked without your written approval.
      </p>
    </form>
  );
}