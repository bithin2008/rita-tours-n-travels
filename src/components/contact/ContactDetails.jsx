"use client";
import { Clock, Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone, Siren, Youtube } from "lucide-react";
import { useApp } from "@/lib/AppContext";

const SOCIAL_ICONS = { instagram: Instagram, facebook: Facebook, linkedin: Linkedin, youtube: Youtube };

function InfoRow({ icon: Icon, label, value, href, tone = "electric" }) {
  const Wrapper = href ? "a" : "div";
  return (
    <Wrapper
      {...(href ? { href, target: href.startsWith("http") ? "_blank" : undefined, rel: href.startsWith("http") ? "noreferrer noopener" : undefined } : {})}
      className="group flex items-start gap-3.5 rounded-2xl border border-navy/10 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-electric/35 hover:shadow-[0_20px_40px_-32px_rgba(10,31,68,0.55)]"
    >
      <span
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${tone === "coral" ? "bg-coral/10 text-[#d8431f]" : "bg-electric/10 text-electric"
          }`}
      >
        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-[10.5px] font-semibold uppercase tracking-[0.14em] text-navy/40">{label}</span>
        <span className="mt-1 block truncate text-[13.5px] font-medium text-navy group-hover:text-electric">{value}</span>
      </span>
    </Wrapper>
  );
}

export default function ContactDetails() {
  const { settings } = useApp();
  const { brand, social } = settings;
  const message =
    "Welcome to RITA Tours N Travels!" +
    "Discover new destinations, create beautiful memories, and travel with confidence.";

  const whatsappHref = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        <InfoRow icon={Mail} label="Email" value={brand.email} href={`mailto:${brand.email}`} />
        <InfoRow icon={Phone} label="Planning desk" value={brand.phone} href={`tel:${brand.phone.replace(/\s/g, "")}`} />
      </div>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer noopener"
        className="mt-3 flex items-center justify-between gap-4 rounded-2xl bg-[#0e8f83] p-4 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0b7a70]"
      >
        <span className="flex items-center gap-3.5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15">
            <MessageCircle className="h-[18px] w-[18px]" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/60">WhatsApp</span>
            <span className="mt-1 block text-[13.5px] font-medium">Chat with a planner</span>
          </span>
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/70">Open</span>
      </a>

      <div className="mt-3 rounded-2xl border border-coral/25 bg-coral/[0.06] p-4">
        <div className="flex items-start gap-3.5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-coral/15 text-[#d8431f]">
            <Siren className="h-[18px] w-[18px]" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#b8371a]">
              Traveller emergency line
            </p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-navy/65">
              24/7 while you are on the road, for missed connections, cancellations or anything urgent.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={`tel:${brand.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#d8431f] px-3.5 py-2 text-[11.5px] font-semibold text-white transition-colors hover:bg-[#bf3a1a]"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                Call now
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#d8431f]/30 px-3.5 py-2 text-[11.5px] font-semibold text-[#b8371a] transition-colors hover:bg-white"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-navy/10 bg-white p-4">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-navy/40">Studio</p>
        <p className="mt-2 flex items-start gap-2 text-[13px] leading-relaxed text-navy/70">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-navy/30" aria-hidden="true" />
          {brand.addressLine}
        </p>
        <p className="mt-2.5 flex items-center gap-2 text-[12px] text-navy/50">
          <Clock className="h-3.5 w-3.5 text-navy/30" aria-hidden="true" />
          Mon–Fri, 09:00–18:00 CET · {brand.responseTime}
        </p>
      </div>

      <div className="mt-6">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-navy/40">Follow the journeys</p>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {social.map((item) => {
            const Icon = SOCIAL_ICONS[item.icon] ?? Instagram;
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={item.label}
                className="inline-flex items-center gap-2 rounded-full border border-navy/12 bg-white px-3.5 py-2 text-[12px] font-medium text-navy/65 transition-all duration-300 hover:-translate-y-0.5 hover:border-electric/40 hover:text-electric"
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}