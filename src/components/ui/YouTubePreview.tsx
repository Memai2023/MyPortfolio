import { useState } from "react";

type YouTubePreviewProps = {
  videoId: string;
  title: string;
  poster: string;
};

function YouTubePreview({ videoId, title, poster }: YouTubePreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <div className="youtube-preview">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      className="youtube-preview youtube-preview--poster"
      type="button"
      onClick={() => setIsPlaying(true)}
      aria-label={`Play ${title}`}
    >
      <img src={poster} alt="" />

      <span className="youtube-preview__overlay" aria-hidden="true">
        <span className="youtube-preview__play">▶</span>
      </span>
    </button>
  );
}

export default YouTubePreview;
