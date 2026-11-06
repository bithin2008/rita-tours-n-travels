import { useEffect, useState } from "react";
import { Compass } from "lucide-react";

/** Brief compass intro that clears itself; skipped when motion is reduced. */
export default function CompassLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(false);
      return;
    }
    const fade = window.setTimeout(() => setFading(true), 700);
    const hide = window.setTimeout(() => setVisible(false), 1050);
    return () => {
      window.clearTimeout(fade);
      window.clearTimeout(hide);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[90] grid place-items-center bg-navy transition-opacity duration-300 ${fading ? "opacity-0" : "opacity-100"}`}
    >
      <div className="flex flex-col items-center gap-4">
        <Compass className="h-12 w-12 animate-compass text-white" strokeWidth={1.2} />
        <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.32em] text-white/50">
          RITA Tours N Travels
        </p>
      </div>
    </div>
  );
}