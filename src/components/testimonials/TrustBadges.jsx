import { Clock, HeartHandshake, ShieldCheck, Star } from "lucide-react";
import { getTestimonials } from "@/lib/data-service";

const ICONS = { star: Star, heart: HeartHandshake, shield: ShieldCheck, clock: Clock };

export default function TrustBadges() {
  const { badges } = getTestimonials();

  return (
    <section className="relative z-10 -mt-10 sm:-mt-12">
      <div className="shell">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[22px] border border-navy/10 bg-navy/10 soft-shadow lg:grid-cols-4">
          {badges.map((badge) => {
            const Icon = ICONS[badge.icon] ?? Star;
            return (
              <div key={badge.value} className="flex items-start gap-3 bg-white p-5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-electric/10 text-electric">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-heading text-[15px] font-semibold leading-tight text-navy">{badge.value}</p>
                  <p className="mt-1 text-[11.5px] leading-snug text-navy/55">{badge.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}