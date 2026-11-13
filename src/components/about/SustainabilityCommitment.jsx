"use client";
import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useApp } from "@/lib/AppContext";

export default function SustainabilityCommitment({ sustainability }) {
  const { t } = useApp();

  return (
    <section id="sustainability" className="relative isolate overflow-hidden bg-navy scroll-mt-24">
      <Image
        src={sustainability.image}
        alt={sustainability.imageAlt}
        className="absolute inset-0 h-full w-full object-cover opacity-30"
        loading="lazy"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(105deg,rgba(10,31,68,0.96)_0%,rgba(10,31,68,0.88)_55%,rgba(10,31,68,0.7)_100%)]"
      />

      <div className="shell relative z-10 py-20 sm:py-24">
        <span className="eyebrow text-mint">
          <span aria-hidden="true" className="h-[1px] w-6 bg-mint/70" />
          {sustainability.eyebrow}
        </span>
        <h2 className="mt-4 max-w-2xl font-heading text-3xl font-semibold leading-[1.14] tracking-[-0.02em] text-white sm:text-4xl lg:text-[42px]">
          {sustainability.title}
        </h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/70 sm:text-[16.5px]">
          {sustainability.subtitle}
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sustainability.commitments.map((item) => (
            <article key={item.title} className="rounded-[20px] border border-white/12 bg-white/[0.06] p-5 backdrop-blur-sm">
              <p className="font-heading text-[30px] font-semibold leading-none text-mint">{item.metric}</p>
              <p className="mt-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/45">{item.metricLabel}</p>
              <h3 className="mt-4 font-heading text-[14.5px] font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-[12.5px] leading-relaxed text-white/60">{item.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-9 flex flex-col gap-5 border-t border-white/12 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-[12.5px] leading-relaxed text-white/45">{sustainability.note}</p>
          <Link
            href="/tour-planning"
            className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-navy transition-colors hover:bg-mint"
          >
            <Leaf className="h-4 w-4 text-mint transition-colors group-hover:text-navy" aria-hidden="true" />
            {t("cta.planJourney")}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

      </div>
    </section>
  );
}