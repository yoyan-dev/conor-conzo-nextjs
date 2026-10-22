import Image from "next/image";
import portrait from "../../../../public/images/hero/coach-conzo.png";
import { coach } from "@/content/coach";
import { ActionLink } from "@/components/ui/action-link";
import { FreeCallAction } from "@/components/coaching/free-call-action";
import { styles } from "@/components/sections/hero/hero-styles";

export function HeroSection() {
  const [firstLine, ...remainingLines] = coach.headline;
  const [accentWord, ...remainingWords] = firstLine.split(" ");

  return (
    <section className={styles.hero} aria-label="Meet Coach Conzo">
      <div className={styles.inner}>
        <div className={styles.stage}>
          <div className={styles.portrait}>
            <div className={styles.glow} aria-hidden="true" />
            <Image
              src={portrait}
              alt="Coach Conzo smiling with both thumbs up"
              preload
              sizes="(min-width: 1440px) 721px, (min-width: 64rem) 51vw, (min-width: 29rem) 352px, 76vw"
              className={styles.image}
            />
          </div>
          <div className={styles.content}>
            <p className={styles.name}>{coach.name}</p>
            <p className={styles.introduction}>{coach.introduction}</p>
            <h1 className={styles.headline}>
              <span className={styles.line}>
                <span className={styles.accent}>{accentWord}</span>{" "}
                {remainingWords.join(" ")}
              </span>
              {remainingLines.map((line) => (
                <span key={line} className={styles.line}>
                  {line}
                </span>
              ))}
            </h1>
            <ul className={styles.credentials}>
              <li>
                <strong>16 years</strong>
                <span>of fitness</span>
              </li>
              <li>
                <strong>Level 3</strong>
                <span>Personal Trainer</span>
              </li>
            </ul>
            <div className={styles.actions}>
              <FreeCallAction
                className={`${styles.action} ${styles.primaryAction}`}
              >
                Book a free call
              </FreeCallAction>
              <ActionLink
                href="#about"
                variant="secondary"
                className={`${styles.action} ${styles.secondaryAction}`}
              >
                See coaching options
              </ActionLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
