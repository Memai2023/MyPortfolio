import { useLanguage } from "./useLanguage";
import { translations } from "./translations";

function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  return (
    <fieldset>
      <legend>{t.language.label}</legend>

      <label>
        <input
          type="radio"
          name="language"
          value="sv"
          checked={language === "sv"}
          onChange={() => setLanguage("sv")}
        />
        SV
      </label>

      <label>
        <input
          type="radio"
          name="language"
          value="en"
          checked={language === "en"}
          onChange={() => setLanguage("en")}
        />
        EN
      </label>
    </fieldset>
  );
}

export default LanguageSwitcher;
