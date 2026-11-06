import { useEffect, useLayoutEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

// Runs before paint on the client, plain effect on the server.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Resets the window to the top before the new page paints, so nothing flashes mid-scroll. */
export default function ScrollToTop() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useIsomorphicLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}