import { Link } from "react-router-dom";

import HomeAbout from "../../components/home/HomeAbout";
import HomeContact from "../../components/home/HomeContact";
import HomeWaves from "../../components/home/HomeWaves";
import HomeWorkScene from "../../components/home/HomeWorkScene";

import { useLanguage } from "../../features/language/useLanguage";
import { translations } from "../../features/language/translations";

function Home() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="home-page">
      {/* Line-wave background and scroll-tinted colour behind the page */}
      <HomeWaves />

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

      {/* Selected work: a scroll-driven scene */}
      <HomeWorkScene />

      {/* About, then Contact as the closing scene */}
      <HomeAbout />
      <HomeContact />
    </div>
  );
}

export default Home;
