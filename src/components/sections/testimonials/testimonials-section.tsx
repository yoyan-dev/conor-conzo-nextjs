import { sharedStyles } from "@/components/ui/shared-styles";
import { testimonials } from "@/content/coach";
import type { Testimonial } from "@/types/coaching";
import { TestimonialBoard } from "./testimonial-board";

export function TestimonialsSection({
  reviews = testimonials,
}: {
  reviews?: readonly Testimonial[];
}) {
  if (reviews.length === 0) return null;
  return (
    <section
      id="reviews"
      tabIndex={-1}
      aria-labelledby="reviews-heading"
      className={[
        sharedStyles["section"],
        sharedStyles["surface-section"],
      ].join(" ")}
    >
      <div className={sharedStyles["page-container"]}>
        <TestimonialBoard reviews={reviews} />
      </div>
    </section>
  );
}
