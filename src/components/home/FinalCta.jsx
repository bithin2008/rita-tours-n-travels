import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { getTourById } from "@/lib/data-service";
import { useApp } from "@/lib/AppContext";

export default function FinalCta() {
  const { t } = useApp();
  const backdrop = getTourById("amalfi-coast");

  return (
    <section id="final-cta" className="relative isolate overflow-hidden bg-navy">
      <Image
        src={backdrop.heroImage}
        alt="Coastal road above the Mediterranean at golden hour"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(95deg,rgba(10,31,68,0.92)_0%,rgba(10,31,68,0.72)_45%,rgba(10,31,68,0.4)_100%)]"
      />
      <div className="shell relative z-10 py-20 sm:py-24 lg:py-28">
        <div className="max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-[42px] lg:text-[52px]">
            {t("section.finalTitle")}
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/75 sm:text-[17px]">
            {t("section.finalSub")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/tours"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-coral px-6 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#f04d2c] hover:shadow-[0_18px_36px_-16px_rgba(255,92,58,0.8)]"
            >
              {t("cta.exploreTours")}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              to="/tour-planning"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/45 px-6 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-navy"
            >
              {t("cta.planJourney")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}