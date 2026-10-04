import { useSyncExternalStore } from "react";

import { useAccessibility } from "../accessibility/useAccessibility";

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToSystemMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCE_QUERY);

  query.addEventListener("change", onChange);

  return () => query.removeEventListener("change", onChange);
}

function getSystemPrefersReduced() {
  return window.matchMedia(REDUCE_QUERY).matches;
}

// True when either the OS setting or the site's own "Reduce motion" is on
export function useReducedMotion() {
  const { reducedMotion } = useAccessibility();

  const systemPrefersReduced = useSyncExternalStore(
    subscribeToSystemMotion,
    getSystemPrefersReduced,
  );

  return reducedMotion || systemPrefersReduced;
}
