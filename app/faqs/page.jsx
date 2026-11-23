import PageHero from "@/components/site/PageHero";
import SectionHeading from "@/components/site/SectionHeading";
import FaqAccordion from "@/components/faqs/FaqAccordion";
import Reveal from "@/components/animation/Reveal";
import { listFaqs } from "@/lib/server-actions";
import { getSiteSettings } from "@/lib/data-service";
import Link from "next/link";

const settings = getSiteSettings();

export const metadata = {
  title: "FAQs — RITA Tours N Travels",
  description:
    "Answers to the questions we hear most: how our journeys are planned, what payments and deposits look like, and which travel documents you need for Europe.",
  openGraph: {
    title: "Frequently asked questions — RITA Tours N Travels",
    type: "website",
  },
};

export default async function FaqsPage() {
  const faqs = await listFaqs();
  const whatsappHref = `https://wa.me/${settings.brand.whatsapp}`;

  return (
    <>
      <main>
        <PageHero
          eyebrow="FAQs"
          title="Everything travellers ask us"
          subtitle="Clear answers on planning, payments, visas and travelling across Europe with RITA. Can't find yours? Our planning desk replies in a day."
          image="images/faq-banner.jpg"
          imageAlt="A traveller planning a route with a map and passport"
        />

        <section className="section bg-cloud">
          <Reveal className="shell grid gap-12 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1fr)] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                eyebrow="Good to know"
                title="Before you pack"
                subtitle="These are the answers that come up most often in the first conversation with a planner."
                align="left"
              />
              <div className="mt-8 rounded-[22px] border border-navy/10 bg-white p-6 soft-shadow">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-mint/15 text-[#0e8f83]">
                  <svg className="h-5 w-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </span>
                <h3 className="mt-4 font-heading text-[16px] font-semibold text-navy">Still deciding?</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-navy/60">
                  Message the planning desk on WhatsApp or send an enquiry. No obligation, no call centre.
                </p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-full bg-[#0e8f83] px-4 py-2.5 text-[12.5px] font-semibold text-white transition-colors hover:bg-[#0b7a70]"
                  >
                    WhatsApp us
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-navy/15 px-4 py-2.5 text-[12.5px] font-semibold text-navy transition-colors hover:border-electric hover:text-electric"
                  >
                    Contact page
                    <svg className="h-3.5 w-3.5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  </Link>
                </div>
              </div>
            </div>

            <FaqAccordion faqs={faqs} />
          </Reveal>
        </section>
      </main>
    </>
  );
}
