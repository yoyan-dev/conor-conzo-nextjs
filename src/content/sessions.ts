import type { SessionType } from "@/types/coaching";
export const sessionOptions: readonly { id: SessionType; label: string }[] = [
  { id: "discovery-call", label: "Free discovery call (30 min)" },
  { id: "starter", label: "Starter: Personal Training (60 min)" },
  { id: "intermediate", label: "Build Your Program (90 min)" },
  { id: "advanced", label: "Level Up & Lock In" },
  { id: "personal-training", label: "1-on-1 Personal Training" },
  { id: "online-coaching", label: "Online Coaching" },
  { id: "group-orientations", label: "Group Orientations" },
  { id: "collaborations", label: "Content & Collaborations" },
];
export function isSessionType(value: string): value is SessionType {
  return sessionOptions.some((option) => option.id === value);
}
