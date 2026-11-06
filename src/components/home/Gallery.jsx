import { Instagram } from "lucide-react";
import { Image } from "@/components/ui/image";
import SectionHeading from "@/components/site/SectionHeading";
import { getGallery, getSiteSettings } from "@/lib/data-service";
import { useApp } from "@/lib/AppContext";

export default function Gallery() {
  const { t } = useApp();
  const items = getGallery();
  const instagram = getSiteSettings().social.find((item) => item.icon === "instagram");

  return (
    <section id="gallery" className="section scroll-mt-24 bg-white">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="09 — Gallery" title={t("section.gallery")} subtitle={t("section.gallerySub")} />
          {instagram ? (
            <a
              href={instagram.href}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex w-fit items-center gap-2 rounded-full border border-navy/15 px-5 py-2.5 text-[13px] font-semibold text-navy transition-colors hover:border-electric hover:text-electric"
            >
              <Instagram className="h-4 w-4" aria-hidden="true" />
              Follow on Instagram
            </a>
          ) : null}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((item, index) => (
            <a
              key={item.id}
              href={instagram?.href ?? "#gallery"}
              target="_blank"
              rel="noreferrer noopener"
              className="group relative aspect-square overflow-hidden rounded-[16px] bg-navy"
              style={{ marginTop: index % 2 === 1 ? "1.25rem" : undefined }}
            >
              <Image
                src={item.image}
                alt={item.caption}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-navy/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <span className="absolute inset-0 flex items-end p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-[11.5px] font-medium leading-snug text-white">{item.caption}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}