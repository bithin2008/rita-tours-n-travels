import { useState } from "react";
import { Play, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Image } from "@/components/ui/image";
import SectionHeading from "@/components/site/SectionHeading";
import { getUgcVideos } from "@/lib/data-service";

export default function VideoReviews() {
  const { items, note } = getUgcVideos();
  const [activeId, setActiveId] = useState(null);
  const active = items.find((item) => item.id === activeId) ?? null;

  return (
    <section id="video-reviews" className="section scroll-mt-24 bg-navy text-white">
      <div className="shell">
        <SectionHeading
          eyebrow="Video reviews"
          title="Sixty seconds, filmed by guests"
          subtitle="Unedited clips from the road — the view, the room, and the thing they did not expect."
          light
        />

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveId(item.id)}
              className="group relative isolate aspect-[9/14] overflow-hidden rounded-[20px] bg-navy/60 text-left"
            >
              <Image
                src={item.poster}
                alt={`${item.destination} guest video placeholder`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
              />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/10 to-navy/30" />

              <span className="absolute left-2.5 top-2.5 rounded-full bg-white/85 px-2 py-1 text-[9.5px] font-semibold uppercase tracking-[0.1em] text-navy">
                Coming soon
              </span>

              <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/60 bg-white/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                <Play className="ml-0.5 h-4 w-4 fill-white text-white" aria-hidden="true" />
              </span>

              <span className="absolute inset-x-0 bottom-0 p-3.5">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-mint">
                  {item.destination}
                </span>
                <span className="mt-1 block text-[11.5px] leading-snug text-white/65">{item.caption}</span>
              </span>
            </button>
          ))}
        </div>

        <p className="mt-5 max-w-2xl text-[11.5px] leading-relaxed text-white/40">{note}</p>
      </div>

      <Dialog open={Boolean(active)} onOpenChange={(open) => !open && setActiveId(null)}>
        <DialogContent className="max-w-md border-white/15 bg-navy p-0 text-white">
          {active ? (
            <div>
              <div className="relative aspect-[9/14] max-h-[62vh] w-full overflow-hidden rounded-t-lg">
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
                    <Image src={active.poster} alt={`${active.destination} video placeholder`} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-navy/70 px-6 text-center">
                      <span className="rounded-full border border-white/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80">
                        Coming soon
                      </span>
                      <p className="max-w-[26ch] text-[13px] leading-relaxed text-white/80">
                        This guest clip has not been published yet. The card is a labelled placeholder, not a testimonial.
                      </p>
                    </div>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => setActiveId(null)}
                  aria-label="Close video"
                  className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-navy/70 text-white backdrop-blur-sm transition-colors hover:bg-navy"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <div className="p-5">
                <DialogTitle className="font-heading text-[17px] font-semibold text-white">
                  {active.destination}
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