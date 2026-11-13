import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

export default function LegalLayout({ title, intro, updated, sections }) {
  return (
    <>
      <SiteHeader />
      <main className="bg-cloud pb-20 pt-32">
        <div className="shell">
          <div className="mx-auto max-w-3xl">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-electric"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Back to homepage
            </Link>

            <h1 className="mt-5 font-heading text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] text-navy sm:text-[42px]">
              {title}
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-navy/65">{intro}</p>
            <p className="mt-3 text-[12.5px] font-medium uppercase tracking-[0.14em] text-navy/40">
              Last updated {updated}
            </p>

            <nav aria-label="On this page" className="mt-9 rounded-[22px] border border-navy/10 bg-white p-6 soft-shadow">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy/45">On this page</p>
              <ol className="mt-3 grid gap-1.5 sm:grid-cols-2">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="text-[13px] leading-relaxed text-navy/70 transition-colors hover:text-electric">
                      {index + 1}. {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="mt-10 space-y-9">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-28">
                  <h2 className="font-heading text-[20px] font-semibold text-navy">{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="mt-3 text-[14.5px] leading-relaxed text-navy/70">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets?.length ? (
                    <ul className="mt-3 space-y-2">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 text-[14.5px] leading-relaxed text-navy/70">
                          <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-electric" aria-hidden="true" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}