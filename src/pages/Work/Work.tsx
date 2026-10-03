import ProjectList from "../../components/projects/ProjectList";

import { projects } from "../../data/projects/projects";
import { useLanguage } from "../../features/language/useLanguage";
import { translations } from "../../features/language/translations";

function Work() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="work-page">
      <header className="work-page__intro">
        <h1 className="work-page__title">{t.work.title}</h1>
        <p className="work-page__text">{t.work.intro}</p>
      </header>

      <section className="featured-work" aria-label={t.work.title}>
        <ProjectList projects={projects} />
      </section>
    </div>
  );
}

export default Work;
