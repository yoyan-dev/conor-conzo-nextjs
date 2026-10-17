import type { ReactNode } from "react";
import type { FormMode } from "@/types/forms";
import { BookingForm } from "@/components/forms/booking-form";
import styles from "@/app/assets/css/sections/booking-section.module.css";
export function BookingSection({
  introduction,
  mode,
}: {
  introduction: ReactNode;
  mode: FormMode;
}) {
  return (
    <section
      id="book"
      tabIndex={-1}
      aria-labelledby="booking-heading"
      className="section"
    >
      <div className={`page-container ${styles.layout}`}>
        {introduction}
        <BookingForm mode={mode} />
      </div>
    </section>
  );
}
