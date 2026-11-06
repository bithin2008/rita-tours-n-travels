import { useApp } from "@/lib/AppContext";

export default function CompanyMap() {
  const { settings } = useApp();
  const query = encodeURIComponent(settings.brand.addressLine);

  return (
    <section className="bg-white pb-20 sm:pb-24">
      <div className="shell">
        <div className="overflow-hidden rounded-[26px] border border-navy/10 soft-shadow">
          <iframe
            title={`${settings.brand.name} on Google Maps`}
            src={`https://www.google.com/maps?q=${query}&z=15&output=embed`}
            className="h-[320px] w-full border-0 sm:h-[400px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <p className="mt-3 text-[11.5px] text-navy/45">
          {settings.brand.addressLine} — visits by appointment, so we can give you the whole table.
        </p>
      </div>
    </section>
  );
}