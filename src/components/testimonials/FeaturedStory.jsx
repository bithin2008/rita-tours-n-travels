import { BadgeCheck, Quote } from "lucide-react";
import { Image } from "@/components/ui/image";
import StarRating from "@/components/testimonials/StarRating";
import { getTestimonials } from "@/lib/data-service";

export default function FeaturedStory() {
  const { featured, summary } = getTestimonials();

  return (
    <section className="section bg-white">
      <div className="shell grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <div className="overflow-hidden rounded-[26px] border border-navy/10">
            <Image
              src={featured.image}
              alt={featured.imageAlt}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="absolute bottom-5 left-5 right-5 rounded-[18px] border border-white/60 bg-white/95 p-4 backdrop-blur sm:left-6 sm:right-auto sm:max-w-[240px]">
            <StarRating rating={summary.rating} />
            <p className="mt-2 text-[12px] leading-relaxed text-navy/65">
              <span className="font-heading text-[14px] font-semibold text-navy">{summary.rating}/5</span> from{" "}
              {summary.reviews.toLocaleString("en-US")} verified guest reviews
            </p>
          </div>
        </div>

        <div>
          <span className="eyebrow">
            <span className="h-[1px] w-6 bg-electric/60" aria-hidden="true" />
            Featured story
          </span>

          <h2 className="mt-4 font-heading text-[28px] font-semibold leading-[1.14] tracking-[-0.02em] text-navy sm:text-[36px]">
            {featured.title}
          </h2>

          <div className="relative mt-6 rounded-[22px] border border-navy/10 bg-cloud/60 p-6">
            <Quote className="absolute -top-3 left-5 h-7 w-7 rounded-full bg-white p-1 text-electric" aria-hidden="true" />
            <p className="text-[14.5px] leading-relaxed text-navy/70">{featured.quote}</p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="font-heading text-[15px] font-semibold text-navy">{featured.name}</p>
            <span className="inline-flex items-center gap-1 rounded-full bg-mint/12 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[#0e8f83]">
              <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Verified guest
            </span>
          </div>
          <p className="mt-1 text-[12.5px] text-navy/50">
            {featured.location} · {featured.journey}
          </p>

          <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-navy/10 pt-6">
            {featured.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-[11px] leading-snug text-navy/50">{stat.label}</dt>
                <dd className="mt-1 font-heading text-[24px] font-semibold leading-none tracking-[-0.02em] text-electric">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}