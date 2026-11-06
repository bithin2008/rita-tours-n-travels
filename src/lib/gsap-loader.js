let loader;

/**
 * Loads GSAP and ScrollTrigger in the browser, once per session.
 * Browser-only by design: on the server it resolves to null and components
 * simply render their markup without animation.
 */
export function loadGsap() {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (!loader) {
    loader = Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([core, trigger]) => {
      const gsap = core.gsap ?? core.default;
      const ScrollTrigger = trigger.ScrollTrigger ?? trigger.default;
      gsap.registerPlugin(ScrollTrigger);
      return { gsap, ScrollTrigger };
    });
  }
  return loader;
}