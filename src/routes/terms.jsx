import { createFileRoute } from "@tanstack/react-router";
import PagePlaceholder from "@/components/site/PagePlaceholder";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms and Conditions — RITA Tours N Travels" }] }),
  component: () => (
    <PagePlaceholder
      title="Terms and Conditions"
      description="Booking terms, cancellation conditions and travel insurance requirements are being finalised with legal review."
    />
  ),
});