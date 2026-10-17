import type { FormMode } from "@/types/forms";
import { coach } from "@/content/coach";
import { SectionHeading } from "@/components/ui/section-heading";
import { SocialIcon } from "@/components/ui/social-icon";
import { ContactForm } from "@/components/forms/contact-form";
import styles from "@/app/assets/css/sections/contact-section.module.css";
export function ContactSection({ mode }: { mode: FormMode }) {
  return (
    <section
      id="contact"
      tabIndex={-1}
      aria-labelledby="contact-heading"
      className="section surface-section"
    >
      <div className="page-container">
        <SectionHeading eyebrow="Find me" id="contact-heading">
          Social & contact.
        </SectionHeading>
        <div className={styles.layout} data-scroll-reveal-group="">
          <div>
            <p className="eyebrow">Around the internet</p>
            <div className={styles.socials}>
              {coach.socials.map((social) => (
                <a
                  href={social.href}
                  key={social.name}
                  className={styles.social}
                >
                  <span className={styles.icon} aria-hidden="true">
                    <SocialIcon platform={social.name} />
                  </span>
                  <span>
                    <strong>{social.name}</strong>
                    <span className={styles.handle}>{social.handle}</span>
                  </span>
                </a>
              ))}
            </div>
            <div className={styles.details}>
              <div>
                <span className="eyebrow">Email</span>
                <a href={`mailto:${coach.email}`}>{coach.email}</a>
              </div>
              <div>
                <span className="eyebrow">Location</span>
                <p>Online / Worldwide</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className={styles.formTitle}>Drop a quick message.</h3>
            <p className={styles.formIntro}>
              Questions, goals, or a collaboration idea? Start here.
            </p>
            <ContactForm mode={mode} />
          </div>
        </div>
      </div>
    </section>
  );
}
