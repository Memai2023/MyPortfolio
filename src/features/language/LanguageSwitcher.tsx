import { useId } from "react";

import { tooltipDismissHandlers } from "../../components/layout/headerTooltip";
import { useLanguage } from "./useLanguage";
import { translations } from "./translations";

function SwedishFlag() {
  return (
    <svg
      viewBox="0 0 16 10"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="16" height="10" fill="#006aa7" />
      <rect x="5" width="2" height="10" fill="#fecc02" />
      <rect y="4" width="16" height="2" fill="#fecc02" />
    </svg>
  );
}

function UkFlag() {
  // Unique ids, since clip paths are referenced by id
  const id = useId();
  const flagClip = `${id}-flag`;
  const diagonalClip = `${id}-diagonal`;

  return (
    <svg
      viewBox="0 0 60 30"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <clipPath id={flagClip}>
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id={diagonalClip}>
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath={`url(#${flagClip})`}>
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#ffffff" strokeWidth="6" />
        <path
          d="M0,0 L60,30 M60,0 L0,30"
          clipPath={`url(#${diagonalClip})`}
          stroke="#c8102e"
          strokeWidth="4"
        />
        <path d="M30,0 v30 M0,15 h60" stroke="#ffffff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#c8102e" strokeWidth="6" />
      </g>
    </svg>
  );
}

function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  const nextLanguage = language === "sv" ? "en" : "sv";

  return (
    <button
      className="header-icon-button"
      type="button"
      lang={nextLanguage}
      aria-label={t.language.switchLabel}
      onClick={() => setLanguage(nextLanguage)}
      {...tooltipDismissHandlers}
    >
      <span className="header-icon-button__flag">
        {language === "sv" ? <SwedishFlag /> : <UkFlag />}
      </span>
      <span className="header-tooltip" aria-hidden="true">
        {t.language.switchLabel}
      </span>
    </button>
  );
}

export default LanguageSwitcher;
