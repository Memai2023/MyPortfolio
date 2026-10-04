import { useLayoutEffect, type RefObject } from "react";

// How a block enters:
// "label"   small eyebrow: soft fade, minimal rise
// "heading" fade + small rise, uncovered from below by a soft mask
// "text"    paragraph / row / content group: mostly a fade
// "media"   image, video or CTA: fade + slightly larger rise
// "side"    case-study media: slides in from the side, alternating left /
//           right down the page (data-reveal-from="left" | "right")
// "group"   observed as one unit; its `items` enter in the given order
type RevealKind = "label" | "heading" | "text" | "media" | "side";

type RevealTarget =
  | { selector: string; kind: RevealKind }
  | {
      selector: string;
      kind: "group";
      items: { selector: string; kind: RevealKind }[];
    };

// Every block that reveals on scroll, in one place. Each is observed on its
// own, so a block only animates when it is actually reached. When targets
// are nested, only the outermost one is used.
const REVEAL_TARGETS: RevealTarget[] = [
  // Case-study media: carries most of the movement
  {
    selector: ".case-study__video, .case-study__design-figure, .ghost-frame",
    kind: "side",
  },

  // Work carousel enters as one block
  { selector: ".work-carousel", kind: "media" },

  // Labels / eyebrows
  {
    selector:
      ".case-study__eyebrow, .case-study__label, .home-work__header, .awakening-loop__name",
    kind: "label",
  },

  // Section headings (page titles animate on load instead)
  {
    selector: [
      ".case-study__section-heading h2:not(.case-study__label)",
      ".about-section__heading h2",
      ".contact-cta h2",
      ".home-contact__title",
    ].join(", "),
    kind: "heading",
  },

  // Paragraphs, rows and other content groups
  {
    selector: [
      ".work-page__text",
      ".about-hero__statement",
      ".about-text > p",
      ".about-area",
      ".contact-hero__intro",
      ".home-contact__intro",
      ".contact-links li",
      ".case-study__intro",
      ".case-study__disclaimer",
      ".case-study__overview-item",
      ".case-study__section-heading > p:not(.case-study__label)",
      ".case-study__large-text",
      ".case-study__process-item",
      ".case-study__improvement",
      ".case-study__next",
      ".ghost-body",
      ".ghost-meta__item",
      ".ghost-contribution__group",
      ".ghost-workflow__step",
      ".awakening-credit",
      ".awakening-test__step",
      ".awakening-scope__column",
      ".awakening-future",
      ".awakening-continue",
      ".vision-role",
    ].join(", "),
    kind: "text",
  },

  // Media and calls to action
  {
    selector: [
      ".ghost-hero__actions",
      ".about-cta",
      ".contact-cta > div",
      ".home-contact__cta",
    ].join(", "),
    kind: "media",
  },
];

const STAGGER_MS = 100;
// Blocks entering together never wait longer than this many steps
const MAX_STAGGER_STEPS = 5;

function byDocumentOrder(a: Element, b: Element) {
  return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING
    ? -1
    : 1;
}

function tagTargets(root: HTMLElement) {
  for (const target of REVEAL_TARGETS) {
    root.querySelectorAll<HTMLElement>(target.selector).forEach((element) => {
      if (element.dataset.reveal) {
        return;
      }

      element.dataset.reveal = target.kind;

      if (target.kind === "group") {
        target.items.forEach((item, order) => {
          element
            .querySelectorAll<HTMLElement>(item.selector)
            .forEach((child) => {
              child.dataset.revealItem = item.kind;
              child.style.setProperty("--reveal-order", String(order));
            });
        });
      }
    });
  }

  // Side entrances alternate: first from the left, then the right, …
  root
    .querySelectorAll<HTMLElement>('[data-reveal="side"]')
    .forEach((element, index) => {
      element.dataset.revealFrom = index % 2 === 0 ? "left" : "right";
    });

  // Outermost wins: a target inside another target enters with its parent
  root
    .querySelectorAll<HTMLElement>("[data-reveal] [data-reveal]")
    .forEach((nested) => {
      delete nested.dataset.reveal;
    });
}

// Reveals the given blocks in page order, staggered
function reveal(elements: Element[]) {
  [...elements].sort(byDocumentOrder).forEach((element, index) => {
    const el = element as HTMLElement;
    const step = Math.min(index, MAX_STAGGER_STEPS);

    el.style.setProperty("--reveal-delay", `${step * STAGGER_MS}ms`);
    el.dataset.revealed = "";
  });
}

// Tags reveal blocks inside `rootRef` before first paint, then reveals each
// once it reaches ~82% of the viewport height. Re-runs when `pageKey` (the
// route) changes.
export function useScrollReveal(
  rootRef: RefObject<HTMLElement | null>,
  pageKey: string,
) {
  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    tagTargets(root);

    // Everything still waiting, including blocks tagged by an earlier run of
    // this effect (e.g. StrictMode's mount → unmount → mount)
    const pending = () => [
      ...root.querySelectorAll<HTMLElement>(
        "[data-reveal]:not([data-revealed])",
      ),
    ];

    if (!("IntersectionObserver" in window)) {
      reveal(pending());

      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target);

        entering.forEach((element) => observer.unobserve(element));
        reveal(entering);
      },
      { rootMargin: "0px 0px -18% 0px" },
    );

    pending().forEach((element) => observer.observe(element));

    // Blocks near the very end may never reach the trigger line because the
    // page cannot scroll further; reveal them once the footer is in view
    const footer = document.querySelector(".site-footer");
    const endObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const rest = pending();

          rest.forEach((element) => observer.unobserve(element));
          reveal(rest);
        }
      },
      { threshold: 0.95 },
    );

    if (footer) {
      endObserver.observe(footer);
    }

    return () => {
      observer.disconnect();
      endObserver.disconnect();
    };
  }, [rootRef, pageKey]);
}
