"use client";

import Image from "next/image";
import { Button } from "@heroui/react/button";
import { Modal } from "@heroui/react/modal";
import {
  createContext,
  use,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { GalleryPhoto } from "@/content/gallery";
import { styles as galleryStyles } from "@/components/sections/gallery/gallery-styles";
import { styles } from "@/components/sections/gallery/gallery-lightbox-styles";

const OpenGalleryContext = createContext<((index: number) => void) | null>(
  null,
);

function ArrowIcon({ previous = false }: { previous?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={previous ? "m14 6-6 6 6 6" : "m10 6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LightboxPhoto({ photo }: { photo: GalleryPhoto }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <figure className={styles.figure} aria-busy={!loaded && !failed}>
      <div className={styles.imageStage}>
        {!loaded && (
          <p className={styles.loading} role="status">
            {failed
              ? "This photo couldn’t load. Try another image."
              : "Loading photo…"}
          </p>
        )}
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          quality={90}
          loading="eager"
          sizes="(min-width: 82rem) 1216px, 94vw"
          className={styles.lightboxImage}
          data-loaded={loaded}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      </div>
    </figure>
  );
}

export function GalleryLightbox({
  photos,
  children,
}: {
  photos: readonly GalleryPhoto[];
  children: ReactNode;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const photo = photos[activeIndex];

  const move = useCallback(
    (direction: number) => {
      if (photos.length < 2) return;
      setActiveIndex(
        (current) => (current + direction + photos.length) % photos.length,
      );
    },
    [photos.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        move(event.key === "ArrowLeft" ? -1 : 1);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, move]);

  function open(index: number) {
    setActiveIndex(index);
    setIsOpen(true);
  }

  return (
    <OpenGalleryContext value={open}>
      {children}
      {photo && (
        <Modal.Backdrop
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          isDismissable
          className={styles.backdrop}
        >
          <Modal.Container placement="center" className={styles.container}>
            <Modal.Dialog
              aria-label="Gallery image viewer"
              className={styles.dialog}
            >
              <div className={styles.toolbar}>
                <Modal.Heading className={styles.title}>Gallery</Modal.Heading>
                <Modal.CloseTrigger
                  autoFocus
                  aria-label="Close image viewer"
                  className={styles.control}
                />
              </div>
              <LightboxPhoto key={photo.id} photo={photo} />
              <div className={styles.controls}>
                <Button
                  variant="ghost"
                  isIconOnly
                  aria-label="Previous photo"
                  isDisabled={photos.length < 2}
                  onPress={() => move(-1)}
                  className={styles.control}
                >
                  <ArrowIcon previous />
                </Button>
                <p
                  className={styles.counter}
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  Photo {activeIndex + 1} of {photos.length}
                </p>
                <Button
                  variant="ghost"
                  isIconOnly
                  aria-label="Next photo"
                  isDisabled={photos.length < 2}
                  onPress={() => move(1)}
                  className={styles.control}
                >
                  <ArrowIcon />
                </Button>
              </div>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      )}
    </OpenGalleryContext>
  );
}

export function GalleryImageButton({
  index,
  alt,
  children,
}: {
  index: number;
  alt: string;
  children: ReactNode;
}) {
  const open = use(OpenGalleryContext);
  if (!open)
    throw new Error("Gallery image controls must be inside GalleryLightbox.");

  return (
    <Button
      variant="ghost"
      className={galleryStyles.trigger}
      aria-label={`View photo ${index + 1}: ${alt}`}
      aria-haspopup="dialog"
      onPress={() => open(index)}
    >
      {children}
      <span className={galleryStyles.zoomHint} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle
            cx="10.5"
            cy="10.5"
            r="6.5"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="m16 16 4 4M7.5 10.5h6M10.5 7.5v6"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </Button>
  );
}
