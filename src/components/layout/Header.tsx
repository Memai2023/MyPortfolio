import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import ThemeSwitcher from "../../features/theme/ThemeSwitcher";
import LanguageSwitcher from "../../features/language/LanguageSwitcher";
import AccessibilityMenu from "../accessibility/AccessibilityMenu";
import StableLabel from "../ui/StableLabel";
import { useLanguage } from "../../features/language/useLanguage";
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

    if (isMenuOpen) {
      document.documentElement.classList.add("mobile-menu-open");
    } else {
      document.documentElement.classList.remove("mobile-menu-open");
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.documentElement.classList.remove("mobile-menu-open");
    };
  }, [isMenuOpen]);

  // A marker at the very top of the page: once it leaves the viewport, the
  // header switches to its scrolled style (no scroll listener needed)
  const topSentinelRef = useRef<HTMLSpanElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const sentinel = topSentinelRef.current;

    if (!sentinel || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsScrolled(!entry.isIntersecting);
    });

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, []);

  const { language } = useLanguage();
  const t = translations[language];

  const navLabel = (key: keyof typeof t.nav) => (
    <StableLabel
      text={t.nav[key]}
      variants={Object.values(translations).map((tr) => tr.nav[key])}
    />
  );

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <span
        className="header-scroll-sentinel"
        ref={topSentinelRef}
        aria-hidden="true"
      />

      <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
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
                {navLabel("home")}
              </NavLink>
              <NavLink to="/work" onClick={closeMenu}>
                {navLabel("work")}
              </NavLink>
              <NavLink to="/about" onClick={closeMenu}>
                {navLabel("about")}
              </NavLink>
              <NavLink to="/contact" onClick={closeMenu}>
                {navLabel("contact")}
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
    </>
  );
}

export default Header;
