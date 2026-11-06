import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PageHero from "@/components/site/PageHero";
import SectionHeading from "@/components/site/SectionHeading";
import FaqAccordion from "@/components/faqs/FaqAccordion";
import Reveal from "@/components/animation/Reveal";
import { listFaqs } from "@/lib/server-fns";
import { getSiteSettings } from "@/lib/data-service";

const settings = getSiteSettings();

export const Route = createFileRoute("/faqs")({
  loader: () => listFaqs(),
  head: () => ({
    meta: [
      { title: "FAQs — RITA Tours N Travels" },
      {
        name: "description",
        content:
          "Answers to the questions we hear most: how our journeys are planned, what payments and deposits look like, and which travel documents you need for Europe.",
      },
      { property: "og:title", content: "Frequently asked questions — RITA Tours N Travels" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: FaqsPage,
});

function FaqsPage() {
  const faqs = Route.useLoaderData();
  const whatsappHref = `https://wa.me/${settings.brand.whatsapp}`;

  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="FAQs"
          title="Everything travellers ask us"
          subtitle="Clear answers on planning, payments, visas and travelling across Europe with RITA. Can't find yours? Our planning desk replies in a day."
          image="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1800&q=80"
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
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
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
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-navy/15 px-4 py-2.5 text-[12.5px] font-semibold text-navy transition-colors hover:border-electric hover:text-electric"
                  >
                    Contact page
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>

            <FaqAccordion faqs={faqs} />
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}