import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PageHero from "@/components/site/PageHero";
import PlannerProgress from "@/components/planning/PlannerProgress";
import PlanningAside from "@/components/planning/PlanningAside";
import PlanningSuccess from "@/components/planning/PlanningSuccess";
import StepTripBasics from "@/components/planning/StepTripBasics";
import StepPreferences from "@/components/planning/StepPreferences";
import StepContact from "@/components/planning/StepContact";
import Reveal from "@/components/animation/Reveal";
import { getDestinationOptions, getMoods, getSiteSettings } from "@/lib/data-service";
import { createLead, isValidEmail } from "@/lib/leads";
import { useApp } from "@/lib/AppContext";

const settings = getSiteSettings();
const destinations = getDestinationOptions()
  .filter((option) => option.value !== "anywhere")
  .map((option) => option.value)
  .filter((value, index, list) => list.indexOf(value) === index);
const moods = getMoods();
const STEPS = ["Trip basics", "Style & budget", "Your details"];
const PACE_LABELS = { slow: "Slow — long stays", balanced: "Balanced", full: "Full — see everything" };
const FLEX_LABELS = { fixed: "fixed dates", flexible: "flexible dates", month: "month only" };

const emptyForm = {
  destination: "",
  month: "",
  startDate: "",
  endDate: "",
  flexibility: "flexible",
  adults: 2,
  children: 0,
  pace: "balanced",
  styles: [],
  stay: "boutique",
  budget: 2000,
  notes: "",
  name: "",
  email: "",
  phone: "",
  consent: false,
};

function formatMonth(value) {
  if (!value) return "";
  const date = new Date(`${value}-01T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "UTC" }).format(date);
}

function buildRecap(data) {
  const when = [
    formatMonth(data.month),
    data.startDate ? `${data.startDate}${data.endDate ? ` → ${data.endDate}` : ""}` : "",
    FLEX_LABELS[data.flexibility],
  ]
    .filter(Boolean)
    .join(" · ");

  const styleNames = moods.filter((mood) => data.styles.includes(mood.id)).map((mood) => mood.title);

  return [
    { label: "Destination", value: data.destination || "Undecided" },
    { label: "When", value: when || "Not decided yet" },
    {
      label: "Travellers",
      value: `${data.adults} ${data.adults === 1 ? "adult" : "adults"}${data.children ? `, ${data.children} ${data.children === 1 ? "child" : "children"}` : ""}`,
    },
    { label: "Budget", value: `€${data.budget.toLocaleString("en-US")} per person` },
    { label: "Pace", value: PACE_LABELS[data.pace] },
    { label: "Style", value: styleNames.length ? styleNames.join(", ") : "Open to suggestions" },
  ];
}

export const Route = createFileRoute("/tour-planning")({
  head: () => ({
    meta: [
      { title: "Tour Planning — RITA Tours N Travels" },
      {
        name: "description",
        content:
          "Request a custom European itinerary in three steps: destination and dates, travel style and budget, then your details. A named planner replies within one business day.",
      },
      { property: "og:title", content: "Plan a custom journey — RITA Tours N Travels" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: TourPlanningPage,
});

function TourPlanningPage() {
  const { language, currency } = useApp();
  const [step, setStep] = useState(0);
  const [data, setData] = useState(emptyForm);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);

  const patch = (next) => {
    setData((current) => ({ ...current, ...next }));
    setError("");
  };

  const recap = buildRecap(data);

  const goNext = () => {
    if (step === 0 && !data.destination) {
      setError("Choose a destination — or tell us you are undecided.");
      return;
    }
    setError("");
    setStep((current) => Math.min(STEPS.length - 1, current + 1));
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!data.name.trim() || !isValidEmail(data.email)) {
      setError("Add your name and a valid email address so we can reply.");
      return;
    }
    if (!data.consent) {
      setError("Please tick the consent box so we may contact you about this request.");
      return;
    }

    setError("");
    setStatus("sending");
    try {
      const message = [
        "Custom itinerary request",
        ...recap.map((item) => `${item.label}: ${item.value}`),
        `Preferred stays: ${data.stay}`,
        data.phone ? `Phone: ${data.phone}` : null,
        data.notes ? `Notes: ${data.notes}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      const created = await createLead({
        type: "enquiry",
        name: data.name.trim(),
        email: data.email.trim(),
        message,
        tour_id: null,
        tour_title: "Custom itinerary request",
        language,
        currency,
        consent: true,
        source: "tour-planning",
      });

      setResult({ reference: created?.id ? created.id.slice(-6).toUpperCase() : null });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <SiteHeader />
      <main className="pb-20">
        <PageHero
          eyebrow="Tour planning"
          title="Tell us the trip. We will build the route."
          subtitle="Three short steps: where and when, how you like to travel, then how to reach you. A named planner replies with outline routes and an honest price — no payment, no obligation."
          image="https://media.base44.com/images/public/6aec6c41ac98455faf00216e/32951fe5c_generated_b6ccbf3c.png"
          imageAlt="Whitewashed Cycladic village above the Aegean at dusk"
        />

        <Reveal className="shell grid gap-8 pt-8 lg:grid-cols-[minmax(0,1fr)_310px] lg:items-start lg:pt-10">
          <div className="relative overflow-hidden rounded-[30px] border border-navy/10 bg-white p-6 shadow-[0_40px_80px_-70px_rgba(10,31,68,0.85)] sm:p-8">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-electric via-mint to-sunshine"
            />
            {status === "success" ? (
              <PlanningSuccess
                recap={recap}
                reference={result?.reference}
                contact={{ email: settings.brand.email, responseTime: settings.brand.responseTime }}
              />
            ) : (
              <>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-electric/10 px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-electric">
                    Step {step + 1} of {STEPS.length}
                  </span>
                  <span className="text-[11.5px] font-medium text-navy/40">Takes about two minutes</span>
                </div>

                <div className="mt-5">
                  <PlannerProgress steps={STEPS} current={step} onStepClick={setStep} />
                </div>

                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-navy/10" aria-hidden="true">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-electric to-mint transition-[width] duration-500 ease-out"
                    style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                  />
                </div>

                <div key={step} className="animate-enter mt-8 border-t border-navy/10 pt-7">
                  {step === 0 ? (
                    <StepTripBasics data={data} destinations={destinations} onChange={patch} error={error} />
                  ) : null}
                  {step === 1 ? <StepPreferences data={data} moods={moods} onChange={patch} /> : null}
                  {step === 2 ? (
                    <StepContact
                      data={data}
                      onChange={patch}
                      recap={recap}
                      error={error}
                      status={status}
                      onSubmit={submit}
                      onBack={() => setStep(1)}
                    />
                  ) : null}
                </div>

                {step < 2 ? (
                  <div className="mt-7 flex items-center justify-between gap-3 border-t border-navy/10 pt-6">
                    <button
                      type="button"
                      onClick={() => setStep((current) => Math.max(0, current - 1))}
                      disabled={step === 0}
                      className="inline-flex h-11 items-center gap-1.5 rounded-full border border-navy/15 px-5 text-[13px] font-semibold text-navy transition-colors hover:border-navy/35 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      className="group inline-flex h-11 items-center gap-2 rounded-full bg-electric px-6 text-[13px] font-semibold text-white shadow-[0_16px_30px_-16px_rgba(30,107,255,0.9)] transition-colors hover:bg-[#1560f0]"
                    >
                      Continue
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </button>
                  </div>
                ) : null}
              </>
            )}
          </div>

          <PlanningAside brand={settings.brand} />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}