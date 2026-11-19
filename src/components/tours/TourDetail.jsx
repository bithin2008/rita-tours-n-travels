"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Compass,
  Heart,
  Leaf,
  Mail,
  MapPin,
  Send,
  Users,
  Wind,
} from "lucide-react";
import { Image } from "@/components/ui/image";
import TourCard from "@/components/home/TourCard";
import { Field, TextArea, TextInput } from "@/components/planning/FormBits";
import { createLead, isValidEmail } from "@/lib/leads";
import { sendContactEmails } from "@/lib/server-actions";
import { formatPrice, getMoods, getTourList } from "@/lib/data-service";
import { useApp } from "@/lib/AppContext";
import tourDetailContent from "@/data/tour-detail-content.json";

const copy = tourDetailContent;

function formatCopy(template, values) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, value),
    template,
  );
}

function getRelatedTours(tour) {
  const score = (candidate) => {
    const sharedMoods = candidate.moods?.filter((mood) => tour.moods?.includes(mood)).length ?? 0;
    return (
      sharedMoods +
      Number(candidate.country === tour.country) * 2 +
      Number(candidate.category === tour.category) +
      Number(candidate.destination === tour.destination) * 2
    );
  };

  return getTourList()
    .filter((candidate) => candidate.id !== tour.id)
    .sort((left, right) => score(right) - score(left))
    .slice(0, 3);
}

function EnquiryForm({ tour, language, currency, email }) {
  const [form, setForm] = useState({ name: "", email: "", message: "", consent: false });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const update = (patch) => {
    setForm((current) => ({ ...current, ...patch }));
    setError("");
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !isValidEmail(form.email) || form.message.trim().length < 8) {
      setError(copy.enquiry.errorInvalid);
      return;
    }
    if (!form.consent) {
      setError(copy.enquiry.errorConsent);
      return;
    }

    setError("");
    setStatus("sending");
    try {
      const message = `${formatCopy(copy.enquiry.leadMessagePrefix, { title: tour.title })}\n\n${form.message.trim()}`;
      await createLead({
        type: "enquiry",
        name: form.name.trim(),
        email: form.email.trim(),
        message,
        tour_id: tour.id,
        tour_title: tour.title,
        language,
        currency,
        consent: true,
        source: "tour-detail",
      });
      await sendContactEmails({
        name: form.name.trim(),
        email: form.email.trim(),
        topic: formatCopy(copy.enquiry.emailTopic, { title: tour.title }),
        message,
        language,
        currency,
      });
      setStatus("sent");
    } catch {
      setStatus("idle");
      setError(formatCopy(copy.enquiry.errorSending, { email }));
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-[24px] border border-mint/30 bg-white p-7 text-center shadow-[0_20px_45px_-38px_rgba(10,31,68,0.4)] sm:p-9">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-mint/15 text-[#0e8f83]">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3 className="mt-4 font-heading text-[22px] font-semibold text-navy">{copy.enquiry.successTitle}</h3>
        <p className="mt-2 text-[14px] leading-relaxed text-navy/60">{copy.enquiry.successMessage}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-[13.5px] font-semibold text-electric hover:underline"
        >
          {copy.enquiry.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="rounded-[24px] border border-navy/[0.08] bg-white p-6 shadow-[0_20px_45px_-38px_rgba(10,31,68,0.4)] sm:p-8"
    >
      <h3 className="font-heading text-[19px] font-semibold text-navy">
        {formatCopy(copy.enquiry.formTitle, { title: tour.title })}
      </h3>

      <div className="mt-5 grid gap-5">
        <Field label={copy.enquiry.name} htmlFor="tour-enquiry-name">
          <TextInput
            id="tour-enquiry-name"
            autoComplete="name"
            placeholder={copy.enquiry.namePlaceholder}
            value={form.name}
            onChange={(event) => update({ name: event.target.value })}
          />
        </Field>
        <Field label={copy.enquiry.email} htmlFor="tour-enquiry-email">
          <TextInput
            id="tour-enquiry-email"
            type="email"
            autoComplete="email"
            placeholder={copy.enquiry.emailPlaceholder}
            value={form.email}
            onChange={(event) => update({ email: event.target.value })}
          />
        </Field>
        <Field label={copy.enquiry.message} htmlFor="tour-enquiry-message">
          <TextArea
            id="tour-enquiry-message"
            rows={3}
            placeholder={formatCopy(copy.enquiry.messagePlaceholder, { title: tour.title })}
            value={form.message}
            onChange={(event) => update({ message: event.target.value })}
          />
        </Field>
      </div>

      <label className="mt-4 flex cursor-pointer items-start gap-2.5 text-[12px] leading-relaxed text-navy/55">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(event) => update({ consent: event.target.checked })}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[#1E6BFF]"
        />
        <span>
          {copy.enquiry.consentBeforeLink}
          <Link href="/privacy-policy" className="font-medium text-electric hover:underline">
            {copy.enquiry.privacyPolicy}
          </Link>
          {copy.enquiry.consentAfterLink}
        </span>
      </label>

      {error ? (
        <p role="alert" className="mt-3 text-[13px] leading-relaxed text-destructive">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-electric text-[13.5px] font-semibold text-white transition-colors hover:bg-[#1560f0] disabled:cursor-wait disabled:opacity-70"
      >
        <Send className="h-3.5 w-3.5" aria-hidden="true" />
        {status === "sending" ? copy.enquiry.sending : copy.enquiry.submit}
      </button>
    </form>
  );
}

export default function TourDetail({ tour }) {
  const { t, currency, language, isWished, toggleWishlist, settings } = useApp();
  const wished = isWished(tour.id);
  const availableMonths = new Set(tour.availableMonths ?? []);
  const relatedTours = getRelatedTours(tour);
  const moods = getMoods();
  const tourMoods = (tour.moods ?? [])
    .map((id) => moods.find((mood) => mood.id === id)?.title)
    .filter(Boolean);
  const heroImage = tour.heroImage || tour.image;
  const duration = tour.durationLabel ?? formatCopy(copy.durationFallback, { count: tour.durationNights });

  return (
    <main>
      <section className="relative isolate min-h-[450px] overflow-hidden bg-navy sm:min-h-[490px]">
        <Image
          src={heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,27,59,0.94)_0%,rgba(8,27,59,0.78)_44%,rgba(8,27,59,0.38)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,27,59,0.48)_0%,transparent_45%)]"
        />

        <div className="shell relative z-10 flex min-h-[450px] flex-col justify-end pb-9 pt-12 sm:min-h-[490px] sm:pb-11">
          <nav aria-label={copy.breadcrumb.label} className="mb-5 text-[11px] font-semibold uppercase tracking-[0.17em] text-white/55">
            <Link href="/" className="transition-colors hover:text-white">{copy.breadcrumb.home}</Link>
            <span className="mx-2 text-white/35">/</span>
            <Link href="/tours" className="transition-colors hover:text-white">{copy.breadcrumb.tours}</Link>
            <span className="mx-2 text-white/35">/</span>
            <span className="text-mint">{tour.destination}</span>
          </nav>

          <div className="max-w-3xl">
            <p className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-mint">
              <MapPin className="h-3 w-3" aria-hidden="true" />
              {tour.destination} · {tour.country}
            </p>
            <h1 className="font-heading text-[36px] font-semibold leading-[1.08] tracking-[-0.035em] text-white sm:text-[46px] lg:text-[54px]">
              {tour.title}
            </h1>
            <p className="mt-2 font-heading text-[19px] font-medium text-white/90 sm:text-[22px]">
              {tour.heroTitle || tour.summary}
            </p>
            <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-white/75 sm:text-[15px]">
              {tour.heroDescription || tour.summary}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur">
              <Clock3 className="h-3 w-3 text-mint" aria-hidden="true" />
              {duration}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur">
              <Users className="h-3 w-3 text-mint" aria-hidden="true" />
              {formatCopy(copy.hero.travellers, { count: tour.maxTravellers })}
            </span>
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur">
              {tour.category}
            </span>
            {tour.eco ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-mint px-3 py-1.5 text-[11px] font-semibold text-navy">
                <Leaf className="h-3 w-3" aria-hidden="true" />
                {t("label.eco")}
              </span>
            ) : null}
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-white/20 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-baseline gap-2 text-white">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">{t("label.from")}</span>
              <span className="font-heading text-[24px] font-semibold">{formatPrice(tour.priceFrom, currency)}</span>
              <span className="text-[11px] text-white/60">{t("label.perPerson")}</span>
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="#enquiry"
                className="inline-flex h-10 items-center justify-center rounded-full bg-coral px-5 text-[12px] font-semibold text-white transition-colors hover:bg-[#f04d2c]"
              >
                {copy.hero.enquire}
              </a>
              <Link
                href="/tour-planning"
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full border border-white/40 px-5 text-[12px] font-semibold text-white transition-colors hover:bg-white hover:text-navy"
              >
                {copy.hero.plan}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <button
                type="button"
                onClick={() => toggleWishlist(tour.id)}
                aria-pressed={wished}
                aria-label={formatCopy(
                  wished ? copy.hero.removeWishlist : copy.hero.saveWishlist,
                  { title: tour.title },
                )}
                className={`grid h-10 w-10 place-items-center rounded-full border transition-colors ${
                  wished
                    ? "border-coral bg-coral text-white"
                    : "border-white/40 text-white hover:bg-white hover:text-coral"
                }`}
              >
                <Heart className={`h-4 w-4 ${wished ? "fill-current" : ""}`} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cloud py-12 sm:py-16">
        <div className="shell grid gap-8 lg:grid-cols-[minmax(0,1fr)_290px] lg:gap-10">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-electric">{copy.journey.eyebrow}</p>
            <h2 className="mt-2 max-w-2xl font-heading text-[25px] font-semibold leading-tight tracking-[-0.025em] text-navy sm:text-[29px]">
              {tour.heroTitle || tour.title}
            </h2>
            <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-navy/60">
              {tour.summary}
            </p>

            {tourMoods.length ? (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {tourMoods.map((mood) => (
                  <span
                    key={mood}
                    className="rounded-full border border-navy/10 bg-white px-3 py-1 text-[10px] font-medium text-navy/60"
                  >
                    {mood}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="mt-5 rounded-[18px] border border-navy/[0.07] bg-white p-5 shadow-[0_12px_30px_-22px_rgba(10,31,68,0.45)] sm:p-6">
              <h3 className="flex items-center gap-2 text-[14px] font-semibold text-navy">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-electric/10 text-electric">
                  <Compass className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                {copy.journey.highlights}
              </h3>
              <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {(tour.highlights ?? []).map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2 text-[13px] leading-relaxed text-navy/65">
                    <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-mint/15 text-[#0d8c80]">
                      <Check className="h-2.5 w-2.5" aria-hidden="true" />
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-navy/[0.07] pt-3 text-[11px] leading-relaxed text-navy/45">
                {copy.journey.note}
              </p>
            </div>
          </div>

          <aside className="h-fit rounded-[20px] border border-navy/[0.08] bg-white p-5 shadow-[0_18px_40px_-32px_rgba(10,31,68,0.5)] lg:sticky lg:top-28">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-navy/40">{copy.details.title}</p>
            <dl className="mt-4 space-y-3.5">
              <div className="flex items-start gap-3">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
                <div>
                  <dt className="text-[9px] font-semibold uppercase tracking-[0.13em] text-navy/40">{copy.details.duration}</dt>
                  <dd className="mt-0.5 text-[12px] font-medium text-navy">{duration}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="mt-0.5 h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
                <div>
                  <dt className="text-[9px] font-semibold uppercase tracking-[0.13em] text-navy/40">{copy.details.groupSize}</dt>
                  <dd className="mt-0.5 text-[12px] font-medium text-navy">
                    {formatCopy(copy.hero.travellers, { count: tour.maxTravellers })}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
                <div>
                  <dt className="text-[9px] font-semibold uppercase tracking-[0.13em] text-navy/40">{copy.details.route}</dt>
                  <dd className="mt-0.5 text-[12px] font-medium text-navy">{tour.destination}, {tour.country}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Wind className="mt-0.5 h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
                <div>
                  <dt className="text-[9px] font-semibold uppercase tracking-[0.13em] text-navy/40">
                    {copy.details.carbonEstimate}
                  </dt>
                  <dd className="mt-0.5 text-[12px] font-medium text-navy">
                    {tour.carbonKgEstimate
                      ? formatCopy(copy.details.carbonPerPerson, { amount: tour.carbonKgEstimate })
                      : copy.details.carbonUnknown}
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-5 border-t border-navy/[0.08] pt-4">
              <div className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.13em] text-navy/40">
                <CalendarDays className="h-3 w-3" aria-hidden="true" />
                {copy.details.travelMonths}
              </div>
              <div className="mt-2.5 grid grid-cols-6 gap-1.5">
                {copy.months.map((month, index) => (
                  <span
                    key={month}
                    className={`rounded-full px-1 py-1 text-center text-[9px] font-medium ${
                      availableMonths.has(index + 1)
                        ? "bg-mint/20 text-[#08796f]"
                        : "bg-cloud text-navy/30"
                    }`}
                  >
                    {month}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-navy/[0.08] pt-4">
              <span className="text-[9px] font-semibold uppercase tracking-[0.13em] text-navy/40">{t("label.from")}</span>
              <span className="font-heading text-[18px] font-semibold text-navy">
                {formatPrice(tour.priceFrom, currency)}
                <span className="ml-1 text-[9px] font-normal text-navy/40">{t("label.perPerson")}</span>
              </span>
            </div>
            <a
              href="#enquiry"
              className="mt-3 inline-flex h-9 w-full items-center justify-center rounded-full bg-electric text-[11px] font-semibold text-white transition-colors hover:bg-[#1560f0]"
            >
              {copy.details.enquire}
            </a>
          </aside>
        </div>
      </section>

      <section id="enquiry" className="scroll-mt-20 bg-[#eef4fc] py-12 sm:py-16">
        <div className="shell grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-14">
          <div className="pt-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-electric">{copy.enquiry.eyebrow}</p>
            <h2 className="mt-2 max-w-lg font-heading text-[26px] font-semibold leading-tight tracking-[-0.025em] text-navy sm:text-[30px]">
              {copy.enquiry.title}
            </h2>
            <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-navy/60">
              {copy.enquiry.description}
            </p>
            <a
              href={`mailto:${settings.brand.email}`}
              className="mt-4 inline-flex items-center gap-2 text-[12px] font-medium text-navy/65 transition-colors hover:text-electric"
            >
              <Mail className="h-3.5 w-3.5 text-electric" aria-hidden="true" />
              {settings.brand.email}
            </a>
            <p className="mt-1 text-[11px] text-navy/45">{settings.brand.responseTime}</p>
          </div>

          <EnquiryForm
            tour={tour}
            language={language}
            currency={currency}
            email={settings.brand.email}
          />
        </div>
      </section>

      {relatedTours.length ? (
        <section className="bg-white py-12 sm:py-16">
          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-electric">{copy.related.eyebrow}</p>
                <h2 className="mt-2 font-heading text-[24px] font-semibold tracking-[-0.02em] text-navy">
                  {copy.related.title}
                </h2>
              </div>
              <Link
                href="/tours"
                className="inline-flex items-center gap-1.5 rounded-full border border-navy/10 px-3.5 py-2 text-[11px] font-semibold text-navy/65 transition-colors hover:border-electric hover:text-electric"
              >
                {copy.related.allTours}
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTours.map((relatedTour) => (
                <TourCard key={relatedTour.id} tour={relatedTour} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="relative isolate overflow-hidden bg-navy">
        <Image src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,27,59,0.92)_0%,rgba(8,27,59,0.68)_55%,rgba(8,27,59,0.4)_100%)]"
        />
        <div className="shell relative z-10 py-14 sm:py-16">
          <div className="max-w-xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mint">{copy.closing.eyebrow}</p>
            <h2 className="mt-2 font-heading text-[34px] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[42px]">
              {copy.closing.title}
            </h2>
            <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-white/75">
              {copy.closing.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <Link
                href="/tours"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-coral px-5 text-[12px] font-semibold text-white transition-colors hover:bg-[#f04d2c]"
              >
                {copy.closing.exploreTours}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <Link
                href="/tour-planning"
                className="inline-flex h-10 items-center rounded-full border border-white/45 px-5 text-[12px] font-semibold text-white transition-colors hover:bg-white hover:text-navy"
              >
                {copy.closing.planJourney}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
