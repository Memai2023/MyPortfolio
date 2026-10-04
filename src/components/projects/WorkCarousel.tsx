import {
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type KeyboardEvent,
  type TouchEvent,
} from "react";
import { Link } from "react-router-dom";

import {
  projectPreviewVideos,
  projectYouTubeTrailers,
  zoomableProjects,
} from "../../data/projects/projectMedia";
import { useLanguage } from "../../features/language/useLanguage";
import { translations } from "../../features/language/translations";
import VideoPreview from "../ui/VideoPreview";
import YouTubePreview from "../ui/YouTubePreview";

import type { Project } from "../../data/projects/projects";

type WorkCarouselProps = {
  projects: Project[];
};

// Where a project sits in the deck relative to the active one, going round
// the list in a circle: `distance` 0 is the front, 1 the cards either side,
// and so on; `side` is −1 (previous, left), 1 (next, right) or 0. With an
// even count the single card opposite the active one sits centred at the
// back (side 0), hidden behind the front cover — so when the deck turns,
// the card that changes sides does so out of sight and simply emerges from
// behind on the side it is coming from. No card ever jumps across.
function deckPlace(index: number, active: number, count: number) {
  const forward = (index - active + count) % count;
  const backward = count - forward;

  if (forward === 0) {
    return { distance: 0, side: 0 };
  }

  if (forward === backward) {
    return { distance: forward, side: 0 };
  }

  return forward < backward
    ? { distance: forward, side: 1 }
    : { distance: backward, side: -1 };
}

// The Work page: the projects as a circular, stacked deck of covers. The
// active one sits in front; the others wait behind it, smaller, fainter
// and shifted to either side by their circular distance from it. There is
// no first or last: Previous / Next, the arrow keys and swipes wrap round.
// Every slide shares one grid cell; CSS places each by --side and --abs
// (see global.css).
function WorkCarousel({ projects }: WorkCarouselProps) {
  const { language } = useLanguage();
  const t = translations[language].work;

  const [slide, setSlide] = useState(0);
  // the active project's preview may play while hovered with a mouse or
  // holding keyboard focus; touch never starts playback by itself
  const [isEngaged, setIsEngaged] = useState(false);

  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const count = projects.length;

  // one step forward (1) or back (−1), wrapping round in both directions
  const step = (direction: 1 | -1) => {
    setSlide((current) => (current + direction + count) % count);
    setIsEngaged(false);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      step(event.key === "ArrowRight" ? 1 : -1);
    }
  };

  // A clearly horizontal swipe of 50px or more turns the page
  const onTouchStart = (event: TouchEvent<HTMLElement>) => {
    const touch = event.touches[0];

    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const start = touchStart.current;
    const touch = event.changedTouches[0];

    touchStart.current = null;

    if (!start) {
      return;
    }

    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;

    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      step(dx < 0 ? 1 : -1);
    }
  };

  const current = projects[slide];

  return (
    <section
      className="work-carousel"
      aria-roledescription="carousel"
      aria-label={translations[language].nav.work}
      onKeyDown={onKeyDown}
    >
      <div
        className="work-carousel__viewport"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <ol className="work-carousel__track">
          {projects.map((project, index) => {
            const { distance, side } = deckPlace(index, slide, count);
            const isActive = distance === 0;
            const videoSrc = projectPreviewVideos[project.id] ?? null;
            const trailerId = projectYouTubeTrailers[project.id] ?? null;
            // "02 / 04": the project's number and its place in the deck
            const number = `${String(index + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;

            return (
              <li
                key={project.id}
                className={`work-carousel__slide${isActive ? " is-active" : ""}`}
                style={{ "--abs": distance, "--side": side } as CSSProperties}
                data-offset={side * distance}
                aria-roledescription="slide"
                aria-label={`${index + 1} ${t.of} ${projects.length}: ${project.title}`}
                inert={!isActive}
              >
                <div
                  className="work-carousel__media"
                  onPointerEnter={(event) => {
                    if (isActive && event.pointerType === "mouse") {
                      setIsEngaged(true);
                    }
                  }}
                  onPointerLeave={(event) => {
                    if (event.pointerType === "mouse") {
                      setIsEngaged(false);
                    }
                  }}
                  onFocus={(event) => {
                    if (isActive && event.target.matches(":focus-visible")) {
                      setIsEngaged(true);
                    }
                  }}
                  onBlur={(event: FocusEvent<HTMLElement>) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                      setIsEngaged(false);
                    }
                  }}
                >
                  {trailerId && project.image ? (
                    // Poster first; the player loads only when asked. Leaving
                    // the front remounts it, so a playing trailer stops.
                    <YouTubePreview
                      key={isActive ? "front" : "back"}
                      videoId={trailerId}
                      title={`${project.title} – trailer (YouTube)`}
                      poster={project.image}
                      playLabel={t.playTrailer.replace(
                        "{title}",
                        project.title,
                      )}
                      unavailableLabel={t.trailerUnavailable}
                    />
                  ) : videoSrc ? (
                    <VideoPreview
                      src={videoSrc}
                      title={`${project.title} preview`}
                      allowZoom={zoomableProjects.has(project.id)}
                      playback="on-demand"
                      active={isActive && isEngaged}
                      forcePause={!isActive}
                    />
                  ) : (
                    <Link
                      className="work-carousel__image-link"
                      to={`/work/${project.id}`}
                      aria-label={project.title}
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

                <div className="work-carousel__caption">
                  <span className="work-carousel__number">{number}</span>
                  <Link
                    className="work-carousel__title"
                    to={`/work/${project.id}`}
                  >
                    <h2>{project.title}</h2>
                    <span aria-hidden="true">↗</span>
                  </Link>
                  <span className="work-carousel__year">{project.year}</span>
                </div>
              </li>
            );
          })}
        </ol>

        <button
          type="button"
          className="work-carousel__nav work-carousel__nav--previous"
          aria-label={t.previousProject}
          onClick={() => step(-1)}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              d="M15 5l-7 7 7 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          type="button"
          className="work-carousel__nav work-carousel__nav--next"
          aria-label={t.nextProject}
          onClick={() => step(1)}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              d="M9 5l7 7-7 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <p className="work-carousel__status" aria-live="polite">
        {`${slide + 1} ${t.of} ${projects.length} — ${current.title}`}
      </p>
    </section>
  );
}

export default WorkCarousel;
