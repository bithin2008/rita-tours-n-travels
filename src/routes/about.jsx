import { createFileRoute } from "@tanstack/react-router";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PageHero from "@/components/site/PageHero";
import CompanyStory from "@/components/about/CompanyStory";
import HeritageTimeline from "@/components/about/HeritageTimeline";
import TeamSection from "@/components/about/TeamSection";
import SustainabilityCommitment from "@/components/about/SustainabilityCommitment";
import FinalCta from "@/components/home/FinalCta";
import Reveal from "@/components/animation/Reveal";
import { getAboutContent, getSiteSettings } from "@/lib/data-service";

const about = getAboutContent();
const settings = getSiteSettings();

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — RITA Tours N Travels" },
      {
        name: "description",
        content:
          "The RITA story: an Amsterdam-based European travel studio, the people who plan your journey, and our sustainability commitments.",
      },
      { property: "og:title", content: "About RITA Tours N Travels" },
      { property: "og:description", content: settings.brand.description },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow={about.hero.eyebrow}
          title={about.hero.title}
          subtitle={about.hero.subtitle}
          image={about.hero.image}
          imageAlt={about.hero.imageAlt}
        >
          <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
            {about.hero.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-heading text-[26px] font-semibold tracking-[-0.02em] text-white sm:text-[30px]">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/45">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </PageHero>

        <Reveal>
          <CompanyStory story={about.story} />
        </Reveal>
        <Reveal>
          <HeritageTimeline heritage={about.heritage} />
        </Reveal>
        <Reveal>
          <TeamSection team={about.team} />
        </Reveal>
        <Reveal>
          <SustainabilityCommitment sustainability={about.sustainability} />
        </Reveal>
        <Reveal>
          <FinalCta />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}