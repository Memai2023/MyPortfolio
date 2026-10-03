import { useMemo, useState, type ReactNode } from "react";
import { LanguageContext, type Language } from "./useLanguage";

const STORAGE_KEY = "portfolio-language";

type LanguageProviderProps = {
  children: ReactNode;
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem(STORAGE_KEY);

    if (savedLanguage === "sv" || savedLanguage === "en") {
      return savedLanguage;
    }

    return "en";
  });

  function setLanguage(language: Language) {
    setLanguageState(language);
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }

  const value = useMemo(
    () => ({
      language,
      setLanguage,
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
