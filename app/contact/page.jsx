import PageHero from "@/components/site/PageHero";
import SectionHeading from "@/components/site/SectionHeading";
import ContactDetails from "@/components/contact/ContactDetails";
import ContactForm from "@/components/contact/ContactForm";
import CompanyMap from "@/components/contact/CompanyMap";
import Reveal from "@/components/animation/Reveal";

export const metadata = {
  title: "Contact — RITA Tours N Travels",
  description:
    "Reach the RITA planning desk in Amsterdam by email, phone or WhatsApp. Emergency support for travellers already on the road, plus our studio location.",
  openGraph: {
    title: "Contact RITA Tours N Travels",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <main>
        <PageHero
          eyebrow="Contact"
          title="Talk to the people who plan the trips"
          subtitle="No call centre, no ticket queue. Tell us what you are dreaming of and the planner who would build it replies — usually the same day."
          image="images/contact-banner.jpg"
          imageAlt="Canal houses in Amsterdam at golden hour"
        />

        <section className="section bg-cloud">
          <Reveal className="shell grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Get in touch"
                title="Every channel, one team"
                subtitle="Pick whatever suits you. WhatsApp is fastest during European office hours; the emergency line runs around the clock."
              />
              <div className="mt-8">
                <ContactDetails />
              </div>
            </div>

            <ContactForm />
          </Reveal>
        </section>

        <Reveal>
          <CompanyMap />
        </Reveal>
      </main>
    </>
  );
}
