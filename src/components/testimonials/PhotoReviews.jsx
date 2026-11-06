import { Camera } from "lucide-react";
import { Image } from "@/components/ui/image";
import SectionHeading from "@/components/site/SectionHeading";
import StarRating from "@/components/testimonials/StarRating";
import { getTestimonials } from "@/lib/data-service";

export default function PhotoReviews() {
  const { photoReviews } = getTestimonials();

  return (
    <section className="section bg-cloud">
      <div className="shell">
        <SectionHeading
          eyebrow="Photo reviews"
          title="Sent to us from the road"
          subtitle="Guests share the frame that stayed with them, and the line they would tell a friend."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {photoReviews.map((review) => (
            <figure
              key={review.id}
              className="group overflow-hidden rounded-[22px] border border-navy/10 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-44px_rgba(10,31,68,0.6)]"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={review.image}
                  alt={review.imageAlt}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
                />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-navy backdrop-blur">
                  <Camera className="h-3 w-3" aria-hidden="true" />
                  Guest photo
                </span>
              </div>

              <figcaption className="p-5">
                <StarRating rating={review.rating} />
                <blockquote className="mt-3 text-[13.5px] leading-relaxed text-navy/70">“{review.caption}”</blockquote>
                <p className="mt-4 font-heading text-[13px] font-semibold text-navy">{review.name}</p>
                <p className="mt-0.5 text-[11.5px] text-navy/50">{review.trip}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}