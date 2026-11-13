"use client";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import Logo from "@/components/site/Logo";
import { useApp } from "@/lib/AppContext";

const socialIcons = { instagram: Instagram, facebook: Facebook, youtube: Youtube, linkedin: Linkedin };

export default function SiteFooter() {
  const { settings, t } = useApp();
  const { brand, navigation, legalLinks, social } = settings;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <div className="shell grid gap-12 py-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Logo light />
          <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-white/60">{brand.description}</p>
          <div className="mt-6 space-y-2.5 text-[13px] text-white/70">
            <a href={`mailto:${brand.email}`} className="flex items-center gap-2.5 transition-colors hover:text-white">
              <Mail className="h-4 w-4 text-mint" aria-hidden="true" />
              {brand.email}
            </a>
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="flex items-center gap-2.5 transition-colors hover:text-white">
              <Phone className="h-4 w-4 text-mint" aria-hidden="true" />
              {brand.phone}
            </a>
            <p className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 text-mint" aria-hidden="true" />
              {brand.addressLine}
            </p>
          </div>
        </div>

        <div className="lg:col-span-3">
          <h3 className="font-heading text-[13px] font-semibold uppercase tracking-[0.18em] text-white/45">
            {t("footer.quickLinks")}
          </h3>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 lg:grid-cols-1">
            {navigation.filter((item) => item.to !== "/").map((item) => (
              <li key={item.to}>
                <Link href={item.to} className="text-[13.5px] text-white/70 transition-colors hover:text-white">
                  {t(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="font-heading text-[13px] font-semibold uppercase tracking-[0.18em] text-white/45">
            {t("footer.legal")}
          </h3>
          <ul className="mt-5 space-y-2.5">
            {legalLinks.map((item) => (
              <li key={item.to}>
                <Link href={item.to} className="text-[13.5px] text-white/70 transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href="#newsletter" className="text-[13.5px] text-white/70 transition-colors hover:text-white">
                {t("footer.stayInTouch")}
              </a>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="font-heading text-[13px] font-semibold uppercase tracking-[0.18em] text-white/45">
            {t("footer.follow")}
          </h3>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {social.map((item) => {
              const Icon = socialIcons[item.icon] ?? Instagram;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={item.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-mint hover:text-mint"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              );
            })}
          </div>
          <p className="mt-5 text-[12px] leading-relaxed text-white/40">{brand.responseTime}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-2 py-5 text-[12px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {brand.name}. {t("footer.rights")}</p>
          <p>{settings.currencyNote}</p>
        </div>
      </div>
    </footer>
  );
}
