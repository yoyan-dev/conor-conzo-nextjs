import Link from "next/link";
import { galleryPhotos, homeGalleryPhotos } from "@/content/gallery";
import { SectionHeading } from "@/components/ui/section-heading";
import { GalleryGrid } from "./gallery-grid";
import styles from "@/app/assets/css/sections/gallery-section.module.css";

export function GallerySection() {
  return (
    <section
      id="gallery"
      tabIndex={-1}
      aria-labelledby="gallery-heading"
      className="section"
    >
      <div className="page-container">
        <SectionHeading eyebrow="Coach Conzo" id="gallery-heading">
          Gallery.
        </SectionHeading>
        <GalleryGrid photos={homeGalleryPhotos} />
        {galleryPhotos.length > homeGalleryPhotos.length && (
          <div className={styles.actions}>
            <Link
              href="/gallery"
              className="action-link action-link--secondary"
            >
              View full gallery
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
