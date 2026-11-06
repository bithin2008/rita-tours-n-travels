import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CustomTripCard() {
  return (
    <div className="rounded-[24px] bg-[linear-gradient(155deg,#0A1F44_0%,#12305F_100%)] p-5 text-white">
      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 text-mint">
        <Sparkles className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
      </span>
      <h2 className="mt-4 font-heading text-[16px] font-semibold leading-snug">Nothing quite right?</h2>
      <p className="mt-2 text-[12.5px] leading-relaxed text-white/65">
        Every journey we sell started as a private plan. Tell us your dates, pace and budget and a planner will
        build something around them.
      </p>
      <Link
        to="/tour-planning"
        className="group mt-4 inline-flex items-center gap-2 rounded-full bg-electric px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-[#1560f0]"
      >
        Plan a custom trip
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </div>
  );
}