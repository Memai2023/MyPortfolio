import { useRef, useState } from "react";

type VideoPreviewProps = {
  src: string;
  title: string;
};

function VideoPreview({ src, title }: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

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

      <button
        className="video-preview__sound"
        type="button"
        onClick={toggleSound}
        aria-label={isMuted ? "Turn sound on" : "Mute video"}
      >
        <span aria-hidden="true">
          {isMuted ? (
            <svg viewBox="0 0 24 24" width="20" height="20">
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
            <svg viewBox="0 0 24 24" width="20" height="20">
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
        </span>
      </button>
    </div>
  );
}

export default VideoPreview;
