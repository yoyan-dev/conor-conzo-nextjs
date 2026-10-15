"use client";
import { Accordion } from "@heroui/react/accordion";
import type { FaqItem } from "@/types/coaching";
import styles from "@/app/assets/css/sections/faq-section.module.css";
export function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  return (
    <Accordion allowsMultipleExpanded className={styles.accordion}>
      {items.map((item, index) => (
        <Accordion.Item
          key={item.question}
          id={`faq-question-${index + 1}`}
          className={styles.item}
        >
          <Accordion.Heading>
            <Accordion.Trigger className={styles.trigger}>
              {item.question}
              <span className={styles.indicator} aria-hidden="true" />
            </Accordion.Trigger>
          </Accordion.Heading>
          <Accordion.Panel>
            <Accordion.Body className={styles.answer}>
              {item.answer}
            </Accordion.Body>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
