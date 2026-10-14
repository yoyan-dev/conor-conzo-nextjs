import type { Service, Orientation, Testimonial } from "@/types/coaching";

export const coach = {
  name: "Coach Conzo",
  brand: "TRYHRD",
  email: "coachconzo@gmail.com",
  headline: ["Stronger bodies.", "No judgement.", "Fitness for life."],
  introduction:
    "Personal Trainer & Fitness Coach helping you build strength, confidence, and consistency without taking the fun out of fitness.",
  credentials: ["16 years of fitness", "Level 3 PT"],
  socials: [
    {
      name: "Instagram",
      handle: "@coachconzo",
      href: "https://www.instagram.com/coachconzo/",
    },
    {
      name: "TikTok",
      handle: "@conzo03",
      href: "https://www.tiktok.com/@conzo03",
    },
    {
      name: "YouTube",
      handle: "@conzo03",
      href: "https://www.youtube.com/@conzo03",
    },
  ],
} as const;

export const services = [
  {
    id: "personal-training",
    label: "1 on 1",
    title: "Personal Training",
    description:
      "Individualized programming, dedicated coaching, and accountability designed around your goals, lifestyle, and pace so every session has a purpose.",
  },
  {
    id: "online-coaching",
    label: "Online",
    title: "Online Coaching",
    description:
      "Can't make it to the gym with me? No problem. Your training still comes with a plan, coaching, accountability, and someone in your corner, just through your phone instead of across the gym floor.",
  },
  {
    id: "group-orientations",
    label: "Group",
    title: "Group Orientations",
    description:
      "New to the gym and not sure where to start? You're not the only one. We'll walk through the basics together, get you comfortable with the equipment, and make your first steps a whole lot easier.",
  },
  {
    id: "collaborations",
    label: "Content",
    title: "Fitness Content & Collabs",
    description:
      "Fitness doesn't have to be serious all the time. Collaborate with Conzo to create relatable, entertaining content that brings fitness, community, and personality together. Whether you're a brand, creator, or gym.",
  },
] as const satisfies readonly Service[];

export const orientations = [
  {
    id: "starter",
    level: "Starter",
    title: "Personal Training",
    duration: 60,
    description:
      "A practical introduction to the gym, from equipment and technique to basic etiquette. Walk in knowing what to do, how to do it, and where to start.",
  },
  {
    id: "intermediate",
    level: "Intermediate",
    title: "Build Your Program",
    duration: 90,
    description:
      "Turn random workouts into a real training plan. Learn how to structure your sessions, manage progression, and make smarter training decisions based on what actually works.",
  },
  {
    id: "advanced",
    level: "Advanced",
    title: "Level Up & Lock In",
    duration: null,
    description:
      "A deeper look at what's working, what isn't, and what needs to change. We'll review your training, nutrition, recovery, and progress before building a focused plan for your next phase.",
  },
] as const satisfies readonly Orientation[];

export const faqs = [
  {
    question: "Do I need to be fit before starting?",
    answer:
      "Nope. That's what the training is for. Whether you've never touched a dumbbell or you've been lifting for years, you don't need to show up already knowing what you're doing. We start where you are, work at your pace, and build from there. No judgment. Just progress.",
  },
  {
    question: "How is Coach Conzo different from other trainers?",
    answer:
      "In the fitness industry we sometimes forget to look at the humans behind the numbers, their life goals, out of work requirements, what their bodies are able to handle, and we paint them with a single brush stroke. I train people to develop a habit for life, not 6 pack abs in a month. I want you to walk away from me with the confidence to chase your goals all by yourself while I cheer you on all the way.",
  },
  {
    question: "How do online sessions work?",
    answer:
      "Your programs and habit reminders are delivered through an app with videos of how to do the whole program, laid out in order of what to do next. Any questions you have are answered through text, voice note, or calls whenever you have them. I'll track your program and make adjustments as we go.",
  },
  {
    question: "What does a typical week of training look like?",
    answer:
      "There's no one-size-fits-all week. Your training frequency depends on your goals, schedule, experience, and recovery. Most clients train 2 through 5 times a week, but we build around the life you actually have, not the fantasy version where you have unlimited free time. My goal is to ease you into it and then go from there.",
  },
  {
    question: "Do you do nutrition coaching too?",
    answer:
      "Yes, habit-based, flexible, and not a list of foods you're banned from forever. We're aiming for progress, not suffering.",
  },
] as const;

// Publish only supplied, permissioned reviews. The document contains no review text.
export const testimonials: Testimonial[] = [];
