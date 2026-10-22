"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Pagination } from "@heroui/react/pagination";
import { styles } from "./testimonials-styles";

const REVIEWS_PER_PAGE = 5;

type TestimonialPaginationProps = {
  // Review rows are rendered by the server and passed through this client boundary.
  rows: readonly ReactNode[];
};

export function TestimonialPagination({ rows }: TestimonialPaginationProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const resultsId = useId();
  const resultsRef = useRef<HTMLDivElement>(null);
  const pageCount = Math.max(1, Math.ceil(rows.length / REVIEWS_PER_PAGE));
  const page = Math.min(pageIndex, pageCount - 1);
  const previousPage = useRef(page);
  const start = page * REVIEWS_PER_PAGE;
  const end = Math.min(start + REVIEWS_PER_PAGE, rows.length);

  useEffect(() => {
    if (previousPage.current === page) return;
    previousPage.current = page;
    // A shorter page must not leave visitors below the reviews or on a disabled button.
    resultsRef.current?.focus({ preventScroll: true });
    resultsRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
  }, [page]);

  function changePage(nextPage: number) {
    setPageIndex(Math.max(0, Math.min(nextPage, pageCount - 1)));
  }

  return (
    <>
      <div
        ref={resultsRef}
        id={resultsId}
        role="region"
        aria-label="Client testimonial results"
        tabIndex={-1}
        className={`${styles.tableFrame} ${styles.results}`}
      >
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
            {rows.length > 0 ? (
              rows.slice(start, end)
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
      {pageCount > 1 && (
        <Pagination
          aria-label="Testimonial pagination"
          className={styles.pagination}
        >
          <Pagination.Summary
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className={styles.paginationSummary}
          >
            Showing {start + 1}–{end} of {rows.length} reviews · Page {page + 1}{" "}
            of {pageCount}
          </Pagination.Summary>
          <Pagination.Content className={styles.paginationControls}>
            <Pagination.Item>
              <Pagination.Previous
                type="button"
                aria-controls={resultsId}
                isDisabled={page === 0}
                onPress={() => changePage(page - 1)}
                className={styles.paginationButton}
              >
                <Pagination.PreviousIcon className={styles.paginationIcon} />
                Previous
              </Pagination.Previous>
            </Pagination.Item>
            <Pagination.Item>
              <Pagination.Next
                type="button"
                aria-controls={resultsId}
                isDisabled={page === pageCount - 1}
                onPress={() => changePage(page + 1)}
                className={styles.paginationButton}
              >
                Next
                <Pagination.NextIcon className={styles.paginationIcon} />
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      )}
    </>
  );
}
