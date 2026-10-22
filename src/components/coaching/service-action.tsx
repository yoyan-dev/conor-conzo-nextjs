"use client";
import { sharedStyles } from "@/components/ui/shared-styles";
import { ActionLink } from "@/components/ui/action-link";
import { useCoachingSelection } from "@/components/coaching/coaching-selection";
import type { ServiceId } from "@/types/coaching";
export function ServiceAction({
  serviceId,
  title,
}: {
  serviceId: ServiceId;
  title: string;
}) {
  const { onSessionChange } = useCoachingSelection();
  const isCollaboration = serviceId === "collaborations";
  return (
    <ActionLink
      href={isCollaboration ? "#contact" : "#book"}
      variant="text"
      className={sharedStyles["service-action"]}
      onPress={() => {
        if (!isCollaboration) onSessionChange(serviceId);
      }}
    >
      {isCollaboration
        ? "Discuss a collaboration"
        : `Ask about ${title.toLowerCase()}`}
    </ActionLink>
  );
}
