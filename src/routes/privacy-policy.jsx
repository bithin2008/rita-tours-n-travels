import { createFileRoute } from "@tanstack/react-router";
import PagePlaceholder from "@/components/site/PagePlaceholder";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({ meta: [{ title: "Privacy Policy — RITA Tours N Travels" }] }),
  component: () => (
    <PagePlaceholder
      title="Privacy Policy"
      description="Our full privacy notice is being finalised with legal review."
    />
  ),
});