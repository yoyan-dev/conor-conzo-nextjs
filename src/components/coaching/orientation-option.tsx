"use client";
import { Radio } from "@heroui/react/radio";
import type { Orientation } from "@/types/coaching";
import styles from "@/app/assets/css/sections/orientations-section.module.css";
export function OrientationOption({
  orientation,
}: {
  orientation: Orientation;
}) {
  return (
    <Radio
      value={orientation.id}
      className={styles.option}
      aria-label={`${orientation.level}: ${orientation.title}`}
    >
      <Radio.Content className={styles.optionContent}>
        {({ isSelected }) => (
          <>
            <span className={styles.optionTop}>
              <span className="eyebrow">{orientation.level}</span>
              <Radio.Control className={styles.control}>
                <Radio.Indicator />
              </Radio.Control>
            </span>
            <span className={styles.title}>{orientation.title}</span>
            <span className={styles.duration}>
              {orientation.duration
                ? `${orientation.duration} minutes`
                : "A focused next-phase review"}
            </span>
            <span className={styles.description}>
              {orientation.description}
            </span>
            <span className={styles.selection} aria-hidden="true">
              {isSelected ? "Selected" : "Select session"}
              <span>{isSelected ? "✓" : "↗"}</span>
            </span>
          </>
        )}
      </Radio.Content>
    </Radio>
  );
}
