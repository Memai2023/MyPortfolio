import { useState } from "react";
import { useAccessibility } from "../../features/accessibility/AccessibilityProvider";
import { useLanguage } from "../../features/language/LanguageProvider";
import { translations } from "../../features/language/translations";

function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const { language } = useLanguage();
  const t = translations[language];

  const {
    reducedMotion,
    pauseAnimations,
    pauseVideo,
    highContrast,
    setReducedMotion,
    setPauseAnimations,
    setPauseVideo,
    setHighContrast,
  } = useAccessibility();

  return (
    <div className="accessibility-menu">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="accessibility-panel"
        onClick={() => setIsOpen((current) => !current)}
      >
        {t.accessibility.label}
      </button>

      {isOpen && (
        <div
          id="accessibility-panel"
          role="region"
          aria-label={t.accessibility.panelLabel}
        >
          <label>
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={(event) => setReducedMotion(event.target.checked)}
            />
            {t.accessibility.reduceMotion}
          </label>

          <label>
            <input
              type="checkbox"
              checked={pauseAnimations}
              onChange={(event) => setPauseAnimations(event.target.checked)}
            />
            {t.accessibility.pauseAnimations}
          </label>

          <label>
            <input
              type="checkbox"
              checked={pauseVideo}
              onChange={(event) => setPauseVideo(event.target.checked)}
            />
            {t.accessibility.pauseVideo}
          </label>

          <label>
            <input
              type="checkbox"
              checked={highContrast}
              onChange={(event) => setHighContrast(event.target.checked)}
            />
            {t.accessibility.highContrast}
          </label>
        </div>
      )}
    </div>
  );
}

export default AccessibilityMenu;
