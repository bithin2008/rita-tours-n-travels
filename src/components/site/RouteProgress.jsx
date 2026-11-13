"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Global navigation progress bar: creeps forward while the router is loading a
 * route, completes, then fades out. Sits above the fixed site header.
 */
export default function RouteProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState({ visible: false, value: 0 });

  useEffect(() => {
    setProgress((prev) => ({ visible: true, value: prev.value > 0 ? Math.max(prev.value, 18) : 14 }));

    const tick = window.setInterval(() => {
      setProgress((prev) => {
        if (!prev.visible || prev.value >= 90) return prev;
        return { visible: true, value: prev.value + Math.max(1.5, (90 - prev.value) * 0.14) };
      });
    }, 170);

    const hide = window.setTimeout(() => setProgress({ visible: false, value: 0 }), 420);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(hide);
    };
  }, [pathname]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px]">
      <div
        className="h-full rounded-r-full bg-[linear-gradient(90deg,#1E6BFF_0%,#19C3B1_60%,#FF5C3A_100%)] shadow-[0_0_12px_rgba(30,107,255,0.55)] transition-[width,opacity] duration-300 ease-out"
        style={{ width: `${progress.value}%`, opacity: progress.visible ? 1 : 0 }}
      />
    </div>
  );
}
