import LegalLayout from "@/components/legal/LegalLayout";
import privacyContent from "@/data/privacy-policy.json";

export const metadata = {
  title: "Privacy Policy — RITA Tours N Travels",
  description:
    "How RITA Tours N Travels collects, uses and protects your personal data under the GDPR, and the rights you have over it.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title={privacyContent.title}
      intro={privacyContent.intro}
      updated={privacyContent.updated}
      sections={privacyContent.sections}
    />
  );
}
