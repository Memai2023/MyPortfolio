import { useState } from "react";

type YouTubePreviewProps = {
  videoId: string;
  title: string;
  poster: string;
  // accessible name of the play button; defaults to "Play <title>"
  playLabel?: string;
  // shown over the poster when the video turns out to be unavailable
  unavailableLabel?: string;
};

type State = "poster" | "checking" | "playing" | "unavailable";

// YouTube serves a 120 × 90 placeholder thumbnail for videos that no longer
// exist; a real video has a larger one. Checking it is the only lightweight
// signal available in the browser (the player itself is cross-origin and
// reports nothing back). Gives up after a few seconds and lets the player
// try, so a slow network never blocks playback.
function videoLooksAvailable(videoId: string) {
  return new Promise<boolean>((resolve) => {
    const image = new Image();
    const timer = window.setTimeout(() => resolve(true), 4000);
    const done = (available: boolean) => {
      window.clearTimeout(timer);
      resolve(available);
    };

    image.onload = () => done(image.naturalWidth > 120);
    image.onerror = () => done(false);
    image.src = `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
  });
}

// A poster with a play button. Nothing loads from YouTube until it is
// pressed; only then is the player embedded (and starts, as requested).
// The poster stays underneath the player at all times, so the frame is
// never empty while it loads — or if YouTube cannot show the video.
function YouTubePreview({
  videoId,
  title,
  poster,
  playLabel,
  unavailableLabel = "Video unavailable",
}: YouTubePreviewProps) {
  const [state, setState] = useState<State>("poster");

  const play = async () => {
    setState("checking");
    setState((await videoLooksAvailable(videoId)) ? "playing" : "unavailable");
  };

  if (state === "playing") {
    return (
      <div className="youtube-preview">
        <img className="youtube-preview__poster" src={poster} alt="" />
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  if (state === "unavailable") {
    return (
      <div className="youtube-preview youtube-preview--poster">
        <img className="youtube-preview__poster" src={poster} alt="" />
        <p className="youtube-preview__notice" role="status">
          {unavailableLabel}
        </p>
      </div>
    );
  }

  return (
    <button
      className="youtube-preview youtube-preview--poster"
      type="button"
      onClick={play}
      aria-label={playLabel ?? `Play ${title}`}
      aria-busy={state === "checking" || undefined}
    >
      <img className="youtube-preview__poster" src={poster} alt="" />

      <span className="youtube-preview__overlay" aria-hidden="true">
        <span className="youtube-preview__play">▶</span>
      </span>
    </button>
  );
}

export default YouTubePreview;
