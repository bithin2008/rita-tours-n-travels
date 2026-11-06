/**
 * Shared data service layer.
 * Every component reads content through this module, so the JSON files behind it
 * can later be swapped for a REST API without touching the UI.
 */
import siteSettings from "@/data/site-settings.json";
import toursData from "@/data/featured-tours.json";
import destinationsData from "@/data/destinations.json";
import moodsData from "@/data/travel-moods.json";
import comparisonsData from "@/data/comparisons.json";
import storiesData from "@/data/photo-stories.json";
import videosData from "@/data/ugc-videos.json";
import galleryData from "@/data/instagram-gallery.json";
import aboutData from "@/data/about.json";
import testimonialsData from "@/data/testimonials.json";
import translations from "@/data/translations.json";

export const getSiteSettings = () => siteSettings;

export const getAboutContent = () => aboutData;

export const getTourList = () => toursData.items;

export const getTourById = (id) => toursData.items.find((tour) => tour.id === id) ?? null;

export const getTourTitles = (ids = []) =>
  ids.map((id) => getTourById(id)).filter(Boolean);

export const getDestinations = () => destinationsData.items;

export const getMoods = () => moodsData.items;

export const getComparisons = () => comparisonsData.items;

export const getPhotoStories = () => ({ items: storiesData.items, note: storiesData.note });

export const getUgcVideos = () => ({ items: videosData.items, note: videosData.note });

export const getGallery = () => galleryData.items;

export const getTestimonials = () => testimonialsData;

export const getCurrency = (code) =>
  siteSettings.currencies.find((currency) => currency.code === code) ?? siteSettings.currencies[0];

export function convertPrice(amountEur, currencyCode) {
  const currency = getCurrency(currencyCode);
  return Math.round((amountEur * currency.rate) / 10) * 10;
}

export function formatPrice(amountEur, currencyCode) {
  const currency = getCurrency(currencyCode);
  const value = convertPrice(amountEur, currencyCode);
  return `${currency.symbol}${value.toLocaleString("en-US")}`;
}

export function translate(language, key) {
  return translations[language]?.[key] ?? translations.en[key] ?? key;
}

/** Months touched by a date range, so tours can be matched against their season. */
function monthsBetween(start, end) {
  if (!start) return null;
  const from = new Date(start);
  const to = end ? new Date(end) : new Date(start);
  if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) return null;
  const months = new Set();
  const cursor = new Date(from.getFullYear(), from.getMonth(), 1);
  const last = new Date(to.getFullYear(), to.getMonth(), 1);
  if (cursor > last) return null;
  while (cursor <= last && months.size < 24) {
    months.add(cursor.getMonth() + 1);
    cursor.setMonth(cursor.getMonth() + 1);
  }
  return months;
}

export function matchesDestination(tour, destination) {
  if (!destination || destination === "anywhere") return true;
  const needle = destination.trim().toLowerCase();
  if (!needle) return true;
  return [tour.destination, tour.country, tour.region, tour.category]
    .filter(Boolean)
    .some((value) => value.toLowerCase().includes(needle));
}

export function searchTours({ destination, startDate, endDate, adults = 1, children = 0, mood } = {}) {
  const travellers = Number(adults || 1) + Number(children || 0);
  const months = monthsBetween(startDate, endDate);

  return getTourList().filter((tour) => {
    if (!matchesDestination(tour, destination)) return false;
    if (mood && !tour.moods.includes(mood)) return false;
    if (tour.maxTravellers < travellers) return false;
    if (months && !tour.availableMonths.some((month) => months.has(month))) return false;
    return true;
  });
}

export function getDestinationOptions() {
  const options = new Map();
  getTourList().forEach((tour) => {
    options.set(tour.destination, `${tour.destination}, ${tour.country}`);
    options.set(tour.country, tour.country);
  });
  return [
    { value: "anywhere", labelKey: "search.destinationAny" },
    ...Array.from(options, ([value, label]) => ({ value, label })),
  ];
}

export function getToursForMood(moodId) {
  return getTourList().filter((tour) => tour.moods.includes(moodId));
}