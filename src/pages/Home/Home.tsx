import { useLanguage } from "../../features/language/LanguageProvider";
import { translations } from "../../features/language/translations";

function Home() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section>
      <h1>{t.home.title}</h1>
      <p>{t.home.intro}</p>
    </section>
  );
}

export default Home;
