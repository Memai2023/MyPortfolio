import { useEffect, useRef, useState } from "react";
import { useAccessibility } from "../../features/accessibility/AccessibilityProvider";

type VideoPreviewProps = {
  src: string;
  title: string;
};

function VideoPreview({ src, title }: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const { pauseVideo } = useAccessibility();

  const [isMuted, setIsMuted] = useState(true);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);

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

  return (
    <div className="video-preview">
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
      </div>
    </div>
  );
}

export default VideoPreview;
