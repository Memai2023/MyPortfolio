export type Project = {
  id: string;
  title: string;
  year: string;
  image: string | null;
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: "the-awakening",
    title: "The Awakening",
    year: "2026",
    image: null,
    featured: true,
  },
  {
    id: "aura-beauty",
    title: "Aura Beauty",
    year: "2026",
    image: null,
    featured: true,
  },
  {
    id: "lost-little-ghost",
    title: "Lost Little Ghost",
    year: "2026",
    image: null,
    featured: true,
  },
];
