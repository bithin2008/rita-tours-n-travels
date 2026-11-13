"use client";
import { Button } from "@/components/ui/button";

export function DefaultCatchBoundary({ error, reset }) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 py-24">
      <div className="text-center">
        <p className="text-6xl font-semibold tracking-tight">Error</p>
        <p className="text-muted-foreground">{error?.message ?? "Something went wrong."}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => {
            reset?.();
            window.location.reload();
          }}
          className="inline-flex items-center gap-2 rounded-full border border-navy/15 px-5 py-2.5 text-[13px] font-semibold text-navy transition-colors hover:border-electric hover:text-electric"
        >
          Try again
        </button>
        <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-navy/15 px-5 py-2.5 text-[13px] font-semibold text-navy transition-colors hover:border-electric hover:text-electric">
          Home
        </Link>
      </div>
    </div>
  );
}
