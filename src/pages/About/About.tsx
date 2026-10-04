import AboutSections from "../../components/about/AboutSections";
import { useLanguage } from "../../features/language/useLanguage";
import { translations } from "../../features/language/translations";

function About() {
  const { language } = useLanguage();
  const t = translations[language].about;

  return (
    <div className="about-page">
      {/* Intro */}
      <section className="about-hero" aria-labelledby="about-title">
        <h1 id="about-title" className="about-hero__title">
          {t.title}
        </h1>

        <p className="about-hero__statement">{t.statement}</p>

        <div className="about-hero__intro about-text">
          {t.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <AboutSections />
    </div>
  );
}

export default About;
