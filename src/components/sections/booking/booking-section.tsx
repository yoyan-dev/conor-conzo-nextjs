import { sharedStyles } from "@/components/ui/shared-styles";
import type { ReactNode } from "react";
import type { FormMode } from "@/types/forms";
import { BookingForm } from "@/components/forms/booking-form";
import { styles } from "@/components/sections/booking/booking-styles";
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
      className={sharedStyles["section"]}
    >
      <div className={`${sharedStyles["page-container"]} ${styles.layout}`}>
        {introduction}
        <BookingForm mode={mode} />
      </div>
    </section>
  );
}
