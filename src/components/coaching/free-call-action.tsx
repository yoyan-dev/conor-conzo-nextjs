"use client";
import type { ReactNode } from "react";
import { ActionLink } from "@/components/ui/action-link";
import { useCoachingSelection } from "@/components/coaching/coaching-selection";

export function FreeCallAction({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { onSessionChange } = useCoachingSelection();
  return (
    <ActionLink
      href="#book"
      className={className}
      onPress={() => onSessionChange("discovery-call")}
    >
      {children}
    </ActionLink>
  );
}
