import { Link } from "react-router-dom";

import ProjectList from "../../components/projects/ProjectList";

import { projects } from "../../data/projects/projects";
import { useLanguage } from "../../features/language/useLanguage";
import { translations } from "../../features/language/translations";

function Home() {
  const { language } = useLanguage();
  const t = translations[language];

  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero__eyebrow">
          <span className="hero__status-dot" aria-hidden="true" />
          <span>{t.home.availability}</span>
        </div>

        <div className="hero__content">
          <h1 className="hero__title">
            <span className="hero__title-primary">{t.home.rolePrimary}</span>

            <span className="hero__title-secondary">
              <span className="hero__title-ux">{t.home.roleTag}</span>{" "}
              <span aria-hidden="true">·</span> {t.home.roleSecondary}
            </span>
          </h1>

          <p className="hero__intro">{t.home.intro}</p>

          <div className="hero__actions">
            <Link className="hero__primary-link" to="/work">
              {t.home.viewWork}
              <span aria-hidden="true">↗</span>
            </Link>

            <Link className="hero__secondary-link" to="/about">
              {t.home.aboutMe}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="featured-work">
        <div className="featured-work__heading">
          <p>{t.home.scrollLabel}</p>
        </div>

        <ProjectList projects={featuredProjects} />
      </section>
    </div>
  );
}

export default Home;
