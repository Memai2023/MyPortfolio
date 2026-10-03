import { useLanguage } from "../../features/language/useLanguage";
import { translations } from "../../features/language/translations";

function Contact() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section>
      <h1>{t.contact.title}</h1>
      <p>{t.contact.intro}</p>
    </section>
  );
}

export default Contact;
