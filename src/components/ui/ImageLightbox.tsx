import { useEffect, useState } from "react";

type ImageLightboxProps = {
  src: string;
  alt: string;
};

function ImageLightbox({ src, alt }: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        className="image-lightbox__trigger"
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`Enlarge ${alt}`}
      >
        <img src={src} alt={alt} />

        <span className="image-lightbox__zoom" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div
          className="image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setIsOpen(false)}
        >
          <button
            className="image-lightbox__close"
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close enlarged image"
          >
            ×
          </button>

          <img
            className="image-lightbox__image"
            src={src}
            alt={alt}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

export default ImageLightbox;
