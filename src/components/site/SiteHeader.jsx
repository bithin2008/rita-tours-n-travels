import { useEffect, useLayoutEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Logo from "@/components/site/Logo";
import { useApp } from "@/lib/AppContext";
import { cn } from "@/lib/utils";

// Runs before paint on the client, plain effect on the server.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function isPathActive(pathname, to) {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}

function SelectPill({ id, label, value, onChange, options, light }) {
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">{label}</label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "h-9 w-full cursor-pointer appearance-none rounded-full border bg-transparent pl-3 pr-8 text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors",
          light
            ? "border-white/25 text-white hover:border-white/50"
            : "border-navy/15 text-navy hover:border-electric/50",
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-navy">
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className={cn("pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2", light ? "text-white/70" : "text-navy/50")}
        aria-hidden="true"
      />
    </div>
  );
}

export default function SiteHeader() {
  const { settings, language, setLanguage, currency, setCurrency, t } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Re-sync before paint on navigation — the page has already been scrolled to the top.
  useIsomorphicLayoutEffect(() => {
    setScrolled(window.scrollY > 60);
  }, [pathname]);

  const overHero = pathname === "/" && !scrolled;
  const solid = !overHero;

  const scrollToPlanner = () => {
    setOpen(false);
    if (pathname !== "/") {
      navigate({ to: "/" });
      window.setTimeout(() => {
        document.getElementById("search-panel")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 350);
      return;
    }
    document.getElementById("search-panel")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const languageOptions = settings.languages.map((item) => ({ value: item.code, label: item.short }));
  const currencyOptions = settings.currencies.map((item) => ({ value: item.code, label: item.code }));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid
          ? "border-b border-navy/10 bg-white/95 py-2 shadow-[0_10px_30px_-24px_rgba(10,31,68,0.5)] backdrop-blur-md"
          : "border-b border-transparent bg-gradient-to-b from-navy/55 to-transparent py-4",
      )}
    >
      <div className="shell flex items-center justify-between gap-6">
        <Logo light={overHero} />

        <nav aria-label="Main navigation" className="hidden items-center gap-6 xl:flex">
          {settings.navigation.map((item) => {
            const active = isPathActive(pathname, item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative whitespace-nowrap py-1 text-[13.5px] transition-colors duration-300",
                  active ? "font-semibold" : "font-medium",
                  overHero
                    ? active
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                    : active
                      ? "text-electric"
                      : "text-navy/70 hover:text-electric",
                  "after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:rounded-full after:transition-all after:duration-300",
                  overHero ? "after:bg-white" : "after:bg-electric",
                  active ? "after:w-full" : "after:w-0 hover:after:w-full",
                )}
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 lg:flex">
            <div className="w-[74px]">
              <SelectPill
                id="language-select"
                label="Language"
                value={language}
                onChange={setLanguage}
                options={languageOptions}
                light={overHero}
              />
            </div>
            <div className="w-[80px]">
              <SelectPill
                id="currency-select"
                label="Currency"
                value={currency}
                onChange={setCurrency}
                options={currencyOptions}
                light={overHero}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToPlanner}
            className="hidden h-10 items-center rounded-full bg-electric px-5 text-[13px] font-semibold text-white shadow-[0_10px_26px_-12px_rgba(30,107,255,0.85)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1560f0] sm:inline-flex"
          >
            {t("action.planTrip")}
          </button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-full border transition-colors xl:hidden",
                  overHero ? "border-white/30 text-white" : "border-navy/15 text-navy",
                )}
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-sm border-l border-navy/10 bg-white p-0">
              <SheetHeader className="border-b border-navy/10 px-6 py-5 text-left">
                <SheetTitle className="font-heading text-base font-semibold text-navy">
                  {settings.brand.name}
                </SheetTitle>
              </SheetHeader>
              <div className="flex h-[calc(100%-84px)] flex-col overflow-y-auto px-6 py-6">
                <nav aria-label="Mobile navigation" className="flex flex-col">
                  {settings.navigation.map((item) => {
                    const active = isPathActive(pathname, item.to);
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between border-b border-navy/[0.07] py-3.5 font-heading text-[17px] transition-colors hover:text-electric",
                          active ? "font-semibold text-electric" : "font-medium text-navy",
                        )}
                      >
                        {t(item.labelKey)}
                        {active ? <span className="h-1.5 w-1.5 rounded-full bg-electric" aria-hidden="true" /> : null}
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <SelectPill
                    id="mobile-language"
                    label="Language"
                    value={language}
                    onChange={setLanguage}
                    options={languageOptions}
                    light={false}
                  />
                  <SelectPill
                    id="mobile-currency"
                    label="Currency"
                    value={currency}
                    onChange={setCurrency}
                    options={currencyOptions}
                    light={false}
                  />
                </div>

                <button
                  type="button"
                  onClick={scrollToPlanner}
                  className="mt-5 inline-flex h-12 items-center justify-center rounded-full bg-electric text-sm font-semibold text-white"
                >
                  {t("action.planTrip")}
                </button>
                <p className="mt-6 text-xs leading-relaxed text-navy/50">{settings.currencyNote}</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}