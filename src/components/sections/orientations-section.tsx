"use client";
import { RadioGroup } from "@heroui/react/radio-group";
import { orientations } from "@/content/coach";
import { useCoachingSelection } from "@/components/coaching/coaching-selection";
import { OrientationOption } from "@/components/coaching/orientation-option";
import { ActionLink } from "@/components/ui/action-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { isSessionType } from "@/content/sessions";
import styles from "./orientations-section.module.css";
export function OrientationsSection() {
  const { sessionType, onSessionChange } = useCoachingSelection();
  const selected = orientations.find((item) => item.id === sessionType);
  return (
    <section
      id="orientations"
      tabIndex={-1}
      aria-labelledby="orientations-heading"
      className="section surface-section"
    >
      <div className="page-container">
        <SectionHeading eyebrow="Orientations" id="orientations-heading">
          Pick your level.
        </SectionHeading>
        <p className="section-description">
          Each session is hands on, personalised, and with someone who wants to
          see you succeed.
        </p>
        <RadioGroup
          aria-label="Choose your orientation level"
          value={selected?.id ?? ""}
          onChange={(value) => {
            if (isSessionType(value)) onSessionChange(value);
          }}
          className={styles.options}
        >
          {orientations.map((orientation) => (
            <OrientationOption key={orientation.id} orientation={orientation} />
          ))}
        </RadioGroup>
        <div className={styles.action}>
          <ActionLink
            href="#book"
            variant="secondary"
            onPress={() => {
              if (!selected) onSessionChange("starter");
            }}
          >
            Book an orientation <span aria-hidden="true">↗</span>
          </ActionLink>
          <p className="microcopy">
            {selected
              ? `${selected.title} selected. Your choice carries into the form below.`
              : "Choose a session. We’ll start where you are."}
          </p>
        </div>
      </div>
    </section>
  );
}
