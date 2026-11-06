import { useEffect, useRef } from "react";
import useReducedMotion from "@/hooks/useReducedMotion";
import { loadGsap } from "@/lib/gsap-loader";
import { cn } from "@/lib/utils";

/**
 * GSAP scroll reveal: the wrapped block fades and lifts into place the first
 * time it enters the viewport. An IntersectionObserver decides when, so late
 * loading photography or content that changes height cannot push the trigger
 * out of position. Falls back to plain markup on the server and when the
 * visitor prefers reduced motion.
 */
export default function Reveal({ children, className, y = 26, delay = 0, duration = 0.9 }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;
    const node = ref.current;
    if (!node) return undefined;

    let observer;
    let tween;
    let cancelled = false;

    loadGsap()
      .then((lib) => {
        if (!lib || cancelled) return;
        const { gsap } = lib;

        gsap.set(node, { autoAlpha: 0, y });

        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              observer.disconnect();
              tween = gsap.to(node, {
                autoAlpha: 1,
                y: 0,
                duration,
                delay,
                ease: "power3.out",
                clearProps: "opacity,visibility,transform",
              });
            });
          },
          { rootMargin: "0px 0px -12% 0px" },
        );
        observer.observe(node);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      observer?.disconnect();
      tween?.kill();
    };
  }, [reduced, y, delay, duration]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}