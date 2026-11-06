import { useEffect, useRef } from "react";
import useReducedMotion from "@/hooks/useReducedMotion";
import { loadGsap } from "@/lib/gsap-loader";
import { cn } from "@/lib/utils";

/**
 * GSAP scroll reveal for a group: the children rise into place one after
 * another the first time the group enters the viewport. An IntersectionObserver
 * decides when, so late loading imagery cannot push the trigger out of place.
 */
export default function RevealGroup({ children, className, stagger = 0.08, y = 26, duration = 0.8 }) {
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

        const items = Array.from(node.children);
        if (!items.length) return;

        gsap.set(items, { autoAlpha: 0, y });

        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              observer.disconnect();
              tween = gsap.to(items, {
                autoAlpha: 1,
                y: 0,
                duration,
                ease: "power3.out",
                stagger,
                clearProps: "opacity,visibility,transform",
              });
            });
          },
          { rootMargin: "0px 0px -10% 0px" },
        );
        observer.observe(node);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      observer?.disconnect();
      tween?.kill();
    };
  }, [reduced, stagger, y, duration]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}