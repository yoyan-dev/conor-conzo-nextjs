import type { Testimonial } from "@/types/coaching";
import { RatingStars } from "@/components/ui/rating-stars";
import { styles } from "@/components/sections/testimonials/testimonials-styles";

type TestimonialBoardProps = {
  reviews: readonly Testimonial[];
};

export function TestimonialBoard({ reviews }: TestimonialBoardProps) {
  const hasReviews = reviews.length > 0;
  const ratings = reviews.flatMap((review) =>
    review.rating === undefined ? [] : [review.rating],
  );
  const hasRatings = ratings.length > 0;
  const average = hasRatings
    ? ratings.reduce<number>((sum, rating) => sum + rating, 0) / ratings.length
    : null;
  const distribution = [5, 4, 3, 2, 1]
    .map((rating) => ({
      rating,
      count: ratings.filter((value) => value === rating).length,
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
                rating={
                  Math.round(average) as NonNullable<Testimonial["rating"]>
                }
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
          {hasReviews && ratings.length !== reviews.length && (
            <span className={styles.scoreLabel}>
              {ratings.length} {ratings.length === 1 ? "rating" : "ratings"}
            </span>
          )}
        </div>
        <div className={styles.distribution}>
          {hasRatings ? (
            distribution.map(({ rating, count }) => {
              const percent = (count / ratings.length) * 100;
              return (
                <div className={styles.ratingRow} key={rating}>
                  <span>{rating}</span>
                  <div
                    className={styles.track}
                    role="img"
                    aria-label={`${count} of ${ratings.length} reviews rated ${rating} out of 5`}
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
              <th scope="col">Type</th>
              <th scope="col">Rating</th>
              <th scope="col">Comment</th>
            </tr>
          </thead>
          <tbody>
            {hasReviews ? (
              reviews.map((review, index) => (
                <tr key={`${review.name}-${index}`}>
                  <th scope="row">{review.name}</th>
                  <td data-label="Type">{review.type || "—"}</td>
                  <td data-label="Rating">
                    {review.rating === undefined ? (
                      "Not rated"
                    ) : (
                      <RatingStars rating={review.rating} />
                    )}
                  </td>
                  <td data-label="Comment" className={styles.comment}>
                    {review.quote}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className={styles.emptyTable}>
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
