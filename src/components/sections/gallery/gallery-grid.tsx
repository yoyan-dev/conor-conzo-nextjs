import Image from "next/image";
import type { GalleryPhoto } from "@/content/gallery";
import { GalleryImageButton, GalleryLightbox } from "./gallery-lightbox";
import { styles } from "@/components/sections/gallery/gallery-styles";

export function GalleryGrid({ photos }: { photos: readonly GalleryPhoto[] }) {
  return (
    <GalleryLightbox photos={photos}>
      <ul className={styles.grid} data-scroll-reveal-group="">
        {photos.map((photo, index) => (
          <li key={photo.id} className={styles.frame}>
            <GalleryImageButton index={index} alt={photo.alt}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                quality={90}
                sizes="(min-width: 82rem) 350px, (min-width: 64rem) 30vw, (min-width: 36rem) 46vw, 92vw"
                className={styles.image}
                style={{ objectPosition: photo.position }}
              />
            </GalleryImageButton>
          </li>
        ))}
      </ul>
    </GalleryLightbox>
  );
}
