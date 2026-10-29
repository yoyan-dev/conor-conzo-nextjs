import { SectionHeading } from "@/components/ui/section-heading";
import { styles } from "@/components/sections/booking/booking-styles";
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
        <li>
          <span aria-hidden="true">✓</span> Get an email confirmation with your
          call details
        </li>
      </ul>
      <div className={styles.coachNote}>
        <span>Real talk from Conzo</span>
        <p>
          &quot;I&apos;ve been doing this for nearly 16 years. I&apos;ve seen
          every level of fitness, every lifestyle, every excuse and I mean that
          with full love. The call is just a chat. Come as you are.&quot;
        </p>
      </div>
    </div>
  );
}
