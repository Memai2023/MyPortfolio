import { Link } from "react-router-dom";

import awakeningCover from "../../assets/images/projects/the-awakening/the-awakening-cover.png";
import auraBeautyPreview from "../../assets/videos/aura-beauty/aura-beauty-preview.mp4";
import VideoPreview from "../../components/ui/VideoPreview";

import { useLanguage } from "../../features/language/LanguageProvider";
import { translations } from "../../features/language/translations";
import { projects } from "../../data/projects/projects";

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
          <p className="hero__name">Maria Hendricks</p>

          <h1 className="hero__title">
            <span className="hero__title-primary">
              <span>{t.home.rolePrimary}</span>
              <span className="hero__role-tag">/UX</span>
            </span>

            <span className="hero__title-secondary">
              {t.home.roleSecondary}
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

        <div className="hero__footer" aria-hidden="true">
          <span>{t.home.scrollLabel}</span>
          <span>↓</span>
        </div>
      </section>

      {/* Featured projects */}
      <section className="featured-work">
        <div className="featured-work__heading">
          <p>{t.home.scrollLabel}</p>
        </div>

        <div className="featured-work__list">
          {featuredProjects.map((project, index) => {
            const isAwakening = project.id === "the-awakening";
            const isAuraBeauty = project.id === "aura-beauty";

            return (
              <article className="project-preview" key={project.id}>
                <div className="project-preview__meta">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{project.year}</span>
                </div>

                <Link
                  className="project-preview__title-row"
                  to={`/work/${project.id}`}
                >
                  <h2>{project.title}</h2>
                  <span aria-hidden="true">↗</span>
                </Link>

                {isAuraBeauty ? (
                  <div className="project-preview__visual">
                    <VideoPreview
                      src={auraBeautyPreview}
                      title="Aura Beauty app preview"
                    />

                    <span className="video-fallback project-preview__video-fallback">
                      Aura Beauty
                    </span>
                  </div>
                ) : (
                  <Link
                    className="project-preview__visual"
                    to={`/work/${project.id}`}
                    aria-label={`View ${project.title}`}
                  >
                    {isAwakening ? (
                      <img src={awakeningCover} alt="" />
                    ) : project.image ? (
                      <img src={project.image} alt="" />
                    ) : (
                      <span className="project-preview__placeholder">
                        {project.title}
                      </span>
                    )}
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Home;
