"use client";
import { useEffect, useState } from "react";
import { ArrowRight, Check, Clock, Leaf, Loader2, MapPin, Users } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Image } from "@/components/ui/image";
import { getTourById } from "@/lib/data-service";
import { createLead, isValidEmail } from "@/lib/leads";
import { useApp } from "@/lib/AppContext";
import { formatPrice } from "@/lib/data-service";

const emptyForm = { name: "", email: "", message: "" };

export default function TourDialog({ tourId, mode = "details", open, onOpenChange }) {
  const { t, currency, language } = useApp();
  const tour = tourId ? getTourById(tourId) : null;
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (open) {
      setStatus("idle");
      setForm({ ...emptyForm, message: tour ? `I'd like to know more about ${tour.title} (${tour.destination}).` : "" });
    }
  }, [open, tour?.id]);

  const submit = async (event) => {
    event.preventDefault();
    if (!isValidEmail(form.email) || !form.name.trim()) {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    try {
      await createLead({
        type: "enquiry",
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        tour_id: tour?.id ?? null,
        tour_title: tour?.title ?? null,
        language,
        currency,
        consent: true,
        source: "homepage-tour-dialog",
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto border-navy/10 p-0">
        {tour ? (
          <>
            <div className="relative aspect-[16/8] w-full overflow-hidden">
              <Image src={tour.image} alt={`${tour.title} — ${tour.destination}`} className="h-full w-full object-cover" loading="lazy" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-mint">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {tour.destination} · {tour.country}
                </p>
                <DialogTitle className="mt-2 font-heading text-[26px] font-semibold leading-tight text-white">
                  {tour.title}
                </DialogTitle>
              </div>
            </div>

            <div className="grid gap-7 p-6 sm:p-7 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <DialogDescription className="text-[14.5px] leading-relaxed text-navy/70">
                  {tour.summary}
                </DialogDescription>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-cloud px-3 py-1.5 text-[12px] font-medium text-navy/70">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {tour.durationNights} {t("label.nights")}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-cloud px-3 py-1.5 text-[12px] font-medium text-navy/70">
                    <Users className="h-3.5 w-3.5" aria-hidden="true" />
                    Max {tour.maxTravellers}
                  </span>
                  {tour.eco ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-mint/15 px-3 py-1.5 text-[12px] font-medium text-[#0d7a70]">
                      <Leaf className="h-3.5 w-3.5" aria-hidden="true" />
                      {t("label.eco")}
                    </span>
                  ) : null}
                </div>

                <h4 className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy/45">
                  What is included
                </h4>
                <ul className="mt-3 space-y-2">
                  {tour.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2 text-[14px] text-navy/75">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 rounded-xl bg-cloud px-4 py-3 text-[12.5px] leading-relaxed text-navy/55">
                  {t("label.from")} <strong className="font-semibold text-navy">{formatPrice(tour.priceFrom, currency)}</strong> {t("label.perPerson")}.
                  Final pricing is confirmed in your personal quote — nothing is charged here.
                </p>
              </div>

              <div className="lg:col-span-2">
                <h4 className="font-heading text-[16px] font-semibold text-navy">{t("enquiry.title")}</h4>
                {status === "success" ? (
                  <div className="mt-4 rounded-2xl border border-mint/40 bg-mint/10 p-5">
                    <p className="flex items-center gap-2 text-[13.5px] font-semibold text-[#0d7a70]">
                      <Check className="h-4 w-4" aria-hidden="true" />
                      {t("enquiry.success")}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={submit} className="mt-4 space-y-3">
                    <div>
                      <label htmlFor="enquiry-name" className="text-[11px] font-semibold uppercase tracking-[0.12em] text-navy/50">
                        {t("enquiry.name")}
                      </label>
                      <input
                        id="enquiry-name"
                        value={form.name}
                        onChange={(event) => setForm({ ...form, name: event.target.value })}
                        required
                        className="mt-1.5 h-11 w-full rounded-xl border border-navy/15 bg-white px-3 text-sm text-navy outline-none transition-colors focus:border-electric"
                      />
                    </div>
                    <div>
                      <label htmlFor="enquiry-email" className="text-[11px] font-semibold uppercase tracking-[0.12em] text-navy/50">
                        {t("enquiry.email")}
                      </label>
                      <input
                        id="enquiry-email"
                        type="email"
                        value={form.email}
                        onChange={(event) => setForm({ ...form, email: event.target.value })}
                        required
                        className="mt-1.5 h-11 w-full rounded-xl border border-navy/15 bg-white px-3 text-sm text-navy outline-none transition-colors focus:border-electric"
                      />
                    </div>
                    <div>
                      <label htmlFor="enquiry-message" className="text-[11px] font-semibold uppercase tracking-[0.12em] text-navy/50">
                        {t("enquiry.message")}
                      </label>
                      <textarea
                        id="enquiry-message"
                        value={form.message}
                        onChange={(event) => setForm({ ...form, message: event.target.value })}
                        rows={4}
                        className="mt-1.5 w-full resize-none rounded-xl border border-navy/15 bg-white px-3 py-2.5 text-sm text-navy outline-none transition-colors focus:border-electric"
                      />
                    </div>
                    {status === "invalid" ? (
                      <p className="text-[12px] font-medium text-coral">{t("newsletter.invalid")}</p>
                    ) : null}
                    {status === "error" ? (
                      <p className="text-[12px] font-medium text-coral">
                        Something went wrong sending your enquiry. Please email us directly.
                      </p>
                    ) : null}
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-electric text-[13px] font-semibold text-white transition-colors hover:bg-[#1560f0] disabled:opacity-70"
                    >
                      {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
                      {t("enquiry.button")}
                      {status !== "sending" ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : null}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </>
        ) : (
          <DialogHeader className="p-6">
            <DialogTitle className="text-navy">{t("enquiry.title")}</DialogTitle>
            <DialogDescription>Choose a journey to send an enquiry about.</DialogDescription>
          </DialogHeader>
        )}
      </DialogContent>
    </Dialog>
  );
}