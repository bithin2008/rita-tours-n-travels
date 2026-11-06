import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Mail, Phone } from "lucide-react";

const steps = [
  { title: "You send the outline", body: "Destination, dates, travellers and the kind of trip you want." },
  { title: "A planner replies", body: "Two or three route ideas with an honest price, within one business day." },
  { title: "We shape it together", body: "Stays, pace and details refined over email or a short call." },
  { title: "You approve, we book", body: "Nothing is reserved until you say yes in writing." },
];

export default function PlanningAside({ brand }) {
  return (
    <div className="space-y-4 lg:sticky lg:top-24">
      <div className="rounded-[24px] border border-navy/10 bg-white p-5">
        <h2 className="font-heading text-[15px] font-semibold text-navy">What happens next</h2>
        <ol className="mt-4 space-y-4">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-3">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-electric/10 text-[11px] font-semibold text-electric">
                {index + 1}
              </span>
              <div>
                <p className="text-[12.5px] font-semibold leading-snug text-navy">{step.title}</p>
                <p className="mt-0.5 text-[11.5px] leading-relaxed text-navy/50">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-[24px] bg-[linear-gradient(155deg,#0A1F44_0%,#12305F_100%)] p-5 text-white">
        <h2 className="font-heading text-[15px] font-semibold">Rather talk it through?</h2>
        <p className="mt-2 text-[12.5px] leading-relaxed text-white/65">
          Call the planning desk or email us — a real planner answers, not a queue.
        </p>
        <div className="mt-4 space-y-2.5 text-[12.5px]">
          <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-white/80 transition-colors hover:text-white">
            <Phone className="h-3.5 w-3.5 text-mint" aria-hidden="true" />
            {brand.phone}
          </a>
          <a href={`mailto:${brand.email}`} className="flex items-center gap-2 text-white/80 transition-colors hover:text-white">
            <Mail className="h-3.5 w-3.5 text-mint" aria-hidden="true" />
            {brand.email}
          </a>
          <p className="flex items-center gap-2 text-white/50">
            <Clock className="h-3.5 w-3.5 text-mint" aria-hidden="true" />
            {brand.responseTime}
          </p>
        </div>
        <Link
          to="/tours"
          className="group mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold text-mint transition-colors hover:text-white"
        >
          Browse ready-made journeys
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}