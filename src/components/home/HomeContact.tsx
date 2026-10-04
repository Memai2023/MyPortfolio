import ContactLinks from "../contact/ContactLinks";
import { EMAIL } from "../../data/contact";
import { useLanguage } from "../../features/language/useLanguage";
import { translations } from "../../features/language/translations";

// The closing scene of the Home scroll: a compact Contact
function HomeContact() {
  const { language } = useLanguage();
  const t = translations[language].contact;

  return (
    <div className="home-contact">
      <section
        className="home-contact__intro-block"
        aria-labelledby="home-contact-title"
      >
        <h2 id="home-contact-title" className="home-contact__title">
          {t.title}
        </h2>

        <p className="home-contact__intro">{t.intro}</p>
      </section>

      <ContactLinks className="home-contact__links" />

      <div className="home-contact__cta">
        <a className="hero__primary-link" href={`mailto:${EMAIL}`}>
          {t.ctaLink}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}

export default HomeContact;
