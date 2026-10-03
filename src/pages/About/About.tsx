import { Link } from "react-router-dom";

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

      {/* My path */}
      <section className="about-section" aria-labelledby="about-path-heading">
        <div className="about-section__heading">
          <p className="case-study__label">{t.pathLabel}</p>
          <h2 id="about-path-heading">{t.pathTitle}</h2>
        </div>

        <div className="about-text">
          {t.pathText.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* What I work with */}
      <section className="about-section" aria-labelledby="about-areas-heading">
        <div className="about-section__heading">
          <h2 id="about-areas-heading">{t.areasTitle}</h2>
        </div>

        <ul className="about-areas">
          {t.areas.map((area, index) => (
            <li className="about-area" key={area.title}>
              <h3>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {area.title}
              </h3>
              <p>{area.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* How I work */}
      <section className="about-section" aria-labelledby="about-how-heading">
        <div className="about-section__heading">
          <h2 id="about-how-heading">{t.howTitle}</h2>
        </div>

        <div className="about-text about-text--lead">
          {t.howText.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Currently */}
      <section
        className="about-section"
        aria-labelledby="about-current-heading"
      >
        <div className="about-section__heading">
          <p className="case-study__label">{t.currentLabel}</p>
          <h2 id="about-current-heading">{t.currentTitle}</h2>
        </div>

        <div className="about-text">
          <p>{t.currentText}</p>

          <Link className="hero__primary-link about-cta" to="/contact">
            {t.contactCta}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;
