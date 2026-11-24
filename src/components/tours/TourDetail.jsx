"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Compass,
  Heart,
  Leaf,
  Mail,
  MapPin,
  Send,
  Star,
  Users,
  Wind,
} from "lucide-react";
import { Image } from "@/components/ui/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import TourCard from "@/components/home/TourCard";
import { Field, TextArea, TextInput } from "@/components/planning/FormBits";
import { createLead, isValidEmail } from "@/lib/leads";
import { sendContactEmails } from "@/lib/server-actions";
import { formatPrice, getMoods, getTestimonials, getTourList } from "@/lib/data-service";
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

function getTourGallery(tour, heroImage) {
  const defaultAlt = `${tour.destination}, ${tour.country}`;
  const images = [{ src: heroImage, alt: `${tour.title} — ${defaultAlt}` }];
  const seen = new Set([heroImage]);
  const additionalImages = Array.isArray(tour.gallery) ? tour.gallery : Array.isArray(tour.galleryImages) ? tour.galleryImages : [];

  additionalImages.forEach((photo) => {
    if (images.length >= 20) return;
    const src = typeof photo === "string"
      ? photo.trim()
      : typeof photo?.src === "string"
        ? photo.src.trim()
        : "";
    if (!src || seen.has(src)) return;

    seen.add(src);
    images.push({
      src,
      alt: typeof photo?.alt === "string" && photo.alt.trim()
        ? photo.alt.trim()
        : defaultAlt,
    });
  });

  return images;
}

function getItinerary(tour) {
  if (tour.itinerary && tour.itinerary.length) {
    return tour.itinerary.map((stop, index) => ({
      step: index + 1,
      title: stop,
    }));
  }
  const durationLabel = tour.durationLabel ?? "";
  const dayCount = /day/i.test(durationLabel) && !/night/i.test(durationLabel)
    ? 1
    : Math.max(1, Number(tour.durationNights ?? 1) + 1);
  const highlights = tour.highlights ?? [];

  return Array.from({ length: dayCount }, (_, index) => ({
    day: index + 1,
    highlights: highlights.slice(
      Math.floor((index * highlights.length) / dayCount),
      Math.floor(((index + 1) * highlights.length) / dayCount),
    ),
  }));
}

function RatingStars({ rating, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-0.5 text-amber-400 ${className}`} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={`h-3.5 w-3.5 ${index < Math.round(rating) ? "fill-current" : ""}`}
          aria-hidden="true"
        />
      ))}
    </span>
  );
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
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const wished = isWished(tour.id);
  const availableMonths = new Set(tour.availableMonths ?? []);
  const relatedTours = getRelatedTours(tour);
  const testimonials = getTestimonials();
  const galleryImages = getTourGallery(tour, tour.heroImage || tour.image);
  const itinerary = getItinerary(tour);
  const moods = getMoods();
  const tourMoods = (tour.moods ?? [])
    .map((id) => moods.find((mood) => mood.id === id)?.title)
    .filter(Boolean);
  const heroImage = tour.heroImage || tour.image;
  const visibleGalleryImages = galleryImages.slice(0, 5);
  const duration = tour.durationLabel ?? formatCopy(copy.durationFallback, { count: tour.durationNights });

  useEffect(() => {
    if (!lightboxOpen || galleryImages.length < 2) return undefined;

    const handleArrowKeys = (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveImage((current) => (current + 1) % galleryImages.length);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveImage((current) => (current - 1 + galleryImages.length) % galleryImages.length);
      }
    };

    window.addEventListener("keydown", handleArrowKeys);
    return () => window.removeEventListener("keydown", handleArrowKeys);
  }, [galleryImages.length, lightboxOpen]);

  return (
    <main>
      <section className="relative isolate min-h-[410px] overflow-hidden bg-navy sm:min-h-[450px]">
        <Image
          src={heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,27,59,0.93)_0%,rgba(8,27,59,0.76)_48%,rgba(8,27,59,0.28)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,27,59,0.38)_0%,transparent_55%)]"
        />

        <div className="shell relative z-10 flex min-h-[410px] flex-col justify-end pb-8 pt-10 sm:min-h-[450px] sm:pb-10">
          <nav
            aria-label={copy.breadcrumb.label}
            className="mb-7 inline-flex w-fit max-w-full flex-wrap items-center gap-x-2.5 gap-y-1 rounded-full border border-white/20 bg-navy/35 px-3.5 py-2 text-[11px] font-medium text-white/80 shadow-sm backdrop-blur"
          >
            <Link href="/" className="transition-colors hover:text-white">{copy.breadcrumb.home}</Link>
            <span aria-hidden="true" className="text-white/45">/</span>
            <Link href="/tours" className="transition-colors hover:text-white">{copy.breadcrumb.tours}</Link>
            <span aria-hidden="true" className="text-white/45">/</span>
            <span aria-current="page" className="font-semibold text-mint">{tour.destination}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.13em] text-white backdrop-blur">
                {tour.category}
              </span>
              <span className="inline-flex items-center gap-1 text-[12px] font-medium text-white/80">
                <MapPin className="h-3.5 w-3.5 text-mint" aria-hidden="true" />
                {tour.destination}, {tour.country}
              </span>
              {tour.eco ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-mint px-2.5 py-1 text-[10px] font-semibold text-navy">
                  <Leaf className="h-3 w-3" aria-hidden="true" />
                  {t("label.eco")}
                </span>
              ) : null}
            </div>
            <h1 className="font-heading text-[34px] font-semibold leading-[1.08] tracking-[-0.035em] text-white sm:text-[46px] lg:text-[54px]">
              {tour.title}
            </h1>
            <p className="mt-2 font-heading text-[18px] font-medium text-white/90 sm:text-[21px]">
              {tour.heroTitle || tour.summary}
            </p>
            <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-white/75 sm:text-[14px]">
              {tour.heroDescription || tour.summary}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-white/80">
              <Clock3 className="h-3.5 w-3.5 text-mint" aria-hidden="true" />{duration}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-white/80">
              <Users className="h-3.5 w-3.5 text-mint" aria-hidden="true" />
              {formatCopy(copy.hero.travellers, { count: tour.maxTravellers })}
            </span>
            <span className="hidden h-5 w-px bg-white/20 sm:block" aria-hidden="true" />
            <p className="flex items-baseline gap-1.5 text-white">
              <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/55">{t("label.from")}</span>
              <span className="font-heading text-[20px] font-semibold">{formatPrice(tour.priceFrom, currency)}</span>
              <span className="text-[10px] text-white/60">{t("label.perPerson")}</span>
            </p>
            <div className="ml-auto flex flex-wrap items-center gap-2">
              <a
                href="#enquiry"
                className="inline-flex h-10 items-center justify-center rounded-full bg-coral px-5 text-[12px] font-semibold text-white transition-colors hover:bg-[#f04d2c]"
              >
                {copy.hero.enquire}
              </a>
              <Link
                href="/tour-planning"
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full border border-white/45 px-4 text-[12px] font-semibold text-white transition-colors hover:bg-white hover:text-navy"
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
                    : "border-white/45 text-white hover:bg-white hover:text-coral"
                }`}
              >
                <Heart className={`h-4 w-4 ${wished ? "fill-current" : ""}`} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Tour and destination photos" className="bg-white pb-10 pt-8 sm:pb-12 sm:pt-10">
        <div className="shell">
          <div className="grid gap-2.5 overflow-hidden rounded-[22px] sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
            {visibleGalleryImages.map((photo, index) => (
              <button
                key={`${index}-${photo.src}`}
                type="button"
                onClick={() => {
                  setActiveImage(index);
                  setLightboxOpen(true);
                }}
                aria-label={`Open photo ${index + 1} of ${galleryImages.length}: ${photo.alt}`}
                className={`group relative min-h-[130px] overflow-hidden bg-cloud text-left sm:min-h-[160px] lg:min-h-0 ${
                  index === 0
                    ? `min-h-[240px] sm:col-span-2 sm:row-span-2 lg:min-h-[390px] ${
                      visibleGalleryImages.length === 1 ? "lg:col-span-4" : ""
                    }`
                    : ""
                }`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                    index === 0 ? "duration-700 group-hover:scale-[1.025]" : ""
                  }`}
                  loading={index === 0 ? "eager" : "lazy"}
                />
                {index === 0 ? (
                  <span className="absolute bottom-4 left-4 rounded-full bg-navy/75 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur">
                    {tour.destination} · {tour.country}
                  </span>
                ) : null}
                {index === 4 && galleryImages.length > 5 ? (
                  <span className="absolute inset-0 flex flex-col items-center justify-center bg-navy/65 text-center text-white transition-colors group-hover:bg-navy/75">
                    <span className="font-heading text-[30px] font-semibold leading-none">
                      +{galleryImages.length - 5}
                    </span>
                    <span className="mt-1 text-[11px] font-semibold">more photos</span>
                  </span>
                ) : null}
              </button>
            ))}
          </div>
          {galleryImages.length > 1 ? (
            <p className="mt-2 text-right text-[10px] text-navy/40">
              Showing {visibleGalleryImages.length} of {galleryImages.length} photos · Select any photo to open the gallery.
            </p>
          ) : null}
        </div>
      </section>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-h-[96vh] w-[calc(100vw-1rem)] max-w-6xl overflow-y-auto border-white/15 bg-navy p-3 text-white sm:w-[calc(100vw-2rem)] sm:p-5">
          <DialogTitle className="sr-only">{tour.title} photo gallery</DialogTitle>
          <DialogDescription className="sr-only">
            Browse {galleryImages.length} photos. Use the arrow keys or previous and next buttons to navigate.
          </DialogDescription>
          <div className="relative flex h-[70vh] min-h-[280px] max-h-[720px] items-center justify-center overflow-hidden rounded-xl bg-black/25">
            <Image
              src={galleryImages[activeImage]?.src || heroImage}
              alt={galleryImages[activeImage]?.alt || tour.title}
              className="h-full w-full object-contain"
            />
            {galleryImages.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => setActiveImage((current) => (current - 1 + galleryImages.length) % galleryImages.length)}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-navy shadow-lg transition-colors hover:bg-white sm:left-4 sm:h-12 sm:w-12"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveImage((current) => (current + 1) % galleryImages.length)}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-navy shadow-lg transition-colors hover:bg-white sm:right-4 sm:h-12 sm:w-12"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </>
            ) : null}
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-[12px] font-medium text-white/75">
              Photo {activeImage + 1} of {galleryImages.length}
            </p>
            <p className="hidden text-[11px] text-white/45 sm:block">Use ← and → to browse</p>
          </div>
          {galleryImages.length > 1 ? (
            <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
              {galleryImages.map((photo, index) => (
                <button
                  key={`${index}-${photo.src}`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`Show photo ${index + 1}: ${photo.alt}`}
                  aria-pressed={activeImage === index}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-colors ${
                    activeImage === index ? "border-mint" : "border-white/10 hover:border-white/50"
                  }`}
                >
                  <Image src={photo.src} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      <section className="border-b border-navy/10 bg-cloud py-12 sm:py-16">
        <div className="shell grid gap-8 lg:grid-cols-[minmax(0,1fr)_290px] lg:gap-10">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-electric">Discover the experience</p>
            <h2 className="mt-2 max-w-2xl font-heading text-[25px] font-semibold leading-tight tracking-[-0.025em] text-navy sm:text-[29px]">
              Overview
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
                Journey highlights
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

      <section className="scroll-mt-20 bg-[#eef4fc] py-12 sm:py-16">
        <div className="shell grid items-start gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(330px,0.8fr)] lg:gap-10">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-electric">
              Tour stops
            </p>
            <h2 className="mt-2 font-heading text-[26px] font-semibold tracking-[-0.025em] text-navy sm:text-[30px]">
              Itinerary
            </h2>
            <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-navy/55">
              A helpful outline of this tour’s route. Your planner will confirm the order and timings.
            </p>
            <ol className="mt-7">
              {itinerary.map((step, index) => {
                const isPointWise = tour.itinerary && tour.itinerary.length;
                return (
                  <li
                    key={step.step ?? index}
                    className="relative grid grid-cols-[48px_minmax(0,1fr)] gap-4 pb-7 last:pb-0"
                  >
                    {index < itinerary.length - 1 ? (
                      <span aria-hidden="true" className="absolute bottom-0 left-[19px] top-10 w-px bg-navy/10" />
                    ) : null}
                    <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full border border-electric/20 bg-electric/5 font-heading text-[13px] font-semibold text-electric">
                      {isPointWise ? String(index + 1) : String(step.day).padStart(2, "0")}
                    </span>
                    <div className="rounded-[18px] border border-navy/[0.08] bg-white p-5 shadow-[0_14px_35px_-30px_rgba(10,31,68,0.4)] sm:p-6">
                      {!isPointWise ? (
                        <>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-electric">
                            Day {step.day}
                          </p>
                          <h3 className="mt-1 font-heading text-[17px] font-semibold text-navy">
                            {step.highlights[0] || `${tour.destination} at your own pace`}
                          </h3>
                          {step.highlights.length > 1 ? (
                            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                              {step.highlights.slice(1).map((highlight) => (
                                <li key={highlight} className="flex items-start gap-2 text-[12px] leading-relaxed text-navy/60">
                                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0d8c80]" aria-hidden="true" />
                                  {highlight}
                                </li>
                              ))}
                            </ul>
                          ) : null}
                          <p className="mt-2 text-[12px] leading-relaxed text-navy/55">
                            Your planner will confirm the route and timings for this day.
                          </p>
                        </>
                      ) : (
                        <>
                          <h3 className="mt-0 font-heading text-[16px] font-semibold text-navy">
                            {step.title}
                          </h3>
                          <p className="mt-1 text-[12px] leading-relaxed text-navy/55">
                            Your planner will confirm the timing and order for this stop.
                          </p>
                        </>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <aside id="enquiry" className="scroll-mt-24 rounded-[22px] border border-navy/[0.08] bg-white p-4 shadow-[0_20px_50px_-40px_rgba(10,31,68,0.4)] sm:p-5">
            <div className="px-2 pb-4 pt-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-electric">{copy.enquiry.eyebrow}</p>
              <h2 className="mt-2 font-heading text-[23px] font-semibold leading-tight tracking-[-0.025em] text-navy">
                {copy.enquiry.title}
              </h2>
              <p className="mt-2 text-[12px] leading-relaxed text-navy/60">
                {copy.enquiry.description}
              </p>
              <a
                href={`mailto:${settings.brand.email}`}
                className="mt-3 inline-flex items-center gap-2 text-[11px] font-medium text-navy/65 transition-colors hover:text-electric"
              >
                <Mail className="h-3.5 w-3.5 text-electric" aria-hidden="true" />
                {settings.brand.email}
              </a>
              <p className="mt-1 text-[10px] text-navy/45">{settings.brand.responseTime}</p>
            </div>
            <EnquiryForm
              tour={tour}
              language={language}
              currency={currency}
              email={settings.brand.email}
            />
          </aside>
        </div>
      </section>

      <section className="bg-[#f5f8fc] py-12 sm:py-16">
        <div className="shell">
          <div className="flex flex-col gap-6 rounded-[24px] border border-navy/[0.08] bg-white p-6 shadow-[0_20px_50px_-40px_rgba(10,31,68,0.4)] sm:flex-row sm:items-center sm:p-8">
            <div className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-[20px] bg-navy text-white">
              <span className="font-heading text-[32px] font-semibold leading-none">{testimonials.summary.rating}</span>
              <RatingStars rating={testimonials.summary.rating} className="mt-2" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-electric">Guest rating across our journeys</p>
              <h2 className="mt-1 font-heading text-[23px] font-semibold text-navy">Traveler reviews</h2>
              <p className="mt-1 text-[13px] text-navy/55">
                Based on {testimonials.summary.reviews.toLocaleString("en-US")} guest reviews across Rita Tours journeys.
                These stories are not specific to this tour.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-electric">From our travelers</p>
              <h3 className="mt-1 font-heading text-[21px] font-semibold text-navy">Stories worth sharing</h3>
            </div>
            <span className="text-[11px] text-navy/45">Guest experiences across our journeys</span>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {testimonials.reviews.slice(0, 3).map((review) => (
              <article key={review.id} className="rounded-[18px] border border-navy/[0.08] bg-white p-5">
                <RatingStars rating={review.rating} />
                <h4 className="mt-3 font-heading text-[16px] font-semibold leading-snug text-navy">{review.title}</h4>
                <p className="mt-2 text-[12px] leading-relaxed text-navy/60">“{review.quote}”</p>
                <div className="mt-4 border-t border-navy/[0.08] pt-3">
                  <p className="text-[12px] font-semibold text-navy">{review.name}</p>
                  <p className="mt-0.5 text-[10px] text-navy/45">{review.trip} · {review.date}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-4 text-[10px] leading-relaxed text-navy/40">{testimonials.note}</p>
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
