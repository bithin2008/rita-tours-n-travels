import PageHero from "@/components/site/PageHero";
import StarRating from "@/components/testimonials/StarRating";
import TrustBadges from "@/components/testimonials/TrustBadges";
import FeaturedStory from "@/components/testimonials/FeaturedStory";
import PhotoReviews from "@/components/testimonials/PhotoReviews";
import ReviewsWall from "@/components/testimonials/ReviewsWall";
import VideoReviews from "@/components/testimonials/VideoReviews";
import TrustPromises from "@/components/testimonials/TrustPromises";
import TestimonialsCta from "@/components/testimonials/TestimonialsCta";
import Reveal from "@/components/animation/Reveal";
import { getTestimonials } from "@/lib/data-service";

export const metadata = {
  title: "Guest testimonials — RITA Tours N Travels",
  description:
    "Real guest stories from RITA journeys: photo reviews, video clips, written reviews and the promises behind them — 4.9 out of 5 across 1,240 verified reviews.",
  openGraph: {
    title: "Guest testimonials — RITA Tours N Travels",
    type: "website",
  },
};

export default function TestimonialsPage() {
  const { summary, note } = getTestimonials();

  return (
    <>
      <main>
        <PageHero
          eyebrow="Testimonials"
          title="The journeys, in their words"
          subtitle="Photo reviews from the road, unedited clips, and the written ones — including the trips that had to be rearranged mid-week."
          image="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1800&q=80"
          imageAlt="A traveller looking over a canal in Venice"
        >
          <div className="mt-8 inline-flex flex-wrap items-center gap-x-4 gap-y-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 backdrop-blur">
            <StarRating rating={summary.rating} />
            <span className="text-[12.5px] font-medium text-white/85">
              {summary.rating}/5 · {summary.reviews.toLocaleString("en-US")} verified reviews
            </span>
            <span aria-hidden="true" className="hidden h-3 w-px bg-white/25 sm:block" />
            <span className="text-[12.5px] text-white/60">{summary.recommend}% would travel with us again</span>
          </div>
        </PageHero>

        <Reveal>
          <TrustBadges />
        </Reveal>
        <Reveal>
          <FeaturedStory />
        </Reveal>
        <Reveal>
          <PhotoReviews />
        </Reveal>
        <Reveal>
          <ReviewsWall />
        </Reveal>
        <Reveal>
          <VideoReviews />
        </Reveal>
        <Reveal>
          <TrustPromises />
        </Reveal>
        <Reveal>
          <p className="bg-cloud pb-16 text-center text-[11px] text-navy/40">{note}</p>
        </Reveal>
        <Reveal>
          <TestimonialsCta />
        </Reveal>
      </main>
    </>
  );
}
