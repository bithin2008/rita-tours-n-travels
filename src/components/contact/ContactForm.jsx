import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Field, SelectInput, TextArea, TextInput } from "@/components/planning/FormBits";
import { createLead, isValidEmail } from "@/lib/leads";
import { useApp } from "@/lib/AppContext";
import { cn } from "@/lib/utils";

const TOPICS = [
  "New journey enquiry",
  "Existing booking",
  "Payments & invoices",
  "Visas & documents",
  "Press & partnerships",
];

const EMPTY = { name: "", email: "", topic: TOPICS[0], message: "", consent: false };

export default function ContactForm() {
  const { language, currency } = useApp();
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const update = (patch) => setForm((prev) => ({ ...prev, ...patch }));

  const submit = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !isValidEmail(form.email) || form.message.trim().length < 10) {
      setError("Please add your name, a valid email and a message of at least a sentence.");
      return;
    }
    if (!form.consent) {
      setError("Please accept the privacy note so we can reply.");
      return;
    }

    setError("");
    setStatus("sending");
    try {
      await createLead({
        type: "enquiry",
        name: form.name,
        email: form.email,
        message: form.message,
        topic: form.topic,
        consent: true,
        source: "contact",
        language,
        currency,
      });
      setForm(EMPTY);
      setStatus("idle");
      setSent(true);
    } catch {
      setStatus("idle");
      setError("Your message could not be sent. Please try again, or email hello@ritatoursandtravels.eu.");
    }
  };

  if (sent) {
    return (
      <div className="rounded-[26px] border border-navy/10 bg-white p-8 text-center soft-shadow">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-mint/15 text-[#0e8f83]">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-heading text-[20px] font-semibold text-navy">Message received</h3>
        <p className="mx-auto mt-2 max-w-sm text-[13.5px] leading-relaxed text-navy/60">
          One of the planning desk will reply within one business day. Urgent while travelling? Use the emergency line.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-navy/15 px-5 py-2.5 text-[12.5px] font-semibold text-navy transition-colors hover:border-electric hover:text-electric"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-[26px] border border-navy/10 bg-white p-6 soft-shadow sm:p-8" noValidate>
      <h2 className="font-heading text-[20px] font-semibold tracking-[-0.01em] text-navy">Send us a message</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-navy/55">
        Tell us what you are planning. A named planner reads it, not a queue.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="contact-name">
          <TextInput
            id="contact-name"
            autoComplete="name"
            placeholder="Your name"
            value={form.name}
            onChange={(event) => update({ name: event.target.value })}
          />
        </Field>

        <Field label="Email" htmlFor="contact-email">
          <TextInput
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(event) => update({ email: event.target.value })}
          />
        </Field>

        <Field label="Reason" htmlFor="contact-topic" className="sm:col-span-2">
          <SelectInput
            id="contact-topic"
            value={form.topic}
            onChange={(event) => update({ topic: event.target.value })}
          >
            {TOPICS.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </SelectInput>
        </Field>

        <Field label="Message" htmlFor="contact-message" className="sm:col-span-2">
          <TextArea
            id="contact-message"
            placeholder="Where you would like to go, roughly when, and anything we should know."
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
          I agree to be contacted about this enquiry and have read the privacy policy.
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
            Send message
          </>
        )}
      </button>
    </form>
  );
}