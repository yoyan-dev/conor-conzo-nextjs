import type { Testimonial } from "@/types/coaching";
import { RatingStars } from "@/components/ui/rating-stars";
import styles from "@/app/assets/css/sections/testimonials-section.module.css";

type TestimonialBoardProps = {
  reviews: readonly Testimonial[];
};

export function TestimonialBoard({ reviews }: TestimonialBoardProps) {
  const hasReviews = reviews.length > 0;
  const average = hasReviews
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : null;
  const distribution = [5, 4, 3, 2, 1]
    .map((rating) => ({
      rating,
      count: reviews.filter((review) => review.rating === rating).length,
    }))
    .filter(({ rating, count }) => rating >= 3 || count > 0);

  return (
    <div className={styles.board} data-scroll-reveal-group="">
      <div className={styles.introduction}>
        <p className={styles.eyebrow}>Testimonials</p>
        <h2 id="reviews-heading" className={styles.heading}>
          The results speak loud.
        </h2>
        <p className={styles.description}>
          {hasReviews
            ? "Feedback from coaching clients."
            : "Client feedback will appear here when it’s ready to share."}
        </p>
      </div>

      <div
        className={styles.ratingPanel}
        role="group"
        aria-label="Rating overview"
      >
        <div className={styles.score}>
          {average === null ? (
            <span className={styles.scoreValue}>
              —<span className={styles.visuallyHidden}>No rating yet</span>
            </span>
          ) : (
            <span className={styles.scoreValue}>
              {average.toFixed(1)}
              <span className={styles.visuallyHidden}> out of 5</span>
            </span>
          )}
          {average !== null && (
            <span aria-hidden="true">
              <RatingStars
                rating={Math.round(average) as Testimonial["rating"]}
              />
            </span>
          )}
          <span className={styles.scoreLabel}>Average rating</span>
          {hasReviews && (
            <span className={styles.scoreLabel}>
              {reviews.length} client{" "}
              {reviews.length === 1 ? "review" : "reviews"}
            </span>
          )}
        </div>
        <div className={styles.distribution}>
          {hasReviews ? (
            distribution.map(({ rating, count }) => {
              const percent = (count / reviews.length) * 100;
              return (
                <div className={styles.ratingRow} key={rating}>
                  <span>{rating}</span>
                  <div
                    className={styles.track}
                    role="img"
                    aria-label={`${count} of ${reviews.length} reviews rated ${rating} out of 5`}
                  >
                    <span
                      className={styles.fill}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span>{Math.round(percent)}%</span>
                </div>
              );
            })
          ) : (
            <>
              <span className={styles.visuallyHidden}>
                No ratings to display yet.
              </span>
              {[5, 4, 3].map((rating) => (
                <div
                  className={styles.ratingRow}
                  aria-hidden="true"
                  key={rating}
                >
                  <span>{rating}</span>
                  <div className={styles.track} />
                  <span>—</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      <div className={styles.tableFrame}>
        <table className={styles.table}>
          <caption className={styles.visuallyHidden}>
            Client testimonials
          </caption>
          <thead>
            <tr>
              <th scope="col">Client</th>
              <th scope="col">Rating</th>
              <th scope="col">Comment</th>
            </tr>
          </thead>
          <tbody>
            {hasReviews ? (
              reviews.map((review, index) => (
                <tr key={`${review.name}-${index}`}>
                  <th scope="row">
                    {review.name}
                    {review.type && (
                      <span className={styles.reviewType}>{review.type}</span>
                    )}
                  </th>
                  <td data-label="Rating">
                    <RatingStars rating={review.rating} />
                  </td>
                  <td data-label="Comment" className={styles.comment}>
                    {review.quote}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className={styles.emptyTable}>
                  No client reviews have been published yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
