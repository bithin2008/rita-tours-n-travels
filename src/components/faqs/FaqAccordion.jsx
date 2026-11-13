"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Chip } from "@/components/planning/FormBits";

const CATEGORIES = [
  { id: "all", label: "All questions" },
  { id: "travel", label: "Travel" },
  { id: "payments", label: "Payments" },
  { id: "visa", label: "Visas & documents" },
  { id: "general", label: "General" },
];

export default function FaqAccordion({ faqs }) {
  const [category, setCategory] = useState("all");
  const visible = category === "all" ? faqs : faqs.filter((faq) => faq.category === category);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((item) => (
          <Chip
            key={item.id}
            active={category === item.id}
            onClick={() => setCategory(item.id)}
            className="px-4 py-2.5"
          >
            {item.label}
          </Chip>
        ))}
      </div>

      {visible.length ? (
        <Accordion type="single" collapsible className="mt-8 space-y-3">
          {visible.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="overflow-hidden rounded-[18px] border border-navy/10 bg-white px-5 transition-colors duration-300 data-[state=open]:border-electric/35 data-[state=open]:shadow-[0_20px_40px_-32px_rgba(10,31,68,0.5)]"
            >
              <AccordionTrigger className="py-5 text-left font-heading text-[15px] font-semibold leading-snug text-navy hover:text-electric hover:no-underline data-[state=open]:text-electric [&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0 [&>svg]:text-electric">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 pr-8 text-[13.5px] leading-relaxed text-navy/65">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="mt-8 rounded-[18px] border border-dashed border-navy/15 bg-white px-6 py-12 text-center">
          <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-electric/10 text-electric">
            <HelpCircle className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="mt-4 font-heading text-[15px] font-semibold text-navy">Nothing in this section yet</p>
          <p className="mt-1.5 text-[13px] text-navy/55">
            Ask our planning desk and we will answer within one business day.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-electric px-5 py-2.5 text-[12.5px] font-semibold text-white transition-colors hover:bg-[#1560f0]"
          >
            Contact us
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      )}
    </div>
  );
}