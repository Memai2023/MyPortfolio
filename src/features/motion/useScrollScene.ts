import { useLayoutEffect, type RefObject } from "react";

import { useReducedMotion } from "./useReducedMotion";

type SceneTrack = {
  selector: string;
  // "pass": 0 → 1 while the element scrolls up past the header
  // "tail": 0 → 1 over the last stretch, as its bottom leaves the top
  exit?: "pass" | "tail";
  // Writes --stick: 0 → 1 across the range where a sticky child, one
  // viewport (minus header) tall, stays pinned inside this element
  sticky?: boolean;
};

// Elements whose motion follows scroll position. The engine only writes
// progress variables; global.css decides what each element does with them.
const SCENE_TRACKS: SceneTrack[] = [
  { selector: ".hero", exit: "pass" },
  // Home background: page progress for the colour crossfade, and each
  // line-wave group's own pass for its motion
  { selector: ".home-backdrop" },
  { selector: ".home-waves__group" },
  { selector: ".home-work", sticky: true },
  { selector: ".about-section", exit: "tail" },
  {
    selector: [
      ".case-study__overview",
      ".case-study__media-section",
      ".case-study__section",
      ".case-study__design-showcase",
      ".case-study__reflection",
      ".ghost-direction",
      ".ghost-workflow",
    ].join(", "),
    exit: "tail",
  },
];

// Share of the viewport over which a "tail" exit plays out
const TAIL_WINDOW = 0.3;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

// Layout position, unaffected by transforms (so our own motion can't skew it)
function documentTop(element: HTMLElement) {
  let top = 0;
  let node: HTMLElement | null = element;

  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }

  return top;
}

const VARIABLES = ["--sp", "--sc", "--se", "--stick"];

// Writes scroll-progress variables on the tracked elements inside `rootRef`:
//   --sp  0 → 1 as the element travels from the bottom to the top of the viewport
//   --sc  the same, centred: -0.5 → 0.5
//   --se  exit progress, for tracks with an `exit` mode
// One passive scroll listener and one rAF per frame; layout is only measured
// on setup and when sizes change, never while scrolling.
export function useScrollScene(
  rootRef: RefObject<HTMLElement | null>,
  pageKey: string,
) {
  // Runs at every width (the CSS decides which effects apply where; phones
  // only get the gentle Home background motion) — never with reduced motion
  const reducedMotion = useReducedMotion();
  const enabled = !reducedMotion;

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root || !enabled) {
      return;
    }

    const tracks = new Map<HTMLElement, SceneTrack>();

    for (const track of SCENE_TRACKS) {
      root
        .querySelectorAll<HTMLElement>(track.selector)
        .forEach((element) => tracks.set(element, track));
    }

    const elements = [...tracks.keys()];
    const geometry = new Map<HTMLElement, { top: number; height: number }>();
    const active = new Set<HTMLElement>();
    let headerHeight = 0;
    let frame = 0;

    const measure = () => {
      headerHeight =
        document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 0;

      for (const element of elements) {
        geometry.set(element, {
          top: documentTop(element),
          height: element.offsetHeight,
        });
      }
    };

    const write = (element: HTMLElement) => {
      const box = geometry.get(element);

      if (!box) {
        return;
      }

      const scrollY = window.scrollY;
      const viewport = window.innerHeight;
      const progress = clamp01(
        (scrollY + viewport - box.top) / (viewport + box.height),
      );

      element.style.setProperty("--sp", progress.toFixed(4));
      element.style.setProperty("--sc", (progress - 0.5).toFixed(4));

      const { exit, sticky } = tracks.get(element) ?? {};

      if (sticky) {
        const range = box.height - (viewport - headerHeight);

        element.style.setProperty(
          "--stick",
          (range > 0
            ? clamp01((scrollY + headerHeight - box.top) / range)
            : 0
          ).toFixed(4),
        );
      }

      if (exit === "pass") {
        element.style.setProperty(
          "--se",
          clamp01((scrollY + headerHeight - box.top) / box.height).toFixed(4),
        );
      } else if (exit === "tail") {
        const window_ = viewport * TAIL_WINDOW;
        const bottom = box.top + box.height;

        element.style.setProperty(
          "--se",
          clamp01(
            (scrollY + headerHeight + window_ - bottom) / window_,
          ).toFixed(4),
        );
      }
    };

    const update = () => {
      frame = 0;
      active.forEach(write);
    };

    const schedule = () => {
      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    };

    const remeasure = () => {
      measure();
      elements.forEach(write);
    };

    // Only elements near the viewport are updated while scrolling
    const visibility = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const element = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            active.add(element);
          } else {
            active.delete(element);
            // settle it at its final value for this side of the viewport
            write(element);
          }
        }

        schedule();
      },
      { rootMargin: "25% 0px 25% 0px" },
    );

    // Content above can change height (images, video metadata, language)
    const resize = new ResizeObserver(remeasure);

    remeasure();
    elements.forEach((element) => visibility.observe(element));
    resize.observe(root);
    // tracked elements can change size on their own (e.g. Home wave groups
    // once their paths are measured)
    elements.forEach((element) => resize.observe(element));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", remeasure);

    return () => {
      cancelAnimationFrame(frame);
      visibility.disconnect();
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", remeasure);

      // Leave nothing behind when switching off (e.g. reduced motion)
      for (const element of elements) {
        VARIABLES.forEach((name) => element.style.removeProperty(name));
      }
    };
  }, [rootRef, pageKey, enabled]);
}
