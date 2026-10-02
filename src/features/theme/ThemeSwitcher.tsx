import { useLanguage } from "../language/LanguageProvider";
import { translations } from "../language/translations";
import { useTheme } from "./ThemeProvider";

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const { language } = useLanguage();

  const t = translations[language];

  return (
    <fieldset>
      <legend>{t.theme.label}</legend>

      <label>
        <input
          type="radio"
          name="theme"
          value="system"
          checked={theme === "system"}
          onChange={() => setTheme("system")}
        />
        {t.theme.system}
      </label>

      <label>
        <input
          type="radio"
          name="theme"
          value="light"
          checked={theme === "light"}
          onChange={() => setTheme("light")}
        />
        {t.theme.light}
      </label>

      <label>
        <input
          type="radio"
          name="theme"
          value="dark"
          checked={theme === "dark"}
          onChange={() => setTheme("dark")}
        />
        {t.theme.dark}
      </label>
    </fieldset>
  );
}

export default ThemeSwitcher;
