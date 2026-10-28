"use client";

import dynamic from "next/dynamic";
import { Button } from "@heroui/react/button";
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

// Load the viewer once on first use and keep it mounted for closing animations.
const GalleryViewer = dynamic(
  () => import("./gallery-viewer").then((module) => module.GalleryViewer),
  {
    ssr: false,
    loading: () => (
      <span className="sr-only" role="status">
        Opening image viewer…
      </span>
    ),
  },
);

const OpenGalleryContext = createContext<((index: number) => void) | null>(
  null,
);

export function GalleryLightbox({
  photos,
  children,
}: {
  photos: readonly GalleryPhoto[];
  children: ReactNode;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
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
    setHasOpened(true);
    setIsOpen(true);
  }

  return (
    <OpenGalleryContext value={open}>
      {children}
      {hasOpened && photo && (
        <GalleryViewer
          photo={photo}
          activeIndex={activeIndex}
          photoCount={photos.length}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          move={move}
        />
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
