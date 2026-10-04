import { useEffect, useRef, useState } from "react";
import { useAccessibility } from "../../features/accessibility/useAccessibility";

type VideoPreviewProps = {
  src: string;
  title: string;
  allowZoom?: boolean;
  // "auto": plays on load (default). "on-demand": paused until `active`
  // (hover/focus, decided by the parent) or the play button.
  playback?: "auto" | "on-demand";
  active?: boolean;
  // On-demand only: forces the video paused (e.g. its carousel slide is no
  // longer shown); also cancels a "play" the user chose
  forcePause?: boolean;
};

type PlaybackIntent = "none" | "play" | "pause";

function VideoPreview({
  src,
  title,
  allowZoom = false,
  playback = "auto",
  active = false,
  forcePause = false,
}: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const { pauseVideo } = useAccessibility();

  const [isMuted, setIsMuted] = useState(true);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const onDemand = playback === "on-demand";

  // On-demand only: an explicit play/pause from the controls
  const [intent, setIntent] = useState<PlaybackIntent>("none");
  const [wasActive, setWasActive] = useState(active);
  const [wasForced, setWasForced] = useState(forcePause);

  // A pause chosen while hovering only lasts until the pointer/focus leaves
  if (active !== wasActive) {
    setWasActive(active);

    if (!active && intent === "pause") {
      setIntent("none");
    }
  }

  if (forcePause !== wasForced) {
    setWasForced(forcePause);

    if (forcePause && intent !== "none") {
      setIntent("none");
    }
  }

  const isPaused = onDemand
    ? pauseVideo ||
      forcePause ||
      !(intent === "play" || (intent === "none" && (active || isExpanded)))
    : pauseVideo || isManuallyPaused;

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

    if (onDemand) {
      setIntent(isPaused ? "play" : "pause");

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
        // "#t=0.1" makes paused on-demand previews show a frame, not black
        src={onDemand ? `${src}#t=0.1` : src}
        autoPlay={!onDemand}
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
