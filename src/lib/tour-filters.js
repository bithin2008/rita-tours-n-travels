/** Pure helpers for the tours catalogue filters, sorting and labels. */

export const DURATION_BUCKETS = [
  { value: "short", label: "Up to 4 nights", test: (nights) => nights <= 4 },
  { value: "week", label: "5 – 6 nights", test: (nights) => nights >= 5 && nights <= 6 },
  { value: "long", label: "7 nights or more", test: (nights) => nights >= 7 },
];

export const MONTHS = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

export const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "duration-asc", label: "Shortest first" },
  { value: "duration-desc", label: "Longest first" },
];

export const createEmptyFilters = (maxPrice) => ({
  query: "",
  destination: "all",
  category: "all",
  duration: "all",
  month: "all",
  maxPrice,
  eco: false,
  moods: [],
});

export function filterTours(tours, filters) {
  const needle = filters.query.trim().toLowerCase();
  const bucket = DURATION_BUCKETS.find((item) => item.value === filters.duration);

  return tours.filter((tour) => {
    if (needle) {
      const haystack = [tour.title, tour.destination, tour.country, tour.category, tour.region]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(needle)) return false;
    }
    if (filters.destination !== "all" && tour.destination !== filters.destination) return false;
    if (filters.category !== "all" && tour.category !== filters.category) return false;
    if (bucket && !bucket.test(tour.durationNights)) return false;
    if (filters.month !== "all" && !tour.availableMonths.includes(Number(filters.month))) return false;
    if (typeof filters.maxPrice === "number" && tour.priceFrom > filters.maxPrice) return false;
    if (filters.eco && !tour.eco) return false;
    if (filters.moods.length && !filters.moods.every((mood) => tour.moods.includes(mood))) return false;
    return true;
  });
}

export function sortTours(tours, sort) {
  const list = [...tours];
  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => a.priceFrom - b.priceFrom);
    case "price-desc":
      return list.sort((a, b) => b.priceFrom - a.priceFrom);
    case "duration-asc":
      return list.sort((a, b) => a.durationNights - b.durationNights);
    case "duration-desc":
      return list.sort((a, b) => b.durationNights - a.durationNights);
    default:
      return list;
  }
}

export function countActiveFilters(filters, priceCeiling) {
  let count = 0;
  if (filters.query.trim()) count += 1;
  if (filters.destination !== "all") count += 1;
  if (filters.category !== "all") count += 1;
  if (filters.duration !== "all") count += 1;
  if (filters.month !== "all") count += 1;
  if (filters.eco) count += 1;
  count += filters.moods.length;
  if (typeof filters.maxPrice === "number" && filters.maxPrice < priceCeiling) count += 1;
  return count;
}