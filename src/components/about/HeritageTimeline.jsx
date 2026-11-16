import SectionHeading from "@/components/site/SectionHeading";

export default function HeritageTimeline({ heritage }) {
  return (
    <section id="heritage" className="section scroll-mt-24 bg-cloud">
      <div className="shell">
        <SectionHeading eyebrow={heritage.eyebrow} title={heritage.title} subtitle={heritage.subtitle} />

        <ol className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
          {heritage.items.map((item) => (
            <li key={item.year} className="relative border-l border-navy/15 pl-5 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-6">
              <span
                aria-hidden="true"
                className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-electric lg:-top-[5px] lg:left-0"
              />
              <p className="font-heading text-[19px] font-semibold tracking-[-0.01em] text-navy">{item.year}</p>
              <h3 className="mt-1.5 font-heading text-[14.5px] font-semibold leading-snug text-navy">{item.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-navy/60">{item.body}</p>
            </li>
          ))}
        </ol>

        {/* <p className="mt-10 max-w-3xl rounded-2xl border border-navy/10 bg-white px-5 py-4 text-[12.5px] leading-relaxed text-navy/55">
          {heritage.note}
        </p> */}
      </div>
    </section>
  );
}