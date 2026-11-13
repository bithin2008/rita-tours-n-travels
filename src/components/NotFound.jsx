"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound({ children }) {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 py-24 text-center">
      <p className="text-6xl font-semibold tracking-tight">404</p>
      <p className="text-muted-foreground">{children ?? "The page you are looking for does not exist."}</p>
      <div className="flex gap-2">
        <button onClick={() => window.history.back()} className="inline-flex items-center gap-2 rounded-full border border-navy/15 px-5 py-2.5 text-[13px] font-semibold text-navy transition-colors hover:border-electric hover:text-electric">
          Go back
        </button>
        <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-navy/15 px-5 py-2.5 text-[13px] font-semibold text-navy transition-colors hover:border-electric hover:text-electric">
          Start over
        </Link>
      </div>
    </div>
  );
}
