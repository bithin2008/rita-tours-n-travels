import { cn } from "@/lib/utils";

export default function SectionHeading({ eyebrow, title, subtitle, align = "left", light = false, className }) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "eyebrow",
            light && "text-mint",
          )}
        >
          <span className={cn("h-[1px] w-6", light ? "bg-mint/70" : "bg-electric/60")} aria-hidden="true" />
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "mt-4 font-heading text-3xl font-semibold leading-[1.15] tracking-[-0.02em] sm:text-4xl lg:text-[42px]",
          light ? "text-white" : "text-navy",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-[17px]",
            light ? "text-white/75" : "text-navy/65",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}