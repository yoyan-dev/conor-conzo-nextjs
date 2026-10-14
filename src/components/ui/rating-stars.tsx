export function RatingStars({ rating }: { rating: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <span
      className="rating-stars"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      <span aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <span
            key={index}
            className={index < rating ? "" : "rating-star-empty"}
          >
            ★
          </span>
        ))}
      </span>
    </span>
  );
}
