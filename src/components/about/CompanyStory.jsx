import { Image } from "@/components/ui/image";
import SectionHeading from "@/components/site/SectionHeading";

export default function CompanyStory({ story }) {
  return (
    <section id="story" className="section scroll-mt-24 bg-white">
      <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <div className="overflow-hidden rounded-[26px] bg-navy">
            <Image
              src={story.image}
              alt={story.imageAlt}
              className="aspect-[4/5] w-full object-cover"
              loading="lazy"
            />
          </div>
          {/* <p className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/92 px-4 py-3 text-[12px] leading-relaxed text-navy/70 backdrop-blur-sm sm:inset-x-6 sm:bottom-6">
            {story.imageCaption}
          </p> */}
        </div>

        <div>
          <SectionHeading eyebrow={story.eyebrow} title={story.title} />

          <div className="mt-6 space-y-4">
            {story.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="text-[15px] leading-[1.75] text-navy/70">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-3 border-t border-navy/10 pt-6">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-navy font-heading text-[13px] font-semibold text-white">
              JC
            </span>
            <div>
              <p className="font-heading text-[14px] font-semibold text-navy">{story.signature}</p>
              <p className="text-[12px] text-navy/50">{story.signatureNote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}