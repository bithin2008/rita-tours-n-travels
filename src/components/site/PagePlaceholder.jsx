import { Link } from "@tanstack/react-router";
import { ArrowLeft, MapPinned } from "lucide-react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

export default function PagePlaceholder({ title, description }) {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[70vh] bg-cloud pt-36 pb-20">
        <div className="shell">
          <div className="mx-auto max-w-xl rounded-[26px] border border-navy/10 bg-white px-7 py-14 text-center soft-shadow">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-electric/10 text-electric">
              <MapPinned className="h-5 w-5" aria-hidden="true" />
            </span>
            <h1 className="mt-5 font-heading text-3xl font-semibold text-navy">{title}</h1>
            <p className="mt-3 text-[14.5px] leading-relaxed text-navy/60">
              {description ?? "This page is on its way. The homepage holds everything available today — journeys, destinations and planning."}
            </p>
            <Link
              to="/"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-electric px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#1560f0]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to homepage
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}