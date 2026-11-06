import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Image } from "@/components/ui/image";
import useReducedMotion from "@/hooks/useReducedMotion";
import { loadGsap } from "@/lib/gsap-loader";

/**
 * Shared hero for interior pages: breadcrumb, headline and an optional slot
 * for page-specific content (stats, controls) over a dimmed photograph.
 * The copy lines lift into place on arrival with GSAP.
 */
export default function PageHero({ eyebrow, title, subtitle, image, imageAlt = "", children }) {
  const contentRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;
    const node = contentRef.current;
    if (!node) return undefined;

    let cancelled = false;
    let tween;

    loadGsap()
      .then((lib) => {
        if (!lib || cancelled) return;
        const items = Array.from(node.children).filter(Boolean);
        if (!items.length) return;

        tween = lib.gsap.fromTo(
          items,
          { autoAlpha: 0, y: 22 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.1,
            delay: 0.08,
            clearProps: "opacity,visibility,transform",
          },
        );
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      tween?.kill();
    };
  }, [reduced]);

  return (
    <section className="relative isolate overflow-hidden bg-navy">
      <Image
        src={image}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(100deg,rgba(10,31,68,0.95)_0%,rgba(10,31,68,0.8)_48%,rgba(10,31,68,0.45)_100%)]"
      />
      <div ref={contentRef} className="shell relative z-10 pb-14 pt-32 sm:pt-36 lg:pb-20 lg:pt-40">
        <nav aria-label="Breadcrumb" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
          <Link to="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <span aria-hidden="true" className="px-2 text-white/25">
            /
          </span>
          <span className="text-mint">{eyebrow}</span>
        </nav>

        <h1 className="mt-5 max-w-4xl font-heading text-[32px] font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-[44px] lg:text-[54px]">
          {title}
        </h1>

        {subtitle ? (
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/70 sm:text-[16.5px]">{subtitle}</p>
        ) : null}

        {children}
      </div>
    </section>
  );
}