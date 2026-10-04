import awakeningCover from "../../assets/images/projects/the-awakening/the-awakening-cover.png";

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
    image: awakeningCover,
    featured: true,
  },
  {
    id: "sellpy-redesign",
    title: "Sellpy Redesign",
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
  {
    id: "vision-ai",
    title: "Vision AI",
    year: "2026",
    image: null,
    featured: true,
  },
];
