"use client";
import { createContext, use } from "react";
import type { SessionType } from "@/types/coaching";
type CoachingSelection = {
  sessionType: SessionType;
  onSessionChange: (value: SessionType) => void;
};
export const CoachingSelectionContext = createContext<CoachingSelection | null>(
  null,
);
export function useCoachingSelection() {
  const selection = use(CoachingSelectionContext);
  if (!selection)
    throw new Error("Coaching controls must be inside CoachingFlow.");
  return selection;
}
