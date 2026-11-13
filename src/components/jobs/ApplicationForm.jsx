import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { base44 } from "@/lib/base44Client";
import { Field, SelectInput, TextArea, TextInput } from "@/components/planning/FormBits";
import { isValidEmail } from "@/lib/leads";
import { cn } from "@/lib/utils";

const EMPTY = { name: "", email: "", phone: "", linkedin_url: "", message: "", consent: false };

export default function ApplicationForm({ roles, role, onRoleChange }) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const update = (patch) => setForm((prev) => ({ ...prev, ...patch }));

  const submit = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !isValidEmail(form.email)) {
      setError("Please add your name and a valid email address.");
      return;
    }
    if (!form.consent) {
      setError("Please accept the privacy note so we can keep your application.");
      return;
    }

    setError("");
    setStatus("sending");
    try {
      await base44.entities.JobApplication.create({
        ...form,
        role_title: role || "Speculative application",
        consent: true,
      });
      setForm(EMPTY);
      setStatus("idle");
      setSent(true);
    } catch {
      setStatus("idle");
      setError("We could not send your application. Please try again, or email hello@ritatoursandtravels.eu.");
    }
  };

  if (sent) {
    return (
      <div className="rounded-[26px] border border-navy/10 bg-white p-8 text-center soft-shadow">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-mint/15 text-[#0e8f83]">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-heading text-[20px] font-semibold text-navy">Application received</h3>
        <p className="mx-auto mt-2 max-w-sm text-[13.5px] leading-relaxed text-navy/60">
          Thank you. A human reads every application — you will hear from us within ten working days either way.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-navy/15 px-5 py-2.5 text-[12.5px] font-semibold text-navy transition-colors hover:border-electric hover:text-electric"
        >
          Send another application
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-[26px] border border-navy/10 bg-white p-6 soft-shadow sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Role" htmlFor="application-role" className="sm:col-span-2">
          <SelectInput
            id="application-role"
            value={role}
            onChange={(event) => onRoleChange(event.target.value)}
          >
            <option value="">Speculative application</option>
            {roles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </SelectInput>
        </Field>

        <Field label="Full name" htmlFor="application-name">
          <TextInput
            id="application-name"
            autoComplete="name"
            placeholder="Your name"
            value={form.name}
            onChange={(event) => update({ name: event.target.value })}
          />
        </Field>

        <Field label="Email" htmlFor="application-email">
          <TextInput
            id="application-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(event) => update({ email: event.target.value })}
          />
        </Field>

        <Field label="Phone" htmlFor="application-phone" hint="Optional">
          <TextInput
            id="application-phone"
            type="tel"
            autoComplete="tel"
            placeholder="+31 6 000 000 00"
            value={form.phone}
            onChange={(event) => update({ phone: event.target.value })}
          />
        </Field>

        <Field label="LinkedIn or portfolio" htmlFor="application-link" hint="Optional">
          <TextInput
            id="application-link"
            placeholder="linkedin.com/in/you"
            value={form.linkedin_url}
            onChange={(event) => update({ linkedin_url: event.target.value })}
          />
        </Field>

        <Field label="Why RITA?" htmlFor="application-message" className="sm:col-span-2">
          <TextArea
            id="application-message"
            placeholder="Tell us about the journeys you have planned, and what you would bring to this team."
            value={form.message}
            onChange={(event) => update({ message: event.target.value })}
          />
        </Field>
      </div>

      <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-navy/10 bg-cloud/50 p-3.5 transition-colors hover:border-navy/20">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(event) => update({ consent: event.target.checked })}
          className="mt-px h-[18px] w-[18px] shrink-0 cursor-pointer rounded-md border-navy/25 accent-[#1E6BFF]"
        />
        <span className="text-[12px] leading-relaxed text-navy/55">
          I agree that RITA may store these details for recruitment and contact me about my application.
        </span>
      </label>

      {error ? <p className="mt-4 text-[12.5px] font-medium text-destructive">{error}</p> : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className={cn(
          "mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-electric text-[13px] font-semibold text-white transition-all duration-300",
          status === "sending" ? "cursor-not-allowed opacity-70" : "hover:-translate-y-0.5 hover:bg-[#1560f0]",
        )}
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            Send application
          </>
        )}
      </button>
    </form>
  );
}