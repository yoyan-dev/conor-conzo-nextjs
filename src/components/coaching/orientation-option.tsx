"use client";
import { sharedStyles } from "@/components/ui/shared-styles";
import Image from "next/image";
import { orientationImages } from "@/content/card-images";
import { Radio } from "@heroui/react/radio";
import type { Orientation } from "@/types/coaching";
import { styles } from "@/components/sections/orientations/orientations-styles";
export function OrientationOption({
  orientation,
}: {
  orientation: Orientation;
}) {
  const photo = orientationImages[orientation.id];
  return (
    <Radio
      value={orientation.id}
      className={styles.option}
      aria-label={`${orientation.level}: ${orientation.title}`}
    >
      <Radio.Content className={styles.optionContent}>
        {() => (
          <>
            <span className={styles.imageFrame} aria-hidden="true">
              <Image
                src={photo.src}
                alt=""
                fill
                quality={90}
                sizes="(min-width: 82rem) 337px, (min-width: 48rem) 27vw, 88vw"
                className={styles.image}
                style={{ objectPosition: photo.position }}
              />
            </span>
            <span className={styles.optionTop}>
              <span className={sharedStyles["eyebrow"]}>
                {orientation.level}
              </span>
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
          </>
        )}
      </Radio.Content>
    </Radio>
  );
}
