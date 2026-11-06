import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useApp } from "@/lib/AppContext";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "rita-cookie-consent";

export default function CookieConsent() {
  const { t } = useApp();
  const [open, setOpen] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [optional, setOptional] = useState({ analytics: false, marketing: false });

  useEffect(() => {
    try {
      const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null");
      if (stored) {
        setOptional({ analytics: Boolean(stored.analytics), marketing: Boolean(stored.marketing) });
      } else {
        setOpen(true);
      }
    } catch {
      setOpen(true);
    }
  }, []);

  const save = (choice) => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ necessary: true, analytics: choice.analytics, marketing: choice.marketing, date: new Date().toISOString() }),
    );
    setOptional(choice);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label={t("cookie.title")}
      className="fixed inset-x-3 bottom-3 z-[80] rounded-[22px] border border-navy/10 bg-white p-5 shadow-[0_30px_60px_-30px_rgba(10,31,68,0.55)] sm:inset-x-auto sm:left-6 sm:bottom-6 sm:max-w-md"
    >
      <div className="flex items-start gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-electric/10 text-electric">
          <Cookie className="h-4 w-4" aria-hidden="true" />
        </span>
        <div>
          <p className="font-heading text-[14.5px] font-semibold text-navy">{t("cookie.title")}</p>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-navy/60">{t("cookie.body")}</p>
        </div>
      </div>

      {customizing ? (
        <div className="mt-4 space-y-3 rounded-xl bg-cloud px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[12.5px] font-semibold text-navy">{t("cookie.necessary")}</p>
              <p className="text-[11px] text-navy/50">Always on — the site cannot run without them.</p>
            </div>
            <Switch checked disabled aria-label={t("cookie.necessary")} className="data-[state=checked]:bg-navy/30" />
          </div>
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="consent-analytics" className="text-[12.5px] font-semibold text-navy">
              {t("cookie.analytics")}
            </label>
            <Switch
              id="consent-analytics"
              checked={optional.analytics}
              onCheckedChange={(value) => setOptional((current) => ({ ...current, analytics: value }))}
              className="data-[state=checked]:bg-mint"
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="consent-marketing" className="text-[12.5px] font-semibold text-navy">
              {t("cookie.marketing")}
            </label>
            <Switch
              id="consent-marketing"
              checked={optional.marketing}
              onCheckedChange={(value) => setOptional((current) => ({ ...current, marketing: value }))}
              className="data-[state=checked]:bg-mint"
            />
          </div>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => save({ analytics: true, marketing: true })}
          className="rounded-full bg-electric px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-[#1560f0]"
        >
          {t("cookie.accept")}
        </button>
        <button
          type="button"
          onClick={() => save({ analytics: false, marketing: false })}
          className="rounded-full border border-navy/15 px-4 py-2 text-[12px] font-semibold text-navy transition-colors hover:border-navy/40"
        >
          {t("cookie.reject")}
        </button>
        {customizing ? (
          <button
            type="button"
            onClick={() => save(optional)}
            className="rounded-full px-4 py-2 text-[12px] font-semibold text-electric transition-colors hover:bg-electric/10"
          >
            {t("cookie.save")}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setCustomizing(true)}
            className={cn("rounded-full px-4 py-2 text-[12px] font-semibold text-navy/60 transition-colors hover:text-electric")}
          >
            {t("cookie.customize")}
          </button>
        )}
      </div>
    </div>
  );
}