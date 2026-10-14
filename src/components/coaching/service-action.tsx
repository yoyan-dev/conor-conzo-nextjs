"use client";
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
  return (
    <ActionLink
      href="#book"
      variant="text"
      className="service-action"
      onPress={() => onSessionChange(serviceId)}
    >
      Ask about {title.toLowerCase()} <span aria-hidden="true">↗</span>
    </ActionLink>
  );
}
