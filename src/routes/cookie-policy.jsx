import { createFileRoute } from "@tanstack/react-router";
import PagePlaceholder from "@/components/site/PagePlaceholder";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({ meta: [{ title: "Cookie Policy — RITA Tours N Travels" }] }),
  component: () => (
    <PagePlaceholder
      title="Cookie Policy"
      description="The full cookie notice is being finalised. You can change your cookie preferences at any time from the consent banner."
    />
  ),
});