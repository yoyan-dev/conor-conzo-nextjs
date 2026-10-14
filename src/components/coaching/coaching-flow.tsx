"use client";
import { useState, type ReactNode } from "react";
import { CoachingSelectionContext } from "@/components/coaching/coaching-selection";
import { OrientationsSection } from "@/components/sections/orientations-section";
import { BookingSection } from "@/components/sections/booking-section";
import type { SessionType } from "@/types/coaching";
export function CoachingFlow({
  children,
  bookingIntroduction,
}: {
  children: ReactNode;
  bookingIntroduction: ReactNode;
}) {
  const [sessionType, setSessionType] = useState<SessionType>("discovery-call");
  return (
    <CoachingSelectionContext
      value={{ sessionType, onSessionChange: setSessionType }}
    >
      {children}
      <OrientationsSection />
      <BookingSection introduction={bookingIntroduction} />
    </CoachingSelectionContext>
  );
}
