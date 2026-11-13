"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MoveHorizontal } from "lucide-react";
import { Image } from "@/components/ui/image";
import SectionHeading from "@/components/site/SectionHeading";
import { getComparisons } from "@/lib/data-service";
import { useApp } from "@/lib/AppContext";
import { cn } from "@/lib/utils";

export default function Comparison() {
  const { t } = useApp();
  const pairs = getComparisons();
  const [activeIndex, setActiveIndex] = useState(0);
  const [position, setPosition] = useState(52);
  const [dragging, setDragging] = useState(false);
  const frameRef = useRef(null);
  const pair = pairs[activeIndex];

  useEffect(() => setPosition(52), [activeIndex]);

  const moveTo = (clientX) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(96, Math.max(4, next)));
  };

  const onPointerDown = (event) => {
    setDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
    moveTo(event.clientX);
  };
  const onPointerMove = (event) => {
    if (!dragging) return;
    moveTo(event.clientX);
  };
  const endDrag = () => setDragging(false);

  return (
    <section id="perspectives" className="section scroll-mt-24 bg-white">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="02 — Two perspectives"
            title={t("section.comparison")}
            subtitle={t("section.comparisonSub")}
          />
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Choose a destination pair">
            {pairs.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "rounded-full border px-4 py-2 text-[12.5px] font-semibold transition-colors duration-300",
                  index === activeIndex
                    ? "border-navy bg-navy text-white"
                    : "border-navy/15 text-navy/65 hover:border-electric hover:text-electric",
                )}
              >
                {item.destination.split(",")[0]}
              </button>
            ))}
          </div>
        </div>

        <figure className="mt-10">
          <div
            ref={frameRef}
            className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-[24px] bg-navy sm:aspect-[16/9]"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onPointerLeave={endDrag}
          >
            <Image
              src={pair.afterImage}
              alt={`${pair.destination} — ${pair.afterLabel}`}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
              aria-hidden="true"
            >
              <Image
                src={pair.beforeImage}
                alt={`${pair.destination} — ${pair.beforeLabel}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-navy/75 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
              {pair.beforeLabel}
            </span>
            <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-white/85 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy backdrop-blur-sm">
              {pair.afterLabel}
            </span>

            <div
              className="pointer-events-none absolute inset-y-0 w-[2px] bg-white/90 shadow-[0_0_18px_rgba(10,31,68,0.45)]"
              style={{ left: `${position}%` }}
              aria-hidden="true"
            />
            <button
              type="button"
              role="slider"
              aria-label={`Reveal ${pair.afterLabel} view`}
              aria-valuemin={4}
              aria-valuemax={96}
              aria-valuenow={Math.round(position)}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") setPosition((value) => Math.max(4, value - 4));
                if (event.key === "ArrowRight") setPosition((value) => Math.min(96, value + 4));
              }}
              className="absolute top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border-2 border-white bg-electric text-white shadow-lg transition-transform duration-200 hover:scale-105 focus-visible:outline-offset-4"
              style={{ left: `${position}%` }}
            >
              <MoveHorizontal className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-navy/70 px-3 py-1.5 text-[11px] font-medium text-white/85 backdrop-blur-sm">
              <ChevronLeft className="h-3 w-3" aria-hidden="true" />
              Drag to compare
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
            </div>
          </div>

          <figcaption className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="font-heading text-[17px] font-semibold text-navy">
              {pair.title} · <span className="font-medium text-navy/60">{pair.destination}</span>
            </p>
            <p className="max-w-xl text-[14px] leading-relaxed text-navy/60">{pair.caption}</p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}