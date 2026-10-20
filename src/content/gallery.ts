import portrait from "../../public/images/coach-conzo.png";
import type { StaticImageData } from "next/image";
import { orientationImages } from "./card-images";
import poster from "../../public/images/coaching/coach-feedback-poster.png";
import strength from "../../public/images/coaching/coach-strength.jpg";
import rooftop from "../../public/images/coaching/rooftop-moment.png";
import collaboration from "../../public/images/coaching/gym-collaboration.jpeg";

export type GalleryPhoto = {
  id: string;
  src: StaticImageData;
  alt: string;
  position: string;
};

export const HOME_GALLERY_LIMIT = 8;

const galleryCandidates = [
  {
    id: "strength",
    src: strength,
    alt: "Coach Conzo looking over his shoulder in gym clothes",
    position: "50% 45%",
  },
  {
    id: "rooftop",
    src: rooftop,
    alt: "Two people striking a playful lifting pose on a rooftop terrace",
    position: "50% 50%",
  },
  {
    id: "gym-collaboration",
    src: collaboration,
    alt: "Two people sharing a playful lifting pose in the gym",
    position: "50% 40%",
  },
  {
    id: "feedback-poster",
    src: poster,
    alt: "A playful before-and-after Coach Conzo poster showing thumbs down before working out and thumbs up afterwards",
    position: "50% 50%",
  },
] as const satisfies readonly GalleryPhoto[];

// Reserve images used in the hero and orientation cards so they cannot also
// appear in either gallery when the orientation images change.
const sectionImageSources = new Set([
  portrait.src,
  ...Object.values(orientationImages).map((photo) => photo.src.src),
]);

export const galleryPhotos = galleryCandidates.filter(
  (photo) => !sectionImageSources.has(photo.src.src),
);

export const homeGalleryPhotos = galleryPhotos.slice(0, HOME_GALLERY_LIMIT);
