"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
const FLEX_LABELS = { fixed: "fixed dates", flexible: "flexible dates" };
const STAY_LABELS = {
  boutique: "Boutique hotels",
  guesthouse: "Family-run guesthouses",
  apartment: "Apartments",
  luxury: "Luxury hotels",
  any: "No preference",
};

const emptyForm = {
  destination: "",
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

function buildRecap(data) {
  const when = [
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

export default function TourPlanningPage() {
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
      const styleNames = moods.filter((mood) => data.styles.includes(mood.id)).map((mood) => mood.title);
      const message = [
        `Name: ${data.name.trim()}`,
        `Email: ${data.email.trim()}`,
        `Destination: ${data.destination || "Undecided"}`,
        `Arrival date: ${data.startDate || "Not specified"}`,
        `Departure date: ${data.endDate || "Not specified"}`,
        `Date flexibility: ${FLEX_LABELS[data.flexibility] || data.flexibility}`,
        `Adults: ${data.adults}`,
        `Children: ${data.children}`,
        `Budget per person: €${Number(data.budget).toLocaleString("en-US")}`,
        `Travel pace: ${PACE_LABELS[data.pace] || data.pace}`,
        `Travel style: ${styleNames.length ? styleNames.join(", ") : "Open to suggestions"}`,
        `Preferred stays: ${STAY_LABELS[data.stay] || data.stay}`,
        `Phone or WhatsApp: ${data.phone.trim() || "Not provided"}`,
        `Additional notes: ${data.notes.trim() || "None"}`,
        "Consent to be contacted: Yes",
        `Language: ${language}`,
        `Currency preference: ${currency}`,
      ].join("\n");

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

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name.trim(),
          email: data.email.trim(),
          topic: "Custom itinerary request",
          destination: data.destination,
          message,
          language,
          currency,
          source: "tour-planning",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send planning request email");
      }

      setResult({ reference: created?.id ? created.id.slice(-6).toUpperCase() : null });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>

      <main className="pb-20">
        <PageHero
          eyebrow="Tour planning"
          title="Tell us the trip. We will build the route."
          subtitle="Three short steps: where and when, how you like to travel, then how to reach you. A named planner replies with outline routes and an honest price — no payment, no obligation."
          image="images/tour-planning-banner.jpg"
          imageAlt="Whitewashed Cycladic village above the Aegean at dusk"
        />

        <Reveal className="shell planning-layout">
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
    </>
  );
}
