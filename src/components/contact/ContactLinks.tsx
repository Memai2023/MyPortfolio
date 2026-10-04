import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "../../data/contact";
import { useLanguage } from "../../features/language/useLanguage";
import { translations } from "../../features/language/translations";

// Lets the address wrap before the "@" on narrow screens instead of mid-word
const [emailUser, emailDomain] = EMAIL.split("@");

type ContactLinksProps = {
  className?: string;
};

// The email / LinkedIn / GitHub rows, shared by the Contact page and Home
function ContactLinks({ className }: ContactLinksProps) {
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
    <section
      className={className ? `contact-links ${className}` : "contact-links"}
      aria-label={t.linksLabel}
    >
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
                  <span className="contact-visually-hidden"> {t.newTab}</span>
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
  );
}

export default ContactLinks;
