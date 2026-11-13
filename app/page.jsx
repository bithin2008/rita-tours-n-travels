"use client";
import CompassLoader from "@/components/site/CompassLoader";
import FloatingActions from "@/components/site/FloatingActions";
import CookieConsent from "@/components/site/CookieConsent";
import Hero from "@/components/home/Hero";
import FeaturedTours from "@/components/home/FeaturedTours";
import Comparison from "@/components/home/Comparison";
import DestinationExplorer from "@/components/home/DestinationExplorer";
import MoodSelector from "@/components/home/MoodSelector";
import UgcVideos from "@/components/home/UgcVideos";
import PhotoStories from "@/components/home/PhotoStories";
import WhyRita from "@/components/home/WhyRita";
import Sustainability from "@/components/home/Sustainability";
import Gallery from "@/components/home/Gallery";
import Newsletter from "@/components/home/Newsletter";
import FinalCta from "@/components/home/FinalCta";
import TourDialog from "@/components/home/TourDialog";
import Reveal from "@/components/animation/Reveal";
import { getSiteSettings } from "@/lib/data-service";
import { useCallback, useState } from "react";

const settings = getSiteSettings();

function scrollToExperiences() {
  window.setTimeout(() => {
    document.getElementById("experiences")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 80);
}

export default function HomePage() {
  const [filters, setFilters] = useState(null);
  const [dialog, setDialog] = useState({ tourId: null, open: false });

  const openTour = useCallback((tourId) => setDialog({ tourId, open: true }), []);

  const handleSearch = (next) => {
    setFilters(next);
    scrollToExperiences();
  };

  const handleMoodDiscovery = (moodId) => {
    setFilters({ mood: moodId });
    scrollToExperiences();
  };

  return (
    <>
      <CompassLoader />
      <main>
        <Hero onSearch={handleSearch} onOpenTour={openTour} />
        <Reveal>
          <FeaturedTours filters={filters} onClear={() => setFilters(null)} onOpen={openTour} />
        </Reveal>
        <Reveal>
          <Comparison />
        </Reveal>
        <Reveal>
          <DestinationExplorer onOpenTour={openTour} />
        </Reveal>
        <Reveal>
          <MoodSelector onDiscover={handleMoodDiscovery} onOpenTour={openTour} />
        </Reveal>
        <Reveal>
          <UgcVideos />
        </Reveal>
        <Reveal>
          <PhotoStories />
        </Reveal>
        <Reveal>
          <WhyRita />
        </Reveal>
        <Reveal>
          <Sustainability />
        </Reveal>
        <Reveal>
          <Gallery />
        </Reveal>
        <Reveal>
          <Newsletter />
        </Reveal>
        <Reveal>
          <FinalCta />
        </Reveal>
      </main>
      <TourDialog
        tourId={dialog.tourId}
        open={dialog.open}
        onOpenChange={(open) => setDialog((current) => ({ ...current, open }))}
      />
      <FloatingActions />
      <CookieConsent />
    </>
  );
}
