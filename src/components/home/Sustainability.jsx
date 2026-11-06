import { useState } from "react";
import { Info, Leaf, TrainFront, TreePine } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import SectionHeading from "@/components/site/SectionHeading";
import { formatPrice, getTourList } from "@/lib/data-service";
import { useApp } from "@/lib/AppContext";

export default function Sustainability() {
  const { t, settings, currency } = useApp();
  const tours = getTourList();
  const [tourId, setTourId] = useState(tours[0].id);
  const [contribution, setContribution] = useState(false);
  const tour = tours.find((item) => item.id === tourId) ?? tours[0];
  const max = Math.max(...tours.map((item) => item.carbonKgEstimate));
  const percent = Math.round((tour.carbonKgEstimate / max) * 100);
  const contributionLabel = formatPrice(settings.sustainability.contributionEur, currency);

  return (
    <section id="sustainability" className="section scroll-mt-24 bg-cloud">
      <div className="shell">
        <div className="overflow-hidden rounded-[26px] border border-mint/30 bg-white">
          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="08 — Sustainable travel"
                title={t("section.sustainable")}
                subtitle={t("section.sustainableSub")}
              />
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-mint/15 px-3 py-1.5 text-[12px] font-semibold text-[#0d7a70]">
                  <TrainFront className="h-3.5 w-3.5" aria-hidden="true" /> Rail-first routing
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-mint/15 px-3 py-1.5 text-[12px] font-semibold text-[#0d7a70]">
                  <TreePine className="h-3.5 w-3.5" aria-hidden="true" /> Local conservation partners
                </span>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-[20px] border border-navy/10 bg-cloud/70 p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <label htmlFor="carbon-tour" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/50">
                    Estimated footprint · per traveller
                  </label>
                  <select
                    id="carbon-tour"
                    value={tourId}
                    onChange={(event) => setTourId(event.target.value)}
                    className="h-9 rounded-full border border-navy/15 bg-white px-3 text-[12.5px] font-medium text-navy outline-none focus:border-electric"
                  >
                    {tours.map((item) => (
                      <option key={item.id} value={item.id}>{item.title}</option>
                    ))}
                  </select>
                </div>

                <p className="mt-4 flex items-baseline gap-2">
                  <span className="font-heading text-[38px] font-semibold leading-none text-navy">
                    ~{tour.carbonKgEstimate}
                  </span>
                  <span className="text-[13px] font-medium text-navy/55">kg CO₂e estimate</span>
                </p>

                <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-navy/10" role="img" aria-label={`Estimated ${tour.carbonKgEstimate} kilograms of CO2e, about ${percent} percent of our highest-footprint journey`}>
                  <div className="h-full rounded-full bg-mint transition-all duration-700" style={{ width: `${percent}%` }} />
                </div>
                <p className="mt-2 text-[11.5px] text-navy/50">
                  {percent}% of the highest-footprint journey we currently plan.
                </p>

                <div className="mt-5 flex items-start gap-2 rounded-xl bg-white px-3.5 py-3">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-navy/35" aria-hidden="true" />
                  <p className="text-[11.5px] leading-relaxed text-navy/55">{settings.sustainability.note}</p>
                </div>

                <div className="mt-5 flex items-start justify-between gap-4 rounded-xl border border-mint/30 bg-white p-3.5">
                  <div>
                    <label htmlFor="green-contribution" className="flex items-center gap-1.5 text-[13px] font-semibold text-navy">
                      <Leaf className="h-3.5 w-3.5 text-mint" aria-hidden="true" />
                      Add a green contribution · {contributionLabel} per traveller
                    </label>
                    <p className="mt-1 max-w-md text-[11.5px] leading-relaxed text-navy/55">
                      {settings.sustainability.greenContributionNote}
                    </p>
                    {contribution ? (
                      <p className="mt-2 text-[11.5px] font-semibold text-[#0d7a70]">
                        Noted for your quote — it is optional and you can remove it at any time.
                      </p>
                    ) : null}
                  </div>
                  <Switch
                    id="green-contribution"
                    checked={contribution}
                    onCheckedChange={setContribution}
                    className="shrink-0 data-[state=checked]:bg-mint"
                    aria-label="Add optional green contribution"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}