import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { getTestimonials } from "@/lib/data-service";

export default function TestimonialsCta() {
  const { summary } = getTestimonials();

  return (
    <section className="section bg-white">
      <div className="shell">
        <div className="relative isolate overflow-hidden rounded-[28px] bg-navy px-6 py-14 text-center sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(30,107,255,0.45),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(25,195,177,0.35),transparent_50%)]"
          />
          <div className="relative z-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-mint">
              {summary.reviews.toLocaleString("en-US")} journeys and counting
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl font-heading text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-white sm:text-[38px]">
              The next story we publish could be yours
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-white/65">
              Tell us the journey you have in mind. A planner replies within one business day with a first idea — no
              commitment, no deposit.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/tour-planning"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-electric px-7 text-[13px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1560f0] sm:w-auto"
              >
                Plan my journey
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/tours"
                className="inline-flex h-12 w-full items-center justify-center rounded-full border border-white/25 px-7 text-[13px] font-semibold text-white transition-colors hover:border-mint hover:text-mint sm:w-auto"
              >
                Browse journeys
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}