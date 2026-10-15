"use client";
import { useState, type ReactNode } from "react";
import { CoachingSelectionContext } from "@/components/coaching/coaching-selection";
import type { SessionType } from "@/types/coaching";
export function CoachingFlow({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState({
    sessionType: "discovery-call" as SessionType,
    revision: 0,
  });
  function onSessionChange(sessionType: SessionType) {
    setSelection((current) => ({
      sessionType,
      revision: current.revision + 1,
    }));
  }
  return (
    <CoachingSelectionContext value={{ ...selection, onSessionChange }}>
      {children}
    </CoachingSelectionContext>
  );
}
