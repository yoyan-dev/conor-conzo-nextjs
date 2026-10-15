import { SectionHeading } from "@/components/ui/section-heading";
import styles from "@/app/assets/css/sections/booking-section.module.css";
export function BookingIntroduction() {
  return (
    <div className={styles.introduction}>
      <SectionHeading eyebrow="Book a call" id="booking-heading">
        Let’s figure out
        <br />
        your next move.
      </SectionHeading>
      <p className={styles.description}>
        Free. 30 minutes. No sales pressure. Just an honest conversation about
        where you are, what you want to achieve, and whether training together
        makes sense.
      </p>
      <ul className={styles.benefits}>
        <li>
          <span aria-hidden="true">✓</span> Free 30-minute discovery call
        </li>
        <li>
          <span aria-hidden="true">✓</span> No pitch. No pressure. No awkward
          sales talk.
        </li>
        <li>
          <span aria-hidden="true">✓</span> Leave with a clear next step
        </li>
      </ul>
      <div className={styles.coachNote}>
        <span className="eyebrow">A little reassurance</span>
        <p>
          You don’t need to have it all figured out. We start where you are,
          work at your pace, and build from there.
        </p>
        <span className={styles.signature}>Coach Conzo</span>
      </div>
    </div>
  );
}
