import { useLanguage } from "../../features/language/LanguageProvider";
import { translations } from "../../features/language/translations";

function Work() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section>
      <h1>{t.work.title}</h1>
      <p>{t.work.intro}</p>
    </section>
  );
}

export default Work;
