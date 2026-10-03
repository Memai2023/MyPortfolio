import { useSyncExternalStore } from "react";

import { tooltipDismissHandlers } from "../../components/layout/headerTooltip";
import { useLanguage } from "../language/useLanguage";
import { translations } from "../language/translations";
import { useTheme } from "./useTheme";

const DARK_QUERY = "(prefers-color-scheme: dark)";

// Follows the OS setting live, for while the preference is still "system"
function subscribeToSystemTheme(onChange: () => void) {
  const query = window.matchMedia(DARK_QUERY);

  query.addEventListener("change", onChange);

  return () => query.removeEventListener("change", onChange);
}

function getSystemPrefersDark() {
  return window.matchMedia(DARK_QUERY).matches;
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="12"
        cy="12"
        r="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.55 1.55M17.15 17.15l1.55 1.55M5.3 18.7l1.55-1.55M17.15 6.85l1.55-1.55"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const { language } = useLanguage();

  const t = translations[language];

  const systemPrefersDark = useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemPrefersDark,
  );

  const isDark = theme === "dark" || (theme === "system" && systemPrefersDark);

  const label = isDark ? t.theme.switchToLight : t.theme.switchToDark;

  return (
    <button
      className="header-icon-button"
      type="button"
      aria-label={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      {...tooltipDismissHandlers}
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
      <span className="header-tooltip" aria-hidden="true">
        {label}
      </span>
    </button>
  );
}

export default ThemeSwitcher;
