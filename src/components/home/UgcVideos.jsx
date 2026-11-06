import { useState } from "react";
import { ArrowRight, Play, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Image } from "@/components/ui/image";
import SectionHeading from "@/components/site/SectionHeading";
import { getUgcVideos } from "@/lib/data-service";
import { useApp } from "@/lib/AppContext";

export default function UgcVideos() {
  const { t } = useApp();
  const { items, note } = getUgcVideos();
  const [activeIndex, setActiveIndex] = useState(null);
  const active = activeIndex === null ? null : items[activeIndex];

  return (
    <section id="stories-video" className="section scroll-mt-24 bg-navy text-white">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="05 — Video testimonials"
            title={t("section.videos")}
            subtitle={t("section.videosSub")}
            light
          />
          <Link
            to="/testimonials"
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:border-mint hover:text-mint"
          >
            {t("cta.shareStory")}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 no-scrollbar">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group relative isolate aspect-[9/16] w-[228px] shrink-0 snap-start overflow-hidden rounded-[20px] bg-navy/60 text-left sm:w-[248px]"
            >
              <Image
                src={item.poster}
                alt={`${item.destination} travel story placeholder`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
              />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/15 to-navy/25" />

              <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-navy">
                {t("label.sample")}
              </span>

              <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/60 bg-white/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                <Play className="ml-0.5 h-4 w-4 fill-white text-white" aria-hidden="true" />
              </span>

              <span className="absolute inset-x-0 bottom-0 p-4">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-mint">
                  {item.destination}
                </span>
                <span className="mt-1 block font-heading text-[14px] font-semibold text-white">{item.name}</span>
                <span className="mt-1 block text-[11.5px] leading-snug text-white/65">{item.caption}</span>
              </span>
            </button>
          ))}
        </div>

        <p className="mt-4 max-w-2xl text-[11.5px] leading-relaxed text-white/40">{note}</p>
      </div>

      <Dialog open={activeIndex !== null} onOpenChange={(open) => !open && setActiveIndex(null)}>
        <DialogContent className="max-w-md border-white/15 bg-navy p-0 text-white">
          {active ? (
            <div>
              <div className="relative aspect-[9/16] max-h-[62vh] w-full overflow-hidden rounded-t-lg">
                {active.videoUrl ? (
                  <video
                    key={active.id}
                    src={active.videoUrl}
                    poster={active.poster}
                    controls
                    autoPlay
                    playsInline
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <>
                    <Image src={active.poster} alt={`${active.destination} story placeholder`} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-navy/70 px-6 text-center">
                      <span className="rounded-full border border-white/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80">
                        {t("label.sample")}
                      </span>
                      <p className="max-w-[24ch] text-[13px] leading-relaxed text-white/80">
                        No guest clip has been published here yet. This card is a labelled placeholder, not a testimonial.
                      </p>
                    </div>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  aria-label="Close video"
                  className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-navy/70 text-white backdrop-blur-sm transition-colors hover:bg-navy"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <div className="p-5">
                <DialogTitle className="font-heading text-[17px] font-semibold text-white">
                  {active.name} · {active.destination}
                </DialogTitle>
                <DialogDescription className="mt-1.5 text-[13px] leading-relaxed text-white/65">
                  {active.caption}
                </DialogDescription>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}