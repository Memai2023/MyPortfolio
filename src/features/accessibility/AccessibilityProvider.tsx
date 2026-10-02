import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type AccessibilitySettings = {
  reducedMotion: boolean;
  pauseAnimations: boolean;
  pauseVideo: boolean;
  highContrast: boolean;
};

type AccessibilityContextValue = AccessibilitySettings & {
  setReducedMotion: (value: boolean) => void;
  setPauseAnimations: (value: boolean) => void;
  setPauseVideo: (value: boolean) => void;
  setHighContrast: (value: boolean) => void;
};

const AccessibilityContext = createContext<
  AccessibilityContextValue | undefined
>(undefined);

const STORAGE_KEY = "portfolio-accessibility";

type AccessibilityProviderProps = {
  children: ReactNode;
};

const defaultSettings: AccessibilitySettings = {
  reducedMotion: false,
  pauseAnimations: false,
  pauseVideo: false,
  highContrast: false,
};

export function AccessibilityProvider({
  children,
}: AccessibilityProviderProps) {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const savedSettings = localStorage.getItem(STORAGE_KEY);

    if (!savedSettings) {
      return defaultSettings;
    }

    try {
      return {
        ...defaultSettings,
        ...JSON.parse(savedSettings),
      };
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));

    const root = document.documentElement;

    root.dataset.reducedMotion = String(settings.reducedMotion);
    root.dataset.pauseAnimations = String(settings.pauseAnimations);
    root.dataset.pauseVideo = String(settings.pauseVideo);
    root.dataset.highContrast = String(settings.highContrast);
  }, [settings]);

  const value = useMemo<AccessibilityContextValue>(
    () => ({
      ...settings,

      setReducedMotion: (value: boolean) =>
        setSettings((current) => ({
          ...current,
          reducedMotion: value,
        })),

      setPauseAnimations: (value: boolean) =>
        setSettings((current) => ({
          ...current,
          pauseAnimations: value,
        })),

      setPauseVideo: (value: boolean) =>
        setSettings((current) => ({
          ...current,
          pauseVideo: value,
        })),

      setHighContrast: (value: boolean) =>
        setSettings((current) => ({
          ...current,
          highContrast: value,
        })),
    }),
    [settings],
  );

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);

  if (!context) {
    throw new Error(
      "useAccessibility must be used within AccessibilityProvider",
    );
  }

  return context;
}
