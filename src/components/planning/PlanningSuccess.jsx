"use client";
import Link from "next/link";
import { CalendarCheck, Mail, MessageSquare, PartyPopper } from "lucide-react";

export default function PlanningSuccess({ recap, reference, contact }) {
  return (
    <div className="rounded-[24px] border border-mint/40 bg-white p-7 text-center sm:p-10">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-mint/15 text-[#0d7a70]">
        <PartyPopper className="h-6 w-6" aria-hidden="true" />
      </span>
      <h2 className="mt-5 font-heading text-[24px] font-semibold text-navy">Your request is with a planner.</h2>
      <p className="mx-auto mt-2.5 max-w-md text-[13.5px] leading-relaxed text-navy/60">
        We reply within one business day with two or three outline routes and an honest price. Nothing is booked until
        you approve it.
      </p>
      {reference ? <p className="mt-3 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-navy/35">Reference {reference}</p> : null}

      <dl className="mt-6 grid gap-x-5 gap-y-3 rounded-2xl bg-cloud px-4 py-4 text-left sm:grid-cols-2">
        {recap.map((item) => (
          <div key={item.label}>
            <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-navy/40">{item.label}</dt>
            <dd className="mt-0.5 text-[13px] font-medium leading-snug text-navy/80">{item.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 grid gap-2.5 text-left sm:grid-cols-3">
        {[
          { icon: Mail, label: "A planner reads it", body: contact.responseTime },
          { icon: CalendarCheck, label: "We send outlines", body: "Two or three routes with prices" },
          { icon: MessageSquare, label: "We refine together", body: "By email, call or WhatsApp" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-2xl border border-navy/10 px-4 py-3.5">
              <Icon className="h-4 w-4 text-electric" aria-hidden="true" />
              <p className="mt-2 text-[12px] font-semibold text-navy">{item.label}</p>
              <p className="mt-0.5 text-[11.5px] leading-snug text-navy/50">{item.body}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/tours"
          className="inline-flex h-11 items-center justify-center rounded-full bg-navy px-5 text-[13px] font-semibold text-white transition-colors hover:bg-electric"
        >
          Browse journeys meanwhile
        </Link>
        <a
          href={`mailto:${contact.email}`}
          className="inline-flex h-11 items-center justify-center rounded-full border border-navy/15 px-5 text-[13px] font-semibold text-navy transition-colors hover:border-electric hover:text-electric"
        >
          Email {contact.email}
        </a>
      </div>
    </div>
  );
}