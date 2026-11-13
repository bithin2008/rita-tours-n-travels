import LegalLayout from "@/components/legal/LegalLayout";
import termsContent from "@/data/terms-and-conditions.json";

export const metadata = {
  title: "Terms and Conditions — RITA Tours N Travels",
  description:
    "Booking, payment, cancellation and travel terms for journeys planned by RITA Tours N Travels.",
};

export default function TermsPage() {
  return (
    <LegalLayout
      title={termsContent.title}
      intro={termsContent.intro}
      updated={termsContent.updated}
      sections={termsContent.sections}
    />
  );
}
