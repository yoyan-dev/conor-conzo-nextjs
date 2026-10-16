import { faqs } from "@/content/coach";
import { SectionHeading } from "@/components/ui/section-heading";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { ActionLink } from "@/components/ui/action-link";
import styles from "@/app/assets/css/sections/faq-section.module.css";
export function FaqSection() {
  return (
    <section
      id="faq"
      tabIndex={-1}
      aria-labelledby="faq-heading"
      className="section"
    >
      <div className={`page-container ${styles.layout}`}>
        <div>
          <SectionHeading eyebrow="FAQ" id="faq-heading">
            Good question.
          </SectionHeading>
          <p className={styles.description}>
            Didn’t find your answer? Send me a message and I’ll point you in the
            right direction.
          </p>
          <ActionLink href="#contact" variant="text">
            Ask me anything
          </ActionLink>
        </div>
        <FaqAccordion items={faqs} />
      </div>
    </section>
  );
}
