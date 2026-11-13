import { createFileRoute } from "@tanstack/react-router";
import LegalLayout from "@/components/legal/LegalLayout";
import termsContent from "@/data/terms-and-conditions.json";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions — RITA Tours N Travels" },
      {
        name: "description",
        content: "Booking, payment, cancellation and travel terms for journeys planned by RITA Tours N Travels.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalLayout
      title={termsContent.title}
      intro={termsContent.intro}
      updated={termsContent.updated}
      sections={termsContent.sections}
    />
  );
}