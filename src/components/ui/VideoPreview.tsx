import { useEffect, useRef, useState } from "react";
import { useAccessibility } from "../../features/accessibility/useAccessibility";

type VideoPreviewProps = {
  src: string;
  title: string;
  allowZoom?: boolean;
};

function VideoPreview({ src, title, allowZoom = false }: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const { pauseVideo } = useAccessibility();

  const [isMuted, setIsMuted] = useState(true);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const isPaused = pauseVideo || isManuallyPaused;

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (isPaused) {
      video.pause();
      return;
    }

    video.play().catch(() => {
      // Autoplay can occasionally be blocked by the browser.
    });
  }, [isPaused]);

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsExpanded(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isExpanded]);

  const togglePlayback = () => {
    if (pauseVideo) {
      return;
    }

    setIsManuallyPaused((current) => !current);
  };

  const toggleSound = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const nextMutedState = !video.muted;

    video.muted = nextMutedState;
    setIsMuted(nextMutedState);
  };

  const toggleExpanded = () => {
    setIsExpanded((current) => !current);
  };

  return (
    <div
      className={`video-preview ${isExpanded ? "video-preview--expanded" : ""}`}
    >
      <video
        ref={videoRef}
        data-ambient-video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={title}
      />

      <div className="video-preview__controls">
        <button
          className="video-preview__control"
          type="button"
          onClick={togglePlayback}
          disabled={pauseVideo}
          aria-label={isPaused ? "Play video" : "Pause video"}
          title={
            pauseVideo
              ? "Video paused in accessibility settings"
              : isPaused
                ? "Play video"
                : "Pause video"
          }
        >
          {isPaused ? (
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M8 5v14l11-7L8 5Z" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M7 5h4v14H7V5Zm6 0h4v14h-4V5Z" fill="currentColor" />
            </svg>
          )}
        </button>

        <button
          className="video-preview__control"
          type="button"
          onClick={toggleSound}
          aria-label={isMuted ? "Turn sound on" : "Mute video"}
          title={isMuted ? "Turn sound on" : "Mute video"}
        >
          {isMuted ? (
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M11 5 6.5 9H3v6h3.5L11 19V5Zm5.5 4.5 4 5m0-5-4 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M11 5 6.5 9H3v6h3.5L11 19V5Zm4 3.5c1.6 1.7 1.6 5.3 0 7m2.5-9.5c3 3.2 3 8.8 0 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>

        {allowZoom && (
          <button
            className="video-preview__control"
            type="button"
            onClick={toggleExpanded}
            aria-label={isExpanded ? "Close expanded video" : "Expand video"}
            title={isExpanded ? "Close expanded video" : "Expand video"}
            aria-pressed={isExpanded}
          >
            {isExpanded ? (
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                aria-hidden="true"
              >
                <path
                  d="M9 4v5H4m11-5v5h5M9 20v-5H4m11 5v-5h5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                aria-hidden="true"
              >
                <path
                  d="M4 9V4h5m11 5V4h-5M4 15v5h5m11-5v5h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default VideoPreview;
