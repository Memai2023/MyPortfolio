// Geometry for the Home line-wave background. Pure functions: HomeWaves
// measures the page and passes the layout in.
//
// Each wave group is one base curve with many thin lines offset along its
// normal. The offset is multiplied by a "twist" that swings through zero,
// so the bundle narrows to a single line and flips over — it reads as a
// ribbon of lines rotating in 3D. A spacing function fans the bundle out.
// Every bundle ends by leaving the screen or fading out, never by running
// on into the next section.

export type Box = { top: number; bottom: number; left: number; right: number };

export type WaveLayout = {
  width: number; // full-bleed layer width
  height: number; // Home page height
  viewport: number; // viewport height
  contentLeft: number;
  contentRight: number;
  heroTitle: Box;
  heroActions: Box;
  hero: Box;
  work: Box;
  aboutSections: Box[];
  contact: Box;
};

export type WaveMode = "desktop" | "tablet" | "phone";

// Each line belongs to one of three idle-motion layers: the middle half of
// the bundle ("inner") and its two outer quarters ("upper" / "lower" on
// either side of the base curve). Drifting the two outer layers against
// each other widens and narrows the bundle, so its shape changes.
export type WaveLine = {
  d: string;
  tone: 1 | 2 | 3 | 4;
  strength: number;
  layer: "inner" | "upper" | "lower";
};

// A small abstract bloom that grows in and fades out as it passes the
// middle of the viewport. `at` is the group's --sp at that moment and
// `window` the --sp distance over which it fades in (and out again).
export type WaveAccent = {
  x: number;
  y: number; // in the group's own coordinates
  size: number;
  path: string; // drawn in a −1…1 box
  at: number;
  window: number;
};

export type WaveGroup = {
  id: "hero" | "work" | "about";
  top: number; // region in page coordinates (the group's own box)
  height: number;
  lines: WaveLine[];
  // soft blurred band behind the bundle: the base curve and its width
  halo: { d: string; width: number };
  // the point the idle motion turns and stretches around (a twist)
  pivot: { x: number; y: number };
  // vertical strength envelope inside the group: [offset 0–1, strength]
  envelope: [number, number][];
  accents: WaveAccent[];
};

type Point = { x: number; y: number };

// Catmull-Rom through the anchors, sampled into `samples` points in total
function spline(anchors: Point[], samples: number): Point[] {
  const points: Point[] = [];
  const segments = anchors.length - 1;
  const perSegment = Math.max(4, Math.round(samples / segments));

  for (let i = 0; i < segments; i++) {
    const p0 = anchors[Math.max(0, i - 1)];
    const p1 = anchors[i];
    const p2 = anchors[i + 1];
    const p3 = anchors[Math.min(anchors.length - 1, i + 2)];

    for (let s = i === 0 ? 0 : 1; s <= perSegment; s++) {
      const t = s / perSegment;
      const t2 = t * t;
      const t3 = t2 * t;
      const f = (a: number, b: number, c: number, d: number) =>
        0.5 *
        (2 * b +
          (-a + c) * t +
          (2 * a - 5 * b + 4 * c - d) * t2 +
          (-a + 3 * b - 3 * c + d) * t3);

      points.push({
        x: f(p0.x, p1.x, p2.x, p3.x),
        y: f(p0.y, p1.y, p2.y, p3.y),
      });
    }
  }

  return points;
}

const pathOf = (points: Point[], originY: number) =>
  points
    .map(
      (point, k) =>
        `${k === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${(point.y - originY).toFixed(1)}`,
    )
    .join(" ");

// A bundle of `count` lines around `base`. `spacing(s)` is the distance
// between neighbouring lines and `twist(s)` (−1…1) scales it, both at
// s = 0…1 along the curve. Coordinates are shifted up by `originY`.
function bundle(
  base: Point[],
  count: number,
  spacing: (s: number) => number,
  twist: (s: number) => number,
  originY: number,
  strength = 1,
): WaveLine[] {
  const middle = (count - 1) / 2;
  const normals = base.map((_, k) => {
    const a = base[Math.max(0, k - 1)];
    const b = base[Math.min(base.length - 1, k + 1)];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const length = Math.hypot(dx, dy) || 1;

    return { x: -dy / length, y: dx / length };
  });

  const lines: WaveLine[] = [];

  for (let i = 0; i < count; i++) {
    const points = base.map((point, k) => {
      const s = k / (base.length - 1);
      const offset = (i - middle) * spacing(s) * twist(s);

      return {
        x: point.x + normals[k].x * offset,
        y: point.y + normals[k].y * offset,
      };
    });

    // outer lines a little fainter: secondary strength ≈ 0.5
    const edge = middle === 0 ? 0 : Math.abs(i - middle) / middle;

    lines.push({
      d: pathOf(points, originY),
      tone: ((i % 4) + 1) as WaveLine["tone"],
      strength: strength * (1 - 0.5 * edge),
      layer: edge < 0.5 ? "inner" : i < middle ? "upper" : "lower",
    });
  }

  return lines;
}

// --- accents: thin-stroked abstract shapes in a −1…1 box ---

const polar = (radius: number, angle: number) =>
  `${(radius * Math.cos(angle)).toFixed(3)} ${(radius * Math.sin(angle)).toFixed(3)}`;

// eight rays, alternately long and short, around an open centre
function starburst(): string {
  const rays: string[] = [];

  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
    const length = i % 2 === 0 ? 1 : 0.55;

    rays.push(`M ${polar(0.16, angle)} L ${polar(length, angle)}`);
  }

  return rays.join(" ");
}

// five narrow petal loops
function bloom(): string {
  const petals: string[] = [];

  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;

    petals.push(
      `M 0 0 Q ${polar(0.75, angle - 0.32)} ${polar(1, angle)} Q ${polar(0.75, angle + 0.32)} 0 0`,
    );
  }

  return petals.join(" ");
}

// three stems that fork once near their tips
function spark(): string {
  const stems: string[] = [];

  for (let i = 0; i < 3; i++) {
    const angle = (i / 3) * Math.PI * 2 - Math.PI / 2;

    stems.push(
      `M ${polar(0.12, angle)} L ${polar(1, angle)}`,
      `M ${polar(0.6, angle)} L ${polar(0.88, angle - 0.45)}`,
      `M ${polar(0.45, angle)} L ${polar(0.7, angle + 0.5)}`,
    );
  }

  return stems.join(" ");
}

const SHAPES = [starburst(), bloom(), spark()];

// An accent beside `point`, nudged `offset` px along the curve's normal
function accent(
  base: Point[],
  s: number,
  offset: number,
  shape: number,
  size: number,
  group: { top: number; height: number },
  vh: number,
  // hero accents are on screen from the start, so they peak after this
  // much scrolling (in viewport heights) instead of when centred
  peakAfter?: number,
  // otherwise it peaks when at this height in the viewport (0 top, 1 bottom)
  viewportY = 0.5,
): WaveAccent {
  const k = Math.round(s * (base.length - 1));
  const a = base[Math.max(0, k - 1)];
  const b = base[Math.min(base.length - 1, k + 1)];
  const length = Math.hypot(b.x - a.x, b.y - a.y) || 1;
  const x = base[k].x + (-(b.y - a.y) / length) * offset;
  const y = base[k].y + ((b.x - a.x) / length) * offset - group.top;

  // --sp = (scroll into the page + vh − group top) / (vh + h); a point is
  // at viewportY after scrolling group top + y − vh·viewportY
  const scroll =
    peakAfter === undefined ? group.top + y - vh * viewportY : peakAfter * vh;

  return {
    x,
    y,
    size,
    path: SHAPES[shape % SHAPES.length],
    at: (scroll + vh - group.top) / (vh + group.height),
    window: (vh * (peakAfter === undefined ? 0.4 : 0.2)) / (vh + group.height),
  };
}

// index along the base curve nearest to `target`, as s = 0…1
function nearest(base: Point[], target: Point): number {
  let best = 0;

  base.forEach((point, k) => {
    if (
      Math.hypot(point.x - target.x, point.y - target.y) <
      Math.hypot(base[best].x - target.x, base[best].y - target.y)
    ) {
      best = k;
    }
  });

  return best / (base.length - 1);
}

const smoothstep = (a: number, b: number, v: number) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));

  return t * t * (3 - 2 * t);
};

export function buildWaves(layout: WaveLayout, mode: WaveMode): WaveGroup[] {
  const { width: W, viewport: vh } = layout;
  const about = layout.aboutSections;
  const firstAbout = about[0] ?? layout.contact;
  const contact = layout.contact;
  const titleMid = (layout.heroTitle.top + layout.heroTitle.bottom) / 2;
  const actionsBottom = layout.heroActions.bottom;
  const leftLane = Math.max(layout.contentLeft * 0.45, 8);
  const rightLane = Math.min(W - (W - layout.contentRight) * 0.45, W - 8);
  const desktop = mode === "desktop";

  const lineCount = desktop
    ? { hero: 26, work: 22, about: 14 }
    : mode === "tablet"
      ? { hero: 14, work: 12, about: 9 }
      : { hero: 8, work: 7, about: 6 };
  // accents: a few on desktop, one per group on tablet, none on phones
  const accents = desktop ? 2 : mode === "tablet" ? 1 : 0;
  const accentSize = desktop ? 20 : 15;
  const scale = desktop ? 1 : mode === "tablet" ? 0.8 : 0.65;

  // ---------- Hero: a broad wave under the call-to-action that rises
  //            into the empty right half and leaves the screen there ----------
  const heroTop = 0;
  const heroBase = desktop
    ? spline(
        [
          { x: -0.1 * W, y: actionsBottom + vh * 0.12 },
          { x: 0.3 * W, y: actionsBottom + vh * 0.2 },
          { x: 0.7 * W, y: titleMid + vh * 0.12 },
          { x: 0.9 * W, y: layout.heroTitle.top - vh * 0.02 },
          { x: 1.12 * W, y: layout.heroTitle.top + vh * 0.06 },
        ],
        260,
      )
    : spline(
        [
          { x: -0.1 * W, y: actionsBottom + vh * 0.1 },
          { x: 0.45 * W, y: actionsBottom + vh * 0.2 },
          { x: 1.12 * W, y: actionsBottom + vh * 0.06 },
        ],
        120,
      );
  const heroBottom = Math.max(...heroBase.map((point) => point.y)) + vh * 0.15;
  const heroBox = { top: heroTop, height: heroBottom - heroTop };
  // fuller in the middle: lines pack closer where the bundle turns
  const heroSpacing = (s: number) =>
    5 * scale * (0.65 + 0.9 * s) * (1 - 0.3 * Math.sin(Math.PI * s));
  const heroTwist = (s: number) => Math.cos(Math.PI * 2.2 * s + 0.4);
  const hero: WaveGroup = {
    id: "hero",
    ...heroBox,
    lines: bundle(heroBase, lineCount.hero, heroSpacing, heroTwist, heroTop),
    // turns around the twist right of the title
    pivot: {
      x: heroBase[Math.round(0.62 * (heroBase.length - 1))].x,
      y: heroBase[Math.round(0.62 * (heroBase.length - 1))].y - heroTop,
    },
    halo: {
      d: pathOf(heroBase, heroTop),
      width: heroSpacing(0.5) * lineCount.hero * 0.7,
    },
    envelope: [
      [0, 1],
      [0.8, 1],
      [1, 0],
    ],
    // where the bundle narrows (twist ≈ 0): s ≈ 0.17 and 0.62
    // where the bundle narrows or turns; they bloom one after another over
    // the first half-screen of scrolling
    accents: [
      // two in the open right half are already there on the first screen
      accent(heroBase, 0.62, 26, 1, accentSize + 2, heroBox, vh, -0.02),
      accent(heroBase, 0.74, -24, 0, accentSize - 2, heroBox, vh, -0.02),
      // two more bloom under the call to action as the page scrolls
      accent(heroBase, 0.17, -22, 0, accentSize, heroBox, vh, 0.42),
      accent(heroBase, 0.38, 24, 2, accentSize - 3, heroBox, vh, 0.28),
    ].slice(0, desktop ? 4 : accents),
  };

  // ---------- Selected Work: a tall vertical wave, twisting several
  //            times, fading out before the section ends ----------
  const workTop = layout.work.top - vh * 0.1;
  const workBottom = layout.work.bottom - vh * 0.15;
  const workHeight = workBottom - workTop;
  const workBox = { top: workTop, height: workHeight };
  const workBase: Point[] = [];
  const workSamples = desktop ? 260 : 120;
  const sway = desktop ? 0.3 : 0.28;
  const turns = desktop ? 1.25 : 0.75;

  for (let k = 0; k <= workSamples; k++) {
    const t = k / workSamples;

    workBase.push({
      x: W * (0.6 + sway * Math.sin(Math.PI * 2 * turns * t + 0.6)),
      y: workTop + workHeight * t,
    });
  }

  const workSpacing = (t: number) =>
    13 * scale * (0.7 + 0.6 * Math.sin(Math.PI * t));
  const work: WaveGroup = {
    id: "work",
    ...workBox,
    lines: bundle(
      workBase,
      lineCount.work,
      workSpacing,
      (t) => Math.cos(Math.PI * 2 * (desktop ? 2.5 : 1.25) * t),
      workTop,
    ),
    pivot: { x: W * 0.6, y: workHeight / 2 },
    halo: {
      d: pathOf(workBase, workTop),
      width: workSpacing(0.5) * lineCount.work * 0.6,
    },
    envelope: [
      [0, 0],
      [0.1, 1],
      [0.8, 1],
      [1, 0],
    ],
    // where the wave enters above the section heading, then at its outer
    // right swing just above the side project; further down the projects
    // cover the background
    accents: [
      // peaks high in the viewport, after the hero accents have gone
      accent(workBase, 0.03, 0, 2, accentSize, workBox, vh, undefined, 0.2),
      accent(
        workBase,
        0.124,
        34,
        1,
        accentSize - 3,
        workBox,
        vh,
        undefined,
        0.3,
      ),
    ].slice(0, accents),
  };

  // ---------- About: opens wide after Work, sweeps through the margins
  //            and the gaps between blocks, then leaves the screen;
  //            Contact keeps two faint sweeps in its left margin ----------
  const aboutTop = layout.work.bottom - vh * 0.25;
  const aboutBottom = contact.bottom;
  const aboutBox = { top: aboutTop, height: aboutBottom - aboutTop };
  const gapOne = (about[1] ?? firstAbout).top;
  const gapTwo = (about[3] ?? about[about.length - 1] ?? firstAbout).top;
  const aboutBase = desktop
    ? spline(
        [
          { x: 0.15 * W, y: aboutTop + vh * 0.05 },
          { x: leftLane, y: firstAbout.top + vh * 0.25 },
          { x: leftLane, y: gapOne - vh * 0.12 },
          { x: 0.5 * W, y: gapOne },
          { x: rightLane, y: gapOne + vh * 0.12 },
          { x: rightLane, y: gapTwo - vh * 0.12 },
          { x: 0.6 * W, y: gapTwo },
          { x: -0.12 * W, y: gapTwo + vh * 0.08 },
        ],
        300,
      )
    : spline(
        [
          { x: -0.1 * W, y: aboutTop + vh * 0.05 },
          { x: 0.5 * W, y: aboutTop + vh * 0.16 },
          { x: 1.12 * W, y: firstAbout.top - vh * 0.02 },
        ],
        100,
      );
  const aboutSpacing = (s: number) =>
    6 * scale * (1 + 2.2 * (1 - smoothstep(0, 0.15, s)));
  const contactHeight = contact.bottom - contact.top;
  const contactBase = spline(
    [
      { x: -0.06 * W, y: contact.top - vh * 0.1 },
      { x: leftLane, y: contact.top + contactHeight * 0.4 },
      { x: -0.04 * W, y: contact.bottom - vh * 0.05 },
    ],
    60,
  );
  const contactStart = (contact.top - vh * 0.1 - aboutTop) / aboutBox.height;
  const aboutGroup: WaveGroup = {
    id: "about",
    ...aboutBox,
    lines: [
      ...bundle(
        aboutBase,
        lineCount.about,
        aboutSpacing,
        (s) => Math.cos(Math.PI * 1.5 * s + 0.2),
        aboutTop,
      ),
      ...bundle(
        contactBase,
        2,
        () => 9 * scale,
        () => 1,
        aboutTop,
        0.6,
      ),
    ],
    pivot: { x: W * 0.5, y: gapOne - aboutTop },
    halo: {
      d: pathOf(aboutBase, aboutTop),
      width: aboutSpacing(0.5) * lineCount.about * 0.6,
    },
    envelope: [
      [0, 0.8],
      [Math.max(0.05, contactStart - 0.05), 0.62],
      [Math.max(0.06, contactStart), 0.5],
      [0.9, 0.45],
      [1, 0],
    ],
    // in the gaps between About blocks, where the bundle crosses over
    accents: desktop
      ? [
          accent(
            aboutBase,
            nearest(aboutBase, { x: 0.5 * W, y: gapOne }),
            0,
            1,
            accentSize,
            aboutBox,
            vh,
          ),
          accent(
            aboutBase,
            nearest(aboutBase, { x: 0.6 * W, y: gapTwo }),
            0,
            0,
            accentSize - 2,
            aboutBox,
            vh,
          ),
          // in the right margin between the two crossings
          accent(
            aboutBase,
            nearest(aboutBase, { x: rightLane, y: (gapOne + gapTwo) / 2 }),
            0,
            2,
            accentSize - 4,
            aboutBox,
            vh,
          ),
        ]
      : [accent(aboutBase, 0.5, 18, 1, accentSize, aboutBox, vh)].slice(
          0,
          accents,
        ),
  };

  return [hero, work, aboutGroup];
}
