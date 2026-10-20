import type { Metadata } from "next";
import Link from "next/link";
import { galleryPhotos } from "@/content/gallery";
import { GalleryGrid } from "@/components/sections/gallery/gallery-grid";
import { SiteFooter } from "@/components/layout/site-footer";
import { ScrollReveals } from "@/components/ui/scroll-reveals";
import { site } from "@/lib/site";
import styles from "@/app/assets/css/sections/gallery-section.module.css";

export const metadata: Metadata = {
  title: "Gallery | Coach Conzo",
  description: "Photos of Coach Conzo in the gym and beyond.",
  ...(site.url ? { alternates: { canonical: "/gallery" } } : {}),
  openGraph: {
    title: "Gallery | Coach Conzo",
    description: "Photos of Coach Conzo in the gym and beyond.",
    ...(site.url ? { url: `${site.url}/gallery` } : {}),
  },
};

export default function GalleryPage() {
  return (
    <>
      <header className="site-header">
        <div className="page-container header-inner">
          <Link href="/" className="wordmark" aria-label="Coach Conzo home">
            COACH <span>CONZO</span>
          </Link>
          <Link href="/#gallery" className={styles.backLink}>
            Back to home
          </Link>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        <ScrollReveals />
        <section className="section" aria-labelledby="gallery-heading">
          <div className="page-container">
            <p className="eyebrow">Coach Conzo</p>
            <h1 id="gallery-heading" className={styles.heading}>
              Gallery.
            </h1>
            <GalleryGrid photos={galleryPhotos} />
            <div className={styles.actions}>
              <Link
                href="/#contact"
                className="action-link action-link--secondary"
              >
                Contact Coach Conzo
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter homePath="/" />
    </>
  );
}
