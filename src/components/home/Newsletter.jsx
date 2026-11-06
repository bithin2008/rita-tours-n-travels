import { useState } from "react";
import { ArrowRight, Check, Loader2, Mail } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { createLead, isValidEmail } from "@/lib/leads";
import { useApp } from "@/lib/AppContext";
import { cn } from "@/lib/utils";

export default function Newsletter() {
  const { t, language, currency } = useApp();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("idle");

  const submit = async (event) => {
    event.preventDefault();
    if (!isValidEmail(email) || !consent) {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    try {
      await createLead({
        type: "newsletter",
        email: email.trim(),
        consent: true,
        language,
        currency,
        source: "homepage-newsletter",
      });
      setStatus("success");
      setEmail("");
      setConsent(false);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="newsletter" className="section scroll-mt-24 bg-cloud">
      <div className="shell">
        <div className="overflow-hidden rounded-[26px] bg-navy px-6 py-12 sm:px-12 sm:py-14">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div>
              <span className="eyebrow text-mint">
                <span className="h-[1px] w-6 bg-mint/70" aria-hidden="true" />
                10 — Newsletter
              </span>
              <h2 className="mt-4 max-w-lg font-heading text-3xl font-semibold leading-[1.15] text-white sm:text-[38px]">
                {t("section.newsletter")}
              </h2>
              <p className="mt-3 max-w-md text-[14.5px] leading-relaxed text-white/65">{t("section.newsletterSub")}</p>
            </div>

            <div>
              {status === "success" ? (
                <div className="rounded-2xl border border-mint/40 bg-mint/10 p-6">
                  <p className="flex items-center gap-2 text-[14px] font-semibold text-mint">
                    <Check className="h-4 w-4" aria-hidden="true" />
                    {t("newsletter.success")}
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="space-y-4">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" aria-hidden="true" />
                      <label htmlFor="newsletter-email" className="sr-only">Email</label>
                      <input
                        id="newsletter-email"
                        type="email"
                        value={email}
                        onChange={(event) => { setEmail(event.target.value); if (status !== "sending") setStatus("idle"); }}
                        placeholder={t("newsletter.emailPlaceholder")}
                        className="h-12 w-full rounded-xl border border-white/20 bg-white/5 pl-11 pr-4 text-[14px] text-white placeholder:text-white/35 focus:border-mint focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-mint px-6 text-[13.5px] font-semibold text-navy transition-colors hover:bg-[#14b0a0] disabled:opacity-70"
                    >
                      {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
                      {t("newsletter.button")}
                      {status !== "sending" ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : null}
                    </button>
                  </div>

                  <label htmlFor="newsletter-consent" className="flex cursor-pointer items-start gap-2.5">
                    <Checkbox
                      id="newsletter-consent"
                      checked={consent}
                      onCheckedChange={(value) => { setConsent(Boolean(value)); if (status === "invalid") setStatus("idle"); }}
                      className={cn("mt-0.5 border-white/40 data-[state=checked]:border-mint data-[state=checked]:bg-mint data-[state=checked]:text-navy")}
                    />
                    <span className="text-[12px] leading-relaxed text-white/60">{t("newsletter.consent")}</span>
                  </label>

                  {status === "invalid" ? (
                    <p className="text-[12px] font-medium text-coral">{t("newsletter.invalid")}</p>
                  ) : null}
                  {status === "error" ? (
                    <p className="text-[12px] font-medium text-coral">
                      We could not save your signup just now. Please try again in a moment.
                    </p>
                  ) : null}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}