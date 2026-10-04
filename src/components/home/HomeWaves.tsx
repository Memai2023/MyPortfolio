import { useEffect, useRef, useState, type CSSProperties } from "react";

import {
  buildWaves,
  type Box,
  type WaveGroup,
  type WaveMode,
} from "./wavePaths";

// Layout position inside `ancestor`, ignoring CSS transforms (scroll motion)
function boxWithin(element: Element | null, ancestor: HTMLElement): Box | null {
  if (!(element instanceof HTMLElement)) {
    return null;
  }

  let left = 0;
  let top = 0;
  let node: HTMLElement | null = element;

  while (node && node !== ancestor) {
    left += node.offsetLeft;
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }

  return {
    left,
    top,
    right: left + element.offsetWidth,
    bottom: top + element.offsetHeight,
  };
}

const modeFor = (width: number): WaveMode =>
  width > 900 ? "desktop" : width > 700 ? "tablet" : "phone";

// centre lines thickest, outer and leftover lines thinnest
const strokeFor = (strength: number, mode: WaveMode) => {
  const [thin, thick] = mode === "phone" ? [0.85, 1.25] : [0.9, 1.6];
  const weight = Math.min(1, Math.max(0, (strength - 0.5) * 2));

  return `${(thin + (thick - thin) * weight).toFixed(2)}px`;
};

// a soft halo without a blur filter: stacked faint strokes, widest first,
// build up a falloff toward the curve (filters re-rasterize too slowly)
const HALO_STEPS = [1, 0.72, 0.46, 0.24];

type Scene = {
  width: number;
  mode: WaveMode;
  groups: WaveGroup[];
  // page-progress points (same metric as --sp on .home-backdrop) around
  // which each tint fades in, and the half-width of each fade
  colorStops: Record<"hero" | "work" | "about" | "contact", [number, number]>;
};

const GROUP_IDS: WaveGroup["id"][] = ["hero", "work", "about"];

// The Home background: scroll-tinted colour layers and three line-wave
// groups. Geometry is rebuilt only when the layout changes size; all
// scroll motion is CSS reading --sp from useScrollScene.
function HomeWaves() {
  const layerRef = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState<Scene | null>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const page = layer?.closest<HTMLElement>(".home-page");

    if (!layer || !page) {
      return;
    }

    let frame = 0;

    const measure = () => {
      frame = 0;

      const heroTitle = boxWithin(page.querySelector(".hero__title"), page);
      const heroActions = boxWithin(page.querySelector(".hero__actions"), page);
      const hero = boxWithin(page.querySelector(".hero"), page);
      const work = boxWithin(page.querySelector(".home-work"), page);
      const contact = boxWithin(page.querySelector(".home-contact"), page);
      const column = boxWithin(page.querySelector(".home-work__header"), page);
      const aboutSections = [
        ...page.querySelectorAll(".home-about .about-section"),
      ]
        .map((section) => boxWithin(section, page))
        .filter((box): box is Box => box !== null);

      if (!heroTitle || !heroActions || !hero || !work || !contact || !column) {
        return;
      }

      // the layer is full-bleed and centred on the page box
      const width = layer.clientWidth;
      const shift = (width - page.clientWidth) / 2;
      const move = (box: Box): Box => ({
        ...box,
        left: box.left + shift,
        right: box.right + shift,
      });
      const viewport = window.innerHeight;
      const height = page.scrollHeight;
      const mode = modeFor(width);

      let pageTop = 0;

      for (
        let node: HTMLElement | null = page;
        node;
        node = node.offsetParent as HTMLElement | null
      ) {
        pageTop += node.offsetTop;
      }

      // --sp = (scrollY + vh − top) / (vh + height); a point y is centred in
      // the viewport when scrollY = top + y − vh / 2
      const atScroll = (scrollY: number) =>
        (scrollY + viewport - pageTop) / (viewport + height);
      const centred = (y: number) => (y + viewport / 2) / (viewport + height);
      const span = (share: number) => (viewport * share) / (viewport + height);
      const firstAbout = aboutSections[0] ?? contact;
      const header =
        document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 0;

      setScene({
        width,
        mode,
        groups: buildWaves(
          {
            width,
            height,
            viewport,
            contentLeft: move(column).left,
            contentRight: move(column).right,
            heroTitle: move(heroTitle),
            heroActions: move(heroActions),
            hero: move(hero),
            work: move(work),
            aboutSections: aboutSections.map(move),
            contact: move(contact),
          },
          mode,
        ),
        colorStops: {
          // hero mood: in over the first ~0.55 screens of scrolling
          hero: [atScroll(viewport * 0.3), span(0.25)],
          // Work: as its stage pins below the header
          work: [atScroll(pageTop + work.top - header), span(0.25)],
          about: [centred(firstAbout.top), span(0.35)],
          contact: [centred(contact.top), span(0.35)],
        },
      });
    };

    // batch bursts of resize notifications into one measurement
    const schedule = () => {
      if (!frame) {
        frame = requestAnimationFrame(measure);
      }
    };

    const observer = new ResizeObserver(schedule);

    observer.observe(page);
    observer.observe(layer);
    page
      .querySelectorAll(".hero, .home-work, .home-about, .home-contact")
      .forEach((section) => observer.observe(section));

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const stops = scene?.colorStops;

  return (
    <>
      {/* Background colour that shifts gently through the sections: fixed
          layers crossfaded by opacity (the probe carries page progress) */}
      <div
        className="home-backdrop"
        aria-hidden="true"
        style={
          stops
            ? (Object.fromEntries(
                Object.entries(stops).flatMap(([name, [at, fade]]) => [
                  [`--bg-${name}-in`, at],
                  [`--bg-${name}-fade`, fade],
                ]),
              ) as CSSProperties)
            : undefined
        }
      >
        <div className="home-backdrop__layer home-backdrop__layer--hero" />
        <div className="home-backdrop__layer home-backdrop__layer--work" />
        <div className="home-backdrop__layer home-backdrop__layer--about" />
      </div>

      <div
        className={`home-waves home-waves--${scene?.mode ?? "desktop"}`}
        ref={layerRef}
        aria-hidden="true"
      >
        {GROUP_IDS.map((groupId) => {
          const group = scene?.groups.find((item) => item.id === groupId);

          return (
            <div
              key={groupId}
              className={`home-waves__group home-waves__group--${groupId}`}
              style={
                group
                  ? ({
                      top: group.top,
                      height: group.height,
                      "--pivot": `${group.pivot.x.toFixed(0)}px ${group.pivot.y.toFixed(0)}px`,
                    } as CSSProperties)
                  : undefined
              }
            >
              {group &&
                scene &&
                (["upper", "lower", "inner"] as const).map((layer) => (
                  // Three line layers per group (both edges and the middle
                  // of the bundle), so the idle motion can widen, narrow and
                  // shift the bundle instead of only sliding it. The vertical fade is a CSS mask, not an SVG
                  // <mask>: an SVG mask re-rasterizes the whole group on
                  // every scroll frame.
                  <svg
                    key={layer}
                    className={`home-waves__layer home-waves__layer--${layer}`}
                    viewBox={`0 0 ${scene.width} ${group.height}`}
                    preserveAspectRatio="none"
                    focusable="false"
                    style={{
                      maskImage: `linear-gradient(to bottom, ${group.envelope
                        .map(
                          ([offset, strength]) =>
                            `rgb(0 0 0 / ${strength}) ${(offset * 100).toFixed(2)}%`,
                        )
                        .join(", ")})`,
                    }}
                  >
                    {/* soft glow behind the bundle so it melts into the page */}
                    {layer === "inner" &&
                      HALO_STEPS.map((step) => (
                        <path
                          key={step}
                          className="home-waves__halo"
                          d={group.halo.d}
                          strokeWidth={group.halo.width * step}
                        />
                      ))}
                    {group.lines
                      .filter((line) => line.layer === layer)
                      .map((line, index) => (
                        <path
                          key={index}
                          className={`home-waves__line home-waves__line--${line.tone}`}
                          d={line.d}
                          strokeOpacity={line.strength}
                          style={{
                            strokeWidth: strokeFor(line.strength, scene.mode),
                          }}
                        />
                      ))}
                  </svg>
                ))}

              {/* the outer element follows scroll, the shape inside breathes */}
              {group?.accents.map((item, index) => (
                <div
                  key={index}
                  className="home-waves__accent"
                  style={
                    {
                      left: item.x - item.size,
                      top: item.y - item.size,
                      width: item.size * 2,
                      height: item.size * 2,
                      "--at": item.at,
                      "--aw": item.window,
                      "--idle-delay": `${index * -3.7}s`,
                    } as CSSProperties
                  }
                >
                  <svg
                    className="home-waves__accent-shape"
                    viewBox="-1.1 -1.1 2.2 2.2"
                    focusable="false"
                  >
                    <path d={item.path} />
                    <circle r="0.09" />
                  </svg>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default HomeWaves;
