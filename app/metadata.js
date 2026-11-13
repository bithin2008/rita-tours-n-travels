import { getSiteSettings } from "@/lib/data-service";

const settings = getSiteSettings();

export const metadata = {
  title: settings.seo.title,
  description: settings.seo.description,
  keywords: settings.seo.keywords,
  openGraph: {
    title: settings.seo.title,
    description: settings.seo.description,
    type: "website",
  },
};
