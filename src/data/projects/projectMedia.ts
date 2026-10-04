import sellpyPreview from "../../assets/videos/sellpy/sellpy-preview.mp4";
import auraBeautyPreview from "../../assets/videos/aura-beauty/aura-beauty-preview.mp4";
import lostLittleGhostPreview from "../../assets/videos/lost-little-ghost/lost-little-ghost-preview.mp4";
import visionAiShortfilm from "../../assets/videos/vision-ai/vision-ai-shortfilm.mp4";

// Preview video per project id; projects without one use their image
export const projectPreviewVideos: Record<string, string> = {
  "sellpy-redesign": sellpyPreview,
  "aura-beauty": auraBeautyPreview,
  "lost-little-ghost": lostLittleGhostPreview,
  "vision-ai": visionAiShortfilm,
};

// YouTube trailer per project id, shown (on request) over the project's
// cover image, which stays as poster and fallback. DOM previews only: Home's
// WebGL scene keeps drawing the cover.
export const projectYouTubeTrailers: Record<string, string> = {
  "the-awakening": "PD4baLfQS5o",
};

// Projects whose preview may open in the expanded video view
export const zoomableProjects = new Set([
  "sellpy-redesign",
  "aura-beauty",
  "vision-ai",
]);
