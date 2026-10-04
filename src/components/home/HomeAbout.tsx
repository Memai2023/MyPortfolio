import AboutSections from "../about/AboutSections";
import { useLanguage } from "../../features/language/useLanguage";
import { translations } from "../../features/language/translations";

// The About sections, presented more compactly inside the Home scroll
function HomeAbout() {
  const { language } = useLanguage();
  const t = translations[language].about;

  return (
    <div className="home-about">
      <p className="home-about__label case-study__label">{t.title}</p>

      <AboutSections idPrefix="home-about" />
    </div>
  );
}

export default HomeAbout;
