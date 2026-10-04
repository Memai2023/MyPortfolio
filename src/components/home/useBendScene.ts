import { useEffect, useSyncExternalStore, type RefObject } from "react";

import {
  BendRenderer,
  type PlaneState,
} from "../../features/webgl/bendRenderer";
import { useReducedMotion } from "../../features/motion/useReducedMotion";
import { EXPAND_LIFT_VW, SCENE } from "./sceneConfig";

// WebGL only on wide screens with a real mouse; everything else keeps the
// CSS presentation (swipe row, static grid or CSS-perspective scene).
const WEBGL_QUERY = "(min-width: 901px) and (hover: hover) and (pointer: fine)";
const MAX_PIXEL_RATIO = 1.5;

// WebGL-only values (the shared scene values live in sceneConfig.ts)
const MAX_BEND = 0.55; // radians of arc at the outer positions (~31°)
const CORNER_RADIUS = 28; // --radius-xl

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

function subscribe(onChange: () => void) {
  const query = window.matchMedia(WEBGL_QUERY);

  query.addEventListener("change", onChange);

  return () => query.removeEventListener("change", onChange);
}

const getMatches = () => window.matchMedia(WEBGL_QUERY).matches;

type Layout = {
  stageWidth: number;
  stageHeight: number;
  cards: {
    cardCenterX: number;
    cardCenterY: number;
    mediaCenterX: number;
    mediaTop: number;
    mediaWidth: number;
    mediaHeight: number;
  }[];
};

// Layout position of `element` inside `ancestor`, ignoring CSS transforms.
// Walks the offsetParent chain (transformed cards become offset parents,
// so offsets cannot be assumed to be relative to the track).
function offsetWithin(element: HTMLElement, ancestor: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = element;

  while (node && node !== ancestor) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }

  return { x, y };
}

// Untransformed positions, relative to the stage
function measure(stage: HTMLElement, track: HTMLElement): Layout {
  const cards = [...track.querySelectorAll<HTMLElement>(".home-work__card")];

  return {
    stageWidth: stage.clientWidth,
    stageHeight: stage.clientHeight,
    cards: cards.map((card) => {
      const media = card.querySelector<HTMLElement>(".home-work__media")!;
      const cardBox = offsetWithin(card, stage);
      const mediaBox = offsetWithin(media, stage);

      return {
        cardCenterX: cardBox.x + card.offsetWidth / 2,
        cardCenterY: cardBox.y + card.offsetHeight / 2,
        mediaCenterX: mediaBox.x + media.offsetWidth / 2,
        mediaTop: mediaBox.y,
        mediaWidth: media.offsetWidth,
        mediaHeight: media.offsetHeight,
      };
    }),
  };
}

// The scroll → card math of the cinematic CSS, from the same SCENE values,
// producing one plane per project
function planesFor(stick: number, layout: Layout): PlaneState[] {
  const vw = window.innerWidth;
  const count = layout.cards.length;
  const tArrive = clamp(stick / SCENE.arriveEnd);
  const tDissolve = clamp(
    (stick - SCENE.carouselEnd) / (SCENE.dissolveEnd - SCENE.carouselEnd),
  );
  const tExpand = clamp((stick - SCENE.dissolveEnd) / (1 - SCENE.dissolveEnd));
  const active =
    clamp(
      (stick - SCENE.carouselStart) / (SCENE.carouselEnd - SCENE.carouselStart),
    ) *
    (count - 1);

  const trackX = (-active * (SCENE.cardWidthVw + SCENE.cardGapVw) * vw) / 100;
  const trackY =
    (1 - tArrive) * SCENE.arriveRisePx - (tExpand * EXPAND_LIFT_VW * vw) / 100;
  const trackOpacity =
    SCENE.arriveOpacity + (1 - SCENE.arriveOpacity) * tArrive;

  return layout.cards.map((card, index) => {
    const u = clamp(index - active, -1, 1);
    const d = Math.abs(u);
    const last = index === count - 1 ? 1 : 0;
    const sideFade = 1 - tDissolve * (1 - last);
    const cardScale = 1 - SCENE.sideScaleDrop * d;
    const cardX = (u * tDissolve * SCENE.dissolveDriftVw * vw) / 100;
    const cardY = d * d * SCENE.pathDepthPx;
    const expand = 1 + SCENE.expandGrowth * tExpand * last;

    // card transform (about its centre), then the track translate
    const mediaHeight = card.mediaHeight * cardScale;
    const mediaTopY =
      card.cardCenterY +
      (card.mediaTop - card.cardCenterY) * cardScale +
      cardY +
      trackY;
    const centerX =
      card.cardCenterX +
      (card.mediaCenterX - card.cardCenterX) * cardScale +
      cardX +
      trackX;

    // the final project grows from its top edge during the expansion
    const height = mediaHeight * expand;

    return {
      centerX,
      centerY: mediaTopY + height / 2,
      width: card.mediaWidth * cardScale * expand,
      height,
      bend: d * MAX_BEND,
      rotateY: (-u * SCENE.rotateYDeg * Math.PI) / 180,
      rotateZ: (u * SCENE.rotateZDeg * Math.PI) / 180,
      radius: CORNER_RADIUS * cardScale,
      opacity: (1 - SCENE.mediaOpacityDrop * d) * sideFade * trackOpacity,
    };
  });
}

type Refs = {
  sectionRef: RefObject<HTMLElement | null>;
  stageRef: RefObject<HTMLDivElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
};

// Renders the Selected Work media as bent WebGL planes when supported.
// Reads --stick from useScrollScene (no scroll listener of its own) and
// only renders while the scene is on screen and something has changed.
export function useBendScene({ sectionRef, stageRef, canvasRef }: Refs) {
  const reducedMotion = useReducedMotion();
  const capable = useSyncExternalStore(subscribe, getMatches);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const track = stage?.querySelector<HTMLElement>(".home-work__track");

    if (!capable || reducedMotion || !section || !stage || !canvas || !track) {
      return;
    }

    const renderer = BendRenderer.create(canvas, SCENE.perspectivePx);

    if (!renderer) {
      return; // CSS presentation stays in place
    }

    section.classList.add("home-work--webgl");

    // Non-null aliases for the hoisted loop functions below
    const gl: BendRenderer = renderer;
    const scene: HTMLElement = section;

    let layout: Layout | null = null;
    let lastStick = -1;
    let dirty = true;
    let frame = 0;
    let visible = false;
    // frames left before the loop sleeps; any change keeps it awake
    let awake = 0;
    const AWAKE_FRAMES = 30;
    const cleanups: (() => void)[] = [];

    const resize = () => {
      layout = measure(stage, track);
      renderer.setSize(
        layout.stageWidth,
        layout.stageHeight,
        Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO),
      );
      dirty = true;
      wake();
    };

    // Textures come from the DOM media, which stays in place (invisible)
    // so links, video controls and keyboard focus keep working
    const medias = [
      ...track.querySelectorAll<HTMLElement>(".home-work__media"),
    ];
    const videos: (HTMLVideoElement | null)[] = [];

    medias.forEach((media, index) => {
      const video = media.querySelector("video");
      const image = media.querySelector("img");

      videos[index] = video;

      if (video) {
        // paused videos are uploaded once per new frame, not every frame
        const refresh = () => {
          if (renderer.upload(index, video)) {
            dirty = true;
            wake();
          }
        };

        for (const type of ["loadeddata", "seeked", "pause", "playing"]) {
          video.addEventListener(type, refresh);
          cleanups.push(() => video.removeEventListener(type, refresh));
        }

        if (video.readyState >= 2) {
          refresh();
        }
      } else if (image) {
        const refresh = () => {
          if (renderer.upload(index, image)) {
            dirty = true;
            wake();
          }
        };

        if (image.complete) {
          refresh();
        } else {
          image.addEventListener("load", refresh, { once: true });
          cleanups.push(() => image.removeEventListener("load", refresh));
        }
      }
    });

    // function declarations: hoisted, so texture callbacks during setup can
    // safely call wake()
    function tick() {
      frame = 0;

      if (!visible || !layout) {
        return;
      }

      let playing = false;

      // a playing video needs its current frame on the texture
      videos.forEach((video, index) => {
        if (video && !video.paused && video.readyState >= 2) {
          gl.upload(index, video);
          dirty = true;
          playing = true;
        }
      });

      const stick = parseFloat(scene.style.getPropertyValue("--stick")) || 0;

      if (dirty || stick !== lastStick) {
        gl.render(planesFor(stick, layout));
        lastStick = stick;
        dirty = false;
        awake = AWAKE_FRAMES;
      }

      // Sleep when nothing changes; a scroll, resize, texture or playing
      // video wakes it again
      if (playing || --awake > 0) {
        frame = requestAnimationFrame(tick);
      }
    }

    function wake() {
      awake = AWAKE_FRAMES;

      if (visible && !frame) {
        frame = requestAnimationFrame(tick);
      }
    }

    // Only wakes the loop; scroll progress itself comes from --stick
    window.addEventListener("scroll", wake, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", wake));

    // The loop only runs while the scene is on screen
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;

      if (visible) {
        dirty = true;
        wake();
      }
    });

    const sizeObserver = new ResizeObserver(resize);

    // Fall back to the CSS scene if the GPU context is lost
    const onContextLost = (event: Event) => {
      event.preventDefault();
      section.classList.remove("home-work--webgl");
      visible = false;
    };

    canvas.addEventListener("webglcontextlost", onContextLost);
    resize();
    sizeObserver.observe(stage);
    sizeObserver.observe(track);
    visibility.observe(section);

    return () => {
      cancelAnimationFrame(frame);
      visibility.disconnect();
      sizeObserver.disconnect();
      canvas.removeEventListener("webglcontextlost", onContextLost);
      cleanups.forEach((cleanup) => cleanup());
      renderer.dispose();
      section.classList.remove("home-work--webgl");
    };
  }, [capable, reducedMotion, sectionRef, stageRef, canvasRef]);
}
