"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";

const RITA_LOGO_URL =
  "images/logo.jpg";

/**
 * Official RITA Tours N Travels logo — the circular R badge with compass,
 * mountains, plane and the RITA wordmark. The artwork sits on its own white
 * field, so it is presented as a circular badge that reads on light and dark
 * surfaces.
 */
export default function Logo({ light = false, className }) {
  return (
    <Link
      href="/"
      aria-label="RITA Tours N Travels — home"
      className={cn("group inline-flex shrink-0 items-center", className)}
    >
      <img
        src={RITA_LOGO_URL}
        alt="RITA Tours N Travels"
        width="112"
        height="112"
        className={cn(
          "h-12 w-auto rounded-full object-contain transition-transform duration-500 group-hover:scale-[1.04] sm:h-14",
          light
            ? "shadow-[0_14px_30px_-16px_rgba(0,0,0,0.65)]"
            : "shadow-[0_10px_24px_-18px_rgba(10,31,68,0.5)]",
        )}
      />
    </Link>
  );
}