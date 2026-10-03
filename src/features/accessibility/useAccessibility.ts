import { createContext, useContext } from "react";

export type AccessibilitySettings = {
  reducedMotion: boolean;
  pauseAnimations: boolean;
  pauseVideo: boolean;
  highContrast: boolean;
};

export type AccessibilityContextValue = AccessibilitySettings & {
  setReducedMotion: (value: boolean) => void;
  setPauseAnimations: (value: boolean) => void;
  setPauseVideo: (value: boolean) => void;
  setHighContrast: (value: boolean) => void;
};

export const AccessibilityContext = createContext<
  AccessibilityContextValue | undefined
>(undefined);

export function useAccessibility() {
  const context = useContext(AccessibilityContext);

  if (!context) {
    throw new Error(
      "useAccessibility must be used within AccessibilityProvider",
    );
  }

  return context;
}
