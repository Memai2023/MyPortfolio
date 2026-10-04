import type { CSSProperties } from "react";

// The single source of truth for the Home Selected Work scene. HomeWorkScene
// writes these as CSS custom properties on the section (read by the
// cinematic rules in global.css), and useBendScene uses them for the WebGL
// planes — so the DOM cards and the bent media always follow the same path.
export const SCENE = {
  // Phases, as fractions of --stick (0 → 1 across the pinned range)
  arriveEnd: 0.12, // A: the scene rises into view
  carouselStart: 0.12, // B: project to project …
  carouselEnd: 0.78, // … until the last one is centred
  dissolveEnd: 0.88, // C: side projects drift out and fade
  // D (expansion) runs from dissolveEnd to 1

  // Scroll length: per project transition, plus room for arrival/finale
  scrollPerProject: "70svh",
  scrollExtra: "90svh",

  // Cards
  cardWidthVw: 64,
  cardGapVw: 4,
  mediaAspect: 9 / 16,
  sideScaleDrop: 0.12, // outer cards: scale 1 - 0.12
  pathDepthPx: 60, // U-shaped path: outer cards sit this much lower
  arriveRisePx: 90, // the row rises this much on arrival
  arriveOpacity: 0.35, // row opacity before arrival
  dissolveDriftVw: 14, // side cards drift outward during the dissolve
  mediaOpacityDrop: 0.4,
  metaOpacityDrop: 0.7,
  rotateYDeg: 9,
  rotateZDeg: 1.2,
  perspectivePx: 1400, // CSS perspective() and the WebGL focal length

  // Finale: the last project grows by this fraction (64vw → 80vw)
  expandGrowth: 0.25,
} as const;

// Derived: lift the row by half the final project's growth so it stays centred
export const EXPAND_LIFT_VW =
  (SCENE.expandGrowth * SCENE.cardWidthVw * SCENE.mediaAspect) / 2;

// Derived: the meta row follows the bottom edge of the growing media
export const EXPAND_META_SHIFT_VW =
  SCENE.expandGrowth * SCENE.cardWidthVw * SCENE.mediaAspect;

// The same values as CSS custom properties, set inline on the section
export function sceneCssVariables(projectCount: number): CSSProperties {
  return {
    "--hw-count": projectCount,
    "--hw-arrive-end": SCENE.arriveEnd,
    "--hw-carousel-start": SCENE.carouselStart,
    "--hw-carousel-span": SCENE.carouselEnd - SCENE.carouselStart,
    "--hw-dissolve-start": SCENE.carouselEnd,
    "--hw-dissolve-span": SCENE.dissolveEnd - SCENE.carouselEnd,
    "--hw-expand-start": SCENE.dissolveEnd,
    "--hw-expand-span": 1 - SCENE.dissolveEnd,
    "--hw-scroll-per-project": SCENE.scrollPerProject,
    "--hw-scroll-extra": SCENE.scrollExtra,
    "--hw-card-w": `${SCENE.cardWidthVw}vw`,
    "--hw-card-gap": `${SCENE.cardGapVw}vw`,
    "--hw-side-scale-drop": SCENE.sideScaleDrop,
    "--hw-path-depth": `${SCENE.pathDepthPx}px`,
    "--hw-arrive-rise": `${SCENE.arriveRisePx}px`,
    "--hw-arrive-opacity": SCENE.arriveOpacity,
    "--hw-dissolve-drift": `${SCENE.dissolveDriftVw}vw`,
    "--hw-media-opacity-drop": SCENE.mediaOpacityDrop,
    "--hw-meta-opacity-drop": SCENE.metaOpacityDrop,
    "--hw-rotate-y": `${SCENE.rotateYDeg}deg`,
    "--hw-rotate-z": `${SCENE.rotateZDeg}deg`,
    "--hw-perspective": `${SCENE.perspectivePx}px`,
    "--hw-expand-growth": SCENE.expandGrowth,
    "--hw-expand-lift": `${EXPAND_LIFT_VW}vw`,
    "--hw-expand-meta-shift": `${EXPAND_META_SHIFT_VW}vw`,
  } as CSSProperties;
}
