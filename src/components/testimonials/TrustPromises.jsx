import { ArrowRight, BadgeCheck, ShieldCheck, Users } from "lucide-react";
import { Link } from "@tanstack/react-router";
import SectionHeading from "@/components/site/SectionHeading";

const PROMISES = [
  {
    icon: BadgeCheck,
    title: "Only verified reviews",
    body: "A review is published after a guest has travelled and returned. No bought ratings, no edited quotes.",
  },
  {
    icon: ShieldCheck,
    title: "Protected payments",
    body: "Deposits and balances are held under EU package travel rules. If we cancel, you are refunded in full.",
  },
  {
    icon: Users,
    title: "A named planner, start to finish",
    body: "The person who plans your journey answers your questions — before, during and after the trip.",
  },
];

export default function TrustPromises() {
  return (
    <section className="section bg-cloud">
      <div className="shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Why guests trust us"
            title="The promises behind the reviews"
            subtitle="Trust is earned in the boring details: how bookings are held, who answers the phone, what happens when plans break."
          />
          <Link
            to="/faqs"
            className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-navy/15 bg-white px-5 py-2.5 text-[12.5px] font-semibold text-navy transition-colors hover:border-electric hover:text-electric"
          >
            Read our policies
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {PROMISES.map((promise) => {
            const Icon = promise.icon;
            return (
              <article key={promise.title} className="rounded-[22px] border border-navy/10 bg-white p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-electric/10 text-electric">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-heading text-[15px] font-semibold text-navy">{promise.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-navy/60">{promise.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}