import Image from "next/image";
import portrait from "../../../public/images/coach-conzo.png";
import { coach } from "@/content/coach";
import { ActionLink } from "@/components/ui/action-link";
import styles from "./hero-section.module.css";
export function HeroSection() {
  return (
    <section className={styles.hero} aria-label="Meet Coach Conzo">
      <div className={`page-container ${styles.inner}`}>
        <div className={styles.portrait}>
          <div className={styles.glow} aria-hidden="true" />
          <Image
            src={portrait}
            alt="Coach Conzo smiling with both thumbs up"
            preload
            sizes="(min-width: 64rem) 460px, (min-width: 48rem) 40vw, 75vw"
            className={styles.image}
          />
        </div>
        <div className={styles.content}>
          <p className={styles.name}>
            Coach Conzo
            <span className={styles.nameDot} aria-hidden="true">
              .
            </span>
          </p>
          <p className={styles.introduction}>{coach.introduction}</p>
          <h1 className={styles.headline}>
            {coach.headline.map((line, index) => (
              <span
                key={line}
                className={index === 1 ? styles.accent : undefined}
              >
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
            <ActionLink href="#about" variant="secondary">
              See coaching options
            </ActionLink>
            <ActionLink href="#book">
              Book a free call <span aria-hidden="true">↗</span>
            </ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
