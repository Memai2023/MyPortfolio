import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ThemeSwitcher from "../../features/theme/ThemeSwitcher";
import LanguageSwitcher from "../../features/language/LanguageSwitcher";
import AccessibilityMenu from "../accessibility/AccessibilityMenu";
import { useLanguage } from "../../features/language/LanguageProvider";
import { translations } from "../../features/language/translations";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const { language } = useLanguage();
  const t = translations[language];

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <NavLink className="site-logo" to="/" onClick={closeMenu}>
          Maria Hendricks
        </NavLink>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? t.menu.close : t.menu.open}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span aria-hidden="true">{isMenuOpen ? "✕" : "☰"}</span>
        </button>

        <div
          id="mobile-menu"
          className={`header-menu ${isMenuOpen ? "is-open" : ""}`}
        >
          <nav className="main-nav" aria-label="Main navigation">
            <NavLink to="/" onClick={closeMenu}>
              {t.nav.home}
            </NavLink>
            <NavLink to="/work" onClick={closeMenu}>
              {t.nav.work}
            </NavLink>
            <NavLink to="/about" onClick={closeMenu}>
              {t.nav.about}
            </NavLink>
            <NavLink to="/contact" onClick={closeMenu}>
              {t.nav.contact}
            </NavLink>
          </nav>

          <div className="header-controls">
            <LanguageSwitcher />
            <ThemeSwitcher />
            <AccessibilityMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
