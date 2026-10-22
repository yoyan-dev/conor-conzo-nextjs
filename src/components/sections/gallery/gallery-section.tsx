import { sharedStyles } from "@/components/ui/shared-styles";
import Link from "next/link";
import { galleryPhotos, homeGalleryPhotos } from "@/content/gallery";
import { SectionHeading } from "@/components/ui/section-heading";
import { GalleryGrid } from "./gallery-grid";
import { styles } from "@/components/sections/gallery/gallery-styles";

export function GallerySection() {
  return (
    <section
      id="gallery"
      tabIndex={-1}
      aria-labelledby="gallery-heading"
      className={sharedStyles["section"]}
    >
      <div className={sharedStyles["page-container"]}>
        <SectionHeading eyebrow="Coach Conzo" id="gallery-heading">
          Gallery.
        </SectionHeading>
        <GalleryGrid photos={homeGalleryPhotos} />
        {galleryPhotos.length > homeGalleryPhotos.length && (
          <div className={styles.actions}>
            <Link
              href="/gallery"
              className={[
                sharedStyles["action-link"],
                sharedStyles["action-link--secondary"],
              ].join(" ")}
            >
              View full gallery
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
