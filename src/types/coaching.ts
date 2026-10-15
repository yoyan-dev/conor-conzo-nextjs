export type ServiceId =
  | "personal-training"
  | "online-coaching"
  | "group-orientations"
  | "collaborations";
export type OrientationId = "starter" | "intermediate" | "advanced";
export type SessionType = "discovery-call" | ServiceId | OrientationId;
export type Service = {
  id: ServiceId;
  label: string;
  title: string;
  description: string;
};
export type Orientation = {
  id: OrientationId;
  level: string;
  title: string;
  duration: number | null;
  description: string;
};
export type FaqItem = { question: string; answer: string };
export type Testimonial = {
  name: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  type?: string;
  date?: string;
};
