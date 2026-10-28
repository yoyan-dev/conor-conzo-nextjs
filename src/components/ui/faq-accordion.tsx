"use client";
import { Accordion } from "@heroui/react/accordion";
import type { FaqItem } from "@/types/coaching";
type FaqAccordionClassNames = {
  accordion: string;
  item: string;
  trigger: string;
  indicator: string;
  answer: string;
};

export function FaqAccordion({
  items,
  classNames: styles,
}: {
  items: readonly FaqItem[];
  classNames: FaqAccordionClassNames;
}) {
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
