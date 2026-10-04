import {
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
  type TouchEvent,
} from "react";
import { Link } from "react-router-dom";

import VideoPreview from "../ui/VideoPreview";
import { SCENE, sceneCssVariables } from "./sceneConfig";
import { useBendScene } from "./useBendScene";

import { projects } from "../../data/projects/projects";
import {
  projectPreviewVideos,
  zoomableProjects,
} from "../../data/projects/projectMedia";
import { useLanguage } from "../../features/language/useLanguage";
import { translations } from "../../features/language/translations";

// ≤ 900px: a button-controlled carousel, one project at a time
const CAROUSEL_QUERY = "(max-width: 900px)";

function subscribeToCarouselQuery(onChange: () => void) {
  const query = window.matchMedia(CAROUSEL_QUERY);

  query.addEventListener("change", onChange);

  return () => query.removeEventListener("change", onChange);
}

const getCarouselMatches = () => window.matchMedia(CAROUSEL_QUERY).matches;

// Selected Work on Home. On desktop the section is a tall scroll area with a
// sticky stage; scroll progress (--stick, written by useScrollScene) slides
// the project track sideways. Phones and tablets get a carousel with
// Previous/Next buttons, and reduced motion on desktop a static grid — all
// from the same markup (see global.css).
function HomeWorkScene() {
  const { language } = useLanguage();
  const t = translations[language];

  const featured = projects.filter((project) => project.featured);

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Desktop: draws the media as bent WebGL planes (CSS scene otherwise)
  useBendScene({ sectionRef, stageRef, canvasRef });

  // The project whose preview may play; only one at a time
  const [activeId, setActiveId] = useState<string | null>(null);

  // Mobile carousel: the project on show
  const isCarousel = useSyncExternalStore(
    subscribeToCarouselQuery,
    getCarouselMatches,
  );
  const [slide, setSlide] = useState(0);
  const previousRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const lastSlide = featured.length - 1;

  const goTo = (target: number) => {
    const index = Math.min(lastSlide, Math.max(0, target));

    setSlide(index);

    // a button that becomes disabled would drop keyboard focus: hand it
    // to the other one
    if (index === lastSlide && document.activeElement === nextRef.current) {
      previousRef.current?.focus();
    } else if (index === 0 && document.activeElement === previousRef.current) {
      nextRef.current?.focus();
    }
  };

  const onCarouselKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isCarousel) {
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(slide - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(slide + 1);
    }
  };

  // Swipe is a secondary way to change slide; the page still scrolls
  // vertically as normal (no preventDefault)
  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];

    touchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
  };

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    const touch = event.changedTouches[0];

    touchStart.current = null;

    if (!isCarousel || !start || !touch) {
      return;
    }

    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;

    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      goTo(slide + (dx < 0 ? 1 : -1));
    }
  };

  const isCinematic = () =>
    !!stageRef.current &&
    getComputedStyle(stageRef.current).position === "sticky";

  // In the sliding scene only the centred card may play its video
  const isPlayable = (card: HTMLElement) => {
    if (!isCinematic()) {
      return true;
    }

    const rect = card.getBoundingClientRect();

    return (
      Math.abs(rect.left + rect.width / 2 - window.innerWidth / 2) <
      rect.width / 2
    );
  };

  // Keyboard focus on a card scrolls the page so that card slides to centre
  const bringIntoFocus = (index: number) => {
    const section = sectionRef.current;
    const stage = stageRef.current;

    if (!section || !stage || !isCinematic() || featured.length < 2) {
      return;
    }

    const header = document.querySelector<HTMLElement>(".site-header");
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const range = section.offsetHeight - stage.offsetHeight;

    const { carouselStart, carouselEnd } = SCENE;
    const progress =
      carouselStart +
      ((carouselEnd - carouselStart) * index) / (featured.length - 1);

    window.scrollTo({
      top: sectionTop - (header?.offsetHeight ?? 0) + range * progress,
    });
  };

  return (
    <section
      className="home-work"
      ref={sectionRef}
      aria-labelledby="home-work-title"
      style={sceneCssVariables(featured.length)}
    >
      <div className="home-work__stage" ref={stageRef}>
        {/* Slow abstract light behind the cards (cinematic only); the
            line waves themselves are the page-wide HomeWaves */}
        <div className="home-work__backdrop" aria-hidden="true">
          <span className="home-work__glow home-work__glow--a" />
          <span className="home-work__glow home-work__glow--b" />
        </div>

        {/* WebGL surface for the bent project media (desktop only) */}
        <canvas
          className="home-work__canvas"
          ref={canvasRef}
          aria-hidden="true"
        />

        <div className="home-work__header">
          <h2 id="home-work-title" className="home-work__title">
            {t.home.scrollLabel}
          </h2>

          <Link className="home-work__all" to="/work">
            {t.home.viewWork}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div
          className="home-work__viewport"
          onKeyDown={onCarouselKeyDown}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <ol className="home-work__track">
            {featured.map((project, index) => {
              const videoSrc = projectPreviewVideos[project.id] ?? null;

              return (
                <li
                  className={
                    isCarousel
                      ? `home-work__card ${
                          index === slide
                            ? "is-active"
                            : index < slide
                              ? "is-before"
                              : "is-after"
                        }`
                      : "home-work__card"
                  }
                  key={project.id}
                  inert={isCarousel && index !== slide ? true : undefined}
                  style={{ "--i": index } as CSSProperties}
                  onPointerEnter={(event: PointerEvent<HTMLLIElement>) => {
                    if (
                      event.pointerType === "mouse" &&
                      isPlayable(event.currentTarget)
                    ) {
                      setActiveId(project.id);
                    }
                  }}
                  onPointerLeave={(event: PointerEvent<HTMLLIElement>) => {
                    if (event.pointerType === "mouse") {
                      setActiveId((current) =>
                        current === project.id ? null : current,
                      );
                    }
                  }}
                  onFocus={(event: FocusEvent<HTMLLIElement>) => {
                    if (event.target.matches(":focus-visible")) {
                      bringIntoFocus(index);
                      setActiveId(project.id);
                    }
                  }}
                  onBlur={(event: FocusEvent<HTMLLIElement>) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                      setActiveId((current) =>
                        current === project.id ? null : current,
                      );
                    }
                  }}
                >
                  <div className="home-work__media">
                    {videoSrc ? (
                      <VideoPreview
                        src={videoSrc}
                        title={`${project.title} preview`}
                        allowZoom={zoomableProjects.has(project.id)}
                        playback="on-demand"
                        active={activeId === project.id}
                        forcePause={isCarousel && index !== slide}
                      />
                    ) : (
                      <Link
                        className="home-work__media-link"
                        to={`/work/${project.id}`}
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        {project.image ? (
                          <img src={project.image} alt="" />
                        ) : (
                          <span className="project-preview__placeholder">
                            {project.title}
                          </span>
                        )}
                      </Link>
                    )}
                  </div>

                  <div className="home-work__meta">
                    <span className="home-work__index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 className="home-work__name">
                      <Link to={`/work/${project.id}`}>{project.title}</Link>
                    </h3>

                    <span className="home-work__year">{project.year}</span>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Carousel controls (≤ 900px only) */}
          <button
            ref={previousRef}
            className="home-work__nav home-work__nav--previous"
            type="button"
            onClick={() => goTo(slide - 1)}
            disabled={slide === 0}
            aria-label={t.home.previousProject}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path
                d="M14.5 5.5 8 12l6.5 6.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            ref={nextRef}
            className="home-work__nav home-work__nav--next"
            type="button"
            onClick={() => goTo(slide + 1)}
            disabled={slide === lastSlide}
            aria-label={t.home.nextProject}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path
                d="M9.5 5.5 16 12l-6.5 6.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* announces the project on show after each change */}
          <p className="home-work__status" aria-live="polite">
            {isCarousel
              ? `${slide + 1} / ${featured.length} · ${featured[slide]?.title}`
              : ""}
          </p>
        </div>
      </div>
    </section>
  );
}

export default HomeWorkScene;
