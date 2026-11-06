import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import { cn } from "@/lib/utils";

export default function FloatingActions() {
  const { settings } = useApp();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whatsappHref = `https://wa.me/${settings.brand.whatsapp}?text=${encodeURIComponent(
    "Hello RITA Tours N Travels, I'd like to ask about planning a trip.",
  )}`;

  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={cn(
          "grid h-11 w-11 place-items-center rounded-full border border-navy/10 bg-white text-navy shadow-[0_14px_30px_-18px_rgba(10,31,68,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:text-electric",
          showTop ? "pointer-events-auto opacity-100" : "pointer-events-none translate-y-2 opacity-0",
        )}
      >
        <ArrowUp className="h-4 w-4" aria-hidden="true" />
      </button>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Chat with RITA on WhatsApp"
        className="group inline-flex items-center gap-2 rounded-full bg-[#25D366] py-3 pl-3 pr-4 text-white shadow-[0_16px_34px_-16px_rgba(37,211,102,0.9)] transition-transform duration-300 hover:-translate-y-0.5"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        <span className="text-[12.5px] font-semibold">WhatsApp</span>
      </a>
    </div>
  );
}