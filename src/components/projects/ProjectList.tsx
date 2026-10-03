import { Link } from "react-router-dom";

import sellpyPreview from "../../assets/videos/sellpy/sellpy-preview.mp4";
import auraBeautyPreview from "../../assets/videos/aura-beauty/aura-beauty-preview.mp4";
import lostLittleGhostPreview from "../../assets/videos/lost-little-ghost/lost-little-ghost-preview.mp4";

import VideoPreview from "../ui/VideoPreview";

import type { Project } from "../../data/projects/projects";

type ProjectListProps = {
  projects: Project[];
};

function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="featured-work__list">
      {projects.map((project, index) => {
        const isSellpy = project.id === "sellpy-redesign";
        const isAuraBeauty = project.id === "aura-beauty";
        const isLostLittleGhost = project.id === "lost-little-ghost";

        const videoSrc = isSellpy
          ? sellpyPreview
          : isAuraBeauty
            ? auraBeautyPreview
            : isLostLittleGhost
              ? lostLittleGhostPreview
              : null;

        return (
          <article className="project-preview" key={project.id}>
            <div className="project-preview__meta">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>{project.year}</span>
            </div>

            <Link
              className="project-preview__title-row"
              to={`/work/${project.id}`}
            >
              <h2>{project.title}</h2>
              <span aria-hidden="true">↗</span>
            </Link>

            {videoSrc ? (
              <div className="project-preview__visual">
                <VideoPreview
                  src={videoSrc}
                  title={`${project.title} preview`}
                  allowZoom={isSellpy || isAuraBeauty}
                />
              </div>
            ) : (
              <Link
                className="project-preview__visual"
                to={`/work/${project.id}`}
                aria-label={`View ${project.title}`}
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
          </article>
        );
      })}
    </div>
  );
}

export default ProjectList;
