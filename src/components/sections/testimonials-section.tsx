import { testimonials } from "@/content/coach";
import type { Testimonial } from "@/types/coaching";
import { SectionHeading } from "@/components/ui/section-heading";
import { RatingStars } from "@/components/ui/rating-stars";
import styles from "./testimonials-section.module.css";
export function TestimonialsSection({
  reviews = testimonials,
}: {
  reviews?: readonly Testimonial[];
}) {
  if (!reviews.length) return null;
  return (
    <section
      id="reviews"
      tabIndex={-1}
      aria-labelledby="reviews-heading"
      className="section surface-section"
    >
      <div className="page-container">
        <SectionHeading eyebrow="Testimonials" id="reviews-heading">
          The results speak loud.
        </SectionHeading>
        <div className={styles.reviews}>
          {reviews.map((review, index) => (
            <figure key={`${review.name}-${index}`} className={styles.review}>
              <figcaption>
                <strong>{review.name}</strong>
                <RatingStars rating={review.rating} />
              </figcaption>
              <blockquote>
                <p>{review.quote}</p>
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
