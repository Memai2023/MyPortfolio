import { useLanguage } from "../../features/language/useLanguage";
import { translations } from "../../features/language/translations";

const EMAIL = "maria.hendricks26@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/maria-hendricks/";
const GITHUB_URL = "https://github.com/Memai2023";

// Lets the address wrap before the "@" on narrow screens instead of mid-word
const [emailUser, emailDomain] = EMAIL.split("@");

function Contact() {
  const { language } = useLanguage();
  const t = translations[language].contact;

  const links = [
    {
      label: t.emailLabel,
      href: `mailto:${EMAIL}`,
      text: (
        <>
          {emailUser}
          <wbr />@{emailDomain}
        </>
      ),
      external: false,
    },
    {
      label: t.linkedinLabel,
      href: LINKEDIN_URL,
      text: "Maria Hendricks",
      external: true,
    },
    {
      label: t.githubLabel,
      href: GITHUB_URL,
      text: "Memai2023",
      external: true,
    },
  ];

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
      <section className="contact-links" aria-label={t.linksLabel}>
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <a
                className="contact-link"
                href={link.href}
                {...(link.external && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
              >
                <span className="contact-link__label">{link.label}</span>

                <span className="contact-link__value">
                  <span className="contact-link__text">{link.text}</span>
                  {link.external && (
                    <span className="contact-visually-hidden">
                      {" "}
                      {t.newTab}
                    </span>
                  )}
                  <span className="contact-link__arrow" aria-hidden="true">
                    ↗
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

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
