import { useLanguage } from "../../features/language/useLanguage";
import { translations } from "../../features/language/translations";

function About() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section>
      <h1>{t.about.title}</h1>
      <p>{t.about.intro}</p>
    </section>
  );
}

export default About;
