import { sharedStyles } from "@/components/ui/shared-styles";
import type { ReactNode } from "react";
import { BookingForm } from "@/components/forms/booking-form";
import { styles } from "@/components/sections/booking/booking-styles";
export function BookingSection({ introduction }: { introduction: ReactNode }) {
  return (
    <section
      id="book"
      tabIndex={-1}
      aria-labelledby="booking-heading"
      className={sharedStyles["section"]}
    >
      <div className={`${sharedStyles["page-container"]} ${styles.layout}`}>
        {introduction}
        <BookingForm />
      </div>
    </section>
  );
}
