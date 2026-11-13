import { createFileRoute } from "@tanstack/react-router";
import LegalLayout from "@/components/legal/LegalLayout";
import privacyContent from "@/data/privacy-policy.json";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — RITA Tours N Travels" },
      {
        name: "description",
        content: "How RITA Tours N Travels collects, uses and protects your personal data under the GDPR, and the rights you have over it.",
      },
    ],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title={privacyContent.title}
      intro={privacyContent.intro}
      updated={privacyContent.updated}
      sections={privacyContent.sections}
    />
  );
}