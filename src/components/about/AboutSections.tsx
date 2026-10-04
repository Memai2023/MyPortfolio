import { Link } from "react-router-dom";

import { useLanguage } from "../../features/language/useLanguage";
import { translations } from "../../features/language/translations";

type AboutSectionsProps = {
  // Prefix for heading ids, so the sections can appear on more than one page
  idPrefix?: string;
};

// My path, What I work with, How I work and Currently — shared by the
// About page and the Home page
function AboutSections({ idPrefix = "about" }: AboutSectionsProps) {
  const { language } = useLanguage();
  const t = translations[language].about;

  return (
    <>
      {/* My path */}
      <section
        className="about-section about-section--pinned"
        aria-labelledby={`${idPrefix}-path-heading`}
      >
        <div className="about-section__heading">
          <p className="case-study__label">{t.pathLabel}</p>
          <h2 id={`${idPrefix}-path-heading`}>{t.pathTitle}</h2>
        </div>

        <div className="about-text">
          {t.pathText.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* What I work with */}
      <section
        className="about-section"
        aria-labelledby={`${idPrefix}-areas-heading`}
      >
        <div className="about-section__heading">
          <h2 id={`${idPrefix}-areas-heading`}>{t.areasTitle}</h2>
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
      <section
        className="about-section about-section--pinned"
        aria-labelledby={`${idPrefix}-how-heading`}
      >
        <div className="about-section__heading">
          <h2 id={`${idPrefix}-how-heading`}>{t.howTitle}</h2>
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
        aria-labelledby={`${idPrefix}-current-heading`}
      >
        <div className="about-section__heading">
          <p className="case-study__label">{t.currentLabel}</p>
          <h2 id={`${idPrefix}-current-heading`}>{t.currentTitle}</h2>
        </div>

        <div className="about-text">
          <p>{t.currentText}</p>

          <Link className="hero__primary-link about-cta" to="/contact">
            {t.contactCta}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}

export default AboutSections;
