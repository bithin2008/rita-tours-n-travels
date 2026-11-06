import { useState } from "react";
import { BadgeCheck } from "lucide-react";
import SectionHeading from "@/components/site/SectionHeading";
import StarRating from "@/components/testimonials/StarRating";
import { getTestimonials } from "@/lib/data-service";
import { cn } from "@/lib/utils";

const REGIONS = ["All", "Italy", "The Alps", "Greece", "Iberia", "Cities"];

export default function ReviewsWall() {
  const { reviews, summary } = getTestimonials();
  const [active, setActive] = useState("All");
  const visible = active === "All" ? reviews : reviews.filter((review) => review.region === active);

  return (
    <section className="section bg-white">
      <div className="shell">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Written reviews"
            title="1,240 reviews, none of them weeded"
            subtitle="Every review below comes from a guest who travelled with us. We publish the mixed ones too."
          />
          <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-navy/10 bg-cloud/70 px-4 py-3">
            <StarRating rating={summary.rating} />
            <p className="text-[12px] text-navy/60">
              <span className="font-heading text-[14px] font-semibold text-navy">{summary.rating}</span> average ·{" "}
              {summary.repeat}% travel again
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {REGIONS.map((region) => (
            <button
              key={region}
              type="button"
              onClick={() => setActive(region)}
              aria-pressed={active === region}
              className={cn(
                "rounded-full border px-4 py-2 text-[12.5px] font-medium transition-all duration-300",
                active === region
                  ? "border-navy bg-navy text-white"
                  : "border-navy/12 bg-white text-navy/65 hover:border-electric/40 hover:text-electric",
              )}
            >
              {region}
            </button>
          ))}
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((review) => (
            <article
              key={review.id}
              className="flex flex-col rounded-[20px] border border-navy/10 bg-cloud/40 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-electric/25 hover:bg-white hover:shadow-[0_26px_50px_-40px_rgba(10,31,68,0.55)]"
            >
              <div className="flex items-start justify-between gap-3">
                <StarRating rating={review.rating} />
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#0e8f83]">
                  <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  Verified
                </span>
              </div>

              <h3 className="mt-3 font-heading text-[14.5px] font-semibold leading-snug text-navy">{review.title}</h3>
              <p className="mt-2 flex-1 text-[13px] leading-relaxed text-navy/65">“{review.quote}”</p>

              <div className="mt-4 border-t border-navy/[0.08] pt-3">
                <p className="text-[12.5px] font-semibold text-navy">{review.name}</p>
                <p className="mt-0.5 text-[11.5px] text-navy/50">
                  {review.location} · {review.date}
                </p>
                <p className="mt-1.5 text-[11px] uppercase tracking-[0.08em] text-electric/80">{review.trip}</p>
              </div>
            </article>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="mt-8 rounded-2xl border border-dashed border-navy/15 bg-cloud/50 px-5 py-10 text-center text-[13px] text-navy/55">
            No reviews from this region yet — they are on their way.
          </p>
        ) : null}
      </div>
    </section>
  );
}