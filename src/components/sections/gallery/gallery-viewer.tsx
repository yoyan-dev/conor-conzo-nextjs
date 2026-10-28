"use client";
import Image from "next/image";
import { Button } from "@heroui/react/button";
import { Modal } from "@heroui/react/modal";
import { useState } from "react";
import type { GalleryPhoto } from "@/content/gallery";
import { styles } from "./gallery-lightbox-styles";

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

export function GalleryViewer({
  photo,
  activeIndex,
  photoCount,
  isOpen,
  setIsOpen,
  move,
}: {
  photo: GalleryPhoto;
  activeIndex: number;
  photoCount: number;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  move: (direction: number) => void;
}) {
  return (
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
              isDisabled={photoCount < 2}
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
              Photo {activeIndex + 1} of {photoCount}
            </p>
            <Button
              variant="ghost"
              isIconOnly
              aria-label="Next photo"
              isDisabled={photoCount < 2}
              onPress={() => move(1)}
              className={styles.control}
            >
              <ArrowIcon />
            </Button>
          </div>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}
