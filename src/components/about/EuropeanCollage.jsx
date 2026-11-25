"use client";
import Image from "next/image";
import { useState } from "react";
import SectionHeading from "@/components/site/SectionHeading";

const collageImages = [
  {
    src: "/images/collage/amsterdam.jpg",
    alt: "Amsterdam canals and narrow historic houses at golden hour",
    label: "Amsterdam, Netherlands",
    theme: "Canal Photography",
  },
  {
    src: "/images/collage/leiden.jpg",
    alt: "Leiden historic architecture and canal views",
    label: "Leiden, Netherlands",
    theme: "Dutch Windmills",
  },
  {
    src: "/images/collage/berchtesgaden.jpg",
    alt: "Berchtesgaden snow-capped mountains and alpine lakes",
    label: "Berchtesgaden, Germany",
    theme: "Mountain Panorama",
  },
  {
    src: "/images/collage/allianz-arena.jpg",
    alt: "Allianz Arena football stadium in Munich, Germany",
    label: "Munich, Germany",
    theme: "Illuminated Exterior",
  },
  {
    src: "/images/collage/giethoorn.jpg",
    alt: "Giethoorn canal town with thatched-roof houses",
    label: "Giethoorn, Netherlands",
    theme: "Thatched Cottages",
  },
  {
    src: "/images/collage/esch-sur-sure.jpg",
    alt: "Esch-sur-Sure historic architecture and river views",
    label: "Esch-sur-Sure, Luxembourg",
    theme: "Medieval Village",
  },
  {
    src: "/images/collage/dinant.jpg",
    alt: "Dinant historic castle and river views",
    label: "Dinant, Belgium",
    theme: "Limestone Caves",
  },
  {
    src: "/images/collage/utrecht.jpg",
    alt: "Utrecht historic architecture and canal views",
    label: "Utrecht, Netherlands",
    theme: "Historic Architecture",
  },
];

export default function EuropeanCollage() {
  const [lightbox, setLightbox] = useState(null);

  const openLightbox = (item) => setLightbox(item);
  const closeLightbox = () => setLightbox(null);

  return (
    <section id="collage" className="section scroll-mt-24 bg-white">
      <div className="shell">
        <SectionHeading
          eyebrow="Europe in pictures"
          title="The essence, in frames"
          subtitle="History written in stone, culture served on plates, moments captured on the road."
          align="center"
        />

        <div
          className="mt-12 columns-1 sm:columns-2 lg:columns-4 gap-6"
          style={{ columnGap: "1.5rem" }}
        >
          {collageImages.map((item) => (
            <div
              key={item.label}
              className="break-inside-avoid mb-6 overflow-hidden rounded-[24px] bg-navy/5 cursor-pointer relative group"
              onClick={() => openLightbox(item)}
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out pointer-events-none"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,31,68,0.85)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 sm:p-8 z-10 pointer-events-none">
                  <div>
                    <span className="inline-block rounded-full bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-navy/80">
                      {item.theme}
                    </span>
                    <h3 className="mt-2.5 font-heading text-[16px] font-semibold tracking-tight text-white leading-snug">
                      {item.label}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {lightbox && (
          <div
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 sm:p-8"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={`Lightbox: ${lightbox.label}`}
          >
            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="relative max-w-4xl max-h-[90vh] flex flex-col items-center cursor-pointer">
              <Image
                src={lightbox.src}
                alt={lightbox.alt}
                width={800}
                height={1000}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 640px"
                className="rounded-[24px] shadow-[0_0_60px_rgba(0,0,0,0.8)] object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-8 z-10">
                <div>
                  <span className="inline-block rounded-full bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-navy/80">
                    {lightbox.theme}
                  </span>
                  <h3 className="mt-3 font-heading text-[20px] font-semibold tracking-tight text-white leading-snug">
                    {lightbox.label}
                  </h3>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-20 rounded-full bg-white/10 px-3 py-2 text-white backdrop-blur hover:bg-white/20 transition-colors"
              aria-label="Close lightbox"
            >
              <svg className="h-5 w-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        )}

        <p className="mt-10 max-w-2xl mx-auto text-center text-[13px] leading-relaxed text-navy/45">
          Each frame captured during our own journeys — real places, real food, real moments waiting for you to
          experience them too.
        </p>
      </div>
    </section>
  );
}
