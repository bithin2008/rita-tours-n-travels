import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getSiteSettings, translate } from "@/lib/data-service";

const AppContext = createContext(null);
const STORAGE_KEY = "rita-preferences";

export function AppProvider({ children }) {
  const [currency, setCurrency] = useState("EUR");
  const [language, setLanguage] = useState("en");
  const [wishlist, setWishlist] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Stored preferences are read after mount so server and client markup match.
  useEffect(() => {
    try {
      const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
      if (stored.currency) setCurrency(stored.currency);
      if (stored.language) setLanguage(stored.language);
      if (Array.isArray(stored.wishlist)) setWishlist(stored.wishlist);
    } catch {
      /* ignore unreadable storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ currency, language, wishlist }));
  }, [currency, language, wishlist, hydrated]);

  const t = useCallback((key) => translate(language, key), [language]);

  const toggleWishlist = useCallback((id) => {
    setWishlist((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }, []);

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
      language,
      setLanguage,
      wishlist,
      toggleWishlist,
      isWished: (id) => wishlist.includes(id),
      t,
      settings: getSiteSettings(),
    }),
    [currency, language, wishlist, toggleWishlist, t],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProvider");
  return context;
}