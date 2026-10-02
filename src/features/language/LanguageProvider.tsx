import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Language = "sv" | "en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

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

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
