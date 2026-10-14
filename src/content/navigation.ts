import { testimonials } from "@/content/coach";
export const navigationItems = [
  { id: "about", label: "Coaching" },
  { id: "orientations", label: "Orientations" },
  { id: "book", label: "Book a call" },
  ...(testimonials.length ? [{ id: "reviews", label: "Testimonials" }] : []),
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];
