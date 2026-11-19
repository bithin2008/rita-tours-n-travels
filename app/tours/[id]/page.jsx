import { notFound } from "next/navigation";
import { getTourById } from "@/lib/data-service";
import TourDetail from "@/components/tours/TourDetail";

export const generateMetadata = async ({ params }) => {
  const routeParams = await params;
  const tour = getTourById(routeParams.id);
  if (!tour) return { title: "Tour Not Found" };
  return {
    title: `${tour.title} — RITA Tours N Travels`,
    description: tour.summary,
    openGraph: {
      title: tour.title,
      description: tour.summary,
      type: "website",
      images: [{ url: tour.heroImage || tour.image }],
    },
  };
};

export default async function TourDetailsPage({ params }) {
  const routeParams = await params;
  const tour = getTourById(routeParams.id);
  if (!tour) notFound();

  return <TourDetail tour={tour} />;
}
