"use client";
import Link from "next/link";
import { ArrowRight, Camera } from "lucide-react";
import { Image } from "@/components/ui/image";
import SectionHeading from "@/components/site/SectionHeading";
import { getPhotoStories } from "@/lib/data-service";
import { useApp } from "@/lib/AppContext";

export default function PhotoStories() {
  const { t } = useApp();
  const { items, note } = getPhotoStories();
  const stories = items.slice(0, 4);

  return (
    <section id="photo-stories" className="section scroll-mt-24 bg-cloud">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="06 — Photo stories"
            title={t("section.stories")}
            subtitle={t("section.storiesSub")}
          />
          <Link
            href="/testimonials"
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-navy/15 bg-white px-5 py-2.5 text-[13px] font-semibold text-navy transition-colors hover:border-electric hover:text-electric"
          >
            {t("cta.viewAllStories")}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stories.map((story) => (
            <Link
              key={story.id}
              href="/testimonials"
              className="group relative block break-inside-avoid overflow-hidden rounded-[20px] bg-navy"
            >
              <Image
                src={story.image}
                alt={story.caption}
                className="aspect-[4/5] w-full object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
                loading="lazy"
              />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-navy">
                <Camera className="h-3 w-3" aria-hidden="true" />
                {t("label.sample")}
              </span>
              <span className="absolute inset-x-0 bottom-0 p-4">
                <span className="block text-[10.5px] font-semibold uppercase tracking-[0.14em] text-mint">
                  {story.destination}
                </span>
                <span className="mt-1 block max-w-[34ch] font-heading text-[13.5px] font-medium leading-snug text-white/90">
                  {story.caption}
                </span>
              </span>
            </Link>
          ))}
        </div>

        {/* <p className="mt-5 text-[11.5px] leading-relaxed text-navy/45">{note}</p> */}
      </div>
    </section>
  );
}