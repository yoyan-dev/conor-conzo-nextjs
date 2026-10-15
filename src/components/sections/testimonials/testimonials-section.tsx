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
      className="section surface-section"
    >
      <div className="page-container">
        <TestimonialBoard reviews={reviews} />
      </div>
    </section>
  );
}
