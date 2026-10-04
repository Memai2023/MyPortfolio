import ContactLinks from "../../components/contact/ContactLinks";
import { EMAIL } from "../../data/contact";
import { useLanguage } from "../../features/language/useLanguage";
import { translations } from "../../features/language/translations";

function Contact() {
  const { language } = useLanguage();
  const t = translations[language].contact;

  return (
    <div className="contact-page">
      {/* Intro */}
      <section className="contact-hero" aria-labelledby="contact-title">
        <h1 id="contact-title" className="contact-hero__title">
          {t.title}
        </h1>

        <p className="contact-hero__intro">{t.intro}</p>
      </section>

      {/* Contact links */}
      <ContactLinks />

      {/* Email CTA */}
      <section className="contact-cta" aria-labelledby="contact-cta-heading">
        <h2 id="contact-cta-heading">{t.ctaTitle}</h2>

        <div>
          <a className="hero__primary-link" href={`mailto:${EMAIL}`}>
            {t.ctaLink}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </div>
  );
}

export default Contact;
