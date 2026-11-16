"use client";
import Image from "next/image";
import SectionHeading from "@/components/site/SectionHeading";

const collageImages = [
  {
    src: "/images/collage/amsterdam.jpg",
    alt: "Amsterdam canals and narrow historic houses at golden hour",
    label: "Amsterdam",
    theme: "History",
    span: { row: 2, col: 2 },
    ratio: "3/4",
  },
  {
    src: "/images/collage/paris.jpg",
    alt: "Parisian café culture and cobblestone streets",
    label: "Paris",
    theme: "Culture",
    span: { row: 1, col: 1 },
    ratio: "4/5",
  },
  {
    src: "/images/collage/amalfi-coast.jpg",
    alt: "Amalfi Coast pastel villages and lemon groves",
    label: "Amalfi Coast",
    theme: "History",
    span: { row: 2, col: 1 },
    ratio: "5/4",
  },
  {
    src: "/images/collage/barcelona.jpg",
    alt: "Spanish tapas and Mediterranean seafood on rustic wood",
    label: "Barcelona",
    theme: "Food",
    span: { row: 1, col: 1 },
    ratio: "3/4",
  },
  {
    src: "/images/collage/santorini.jpg",
    alt: "Santorini white-washed buildings with blue domes",
    label: "Santorini",
    theme: "Culture",
    span: { row: 2, col: 1 },
    ratio: "4/3",
  },
  {
    src: "/images/collage/tuscany.jpg",
    alt: "Tuscan vineyard rolling hills cypress trees",
    label: "Tuscany",
    theme: "Food",
    span: { row: 1, col: 1 },
    ratio: "4/5",
  },
  {
    src: "/images/collage/vienna.jpg",
    alt: "Vienna historic palace architecture gardens",
    label: "Vienna",
    theme: "Culture",
    span: { row: 1, col: 1 },
    ratio: "5/4",
  },
  {
    src: "/images/collage/prague.jpg",
    alt: "Prague Charles Bridge old town spires at dusk",
    label: "Prague",
    theme: "History",
    span: { row: 2, col: 1 },
    ratio: "3/4",
  },
];

export default function EuropeanCollage() {
  return (
    <section id="collage" className="section scroll-mt-24 bg-white">
      <div className="shell">
        <SectionHeading
          eyebrow="Europe in pictures"
          title="The essence, in frames"
          subtitle="History written in stone, culture served on plates, moments captured on the road."
          align="center"
        />

        <div className="mt-12 grid grid-cols-4 gap-6 lg:gap-8">
          {collageImages.map((item) => (
            <div
              key={item.label}
              className={`relative overflow-hidden rounded-[24px] bg-navy/5 group aspect-[${item.ratio}] ${item.span.col === 2 ? "lg:col-span-2" : ""} ${item.span.row === 2 ? "lg:row-span-2" : ""}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,31,68,0.85)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 sm:p-8">
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
          ))}
        </div>

        <p className="mt-10 max-w-2xl mx-auto text-center text-[13px] leading-relaxed text-navy/45">
          Each frame captured during our own journeys — real places, real food, real moments waiting for you to
          experience them too.
        </p>
      </div>
    </section>
  );
}
