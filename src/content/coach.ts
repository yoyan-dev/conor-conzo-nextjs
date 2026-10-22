import type { Service, Orientation, Testimonial } from "@/types/coaching";

export const coach = {
  name: "Coach Conzo",
  brand: "TRYHRD",
  email: "yoyan.glophics@gmail.com",
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

// Transcribed from client messages supplied by the user. Preserve their wording.
// Include names and star ratings only where supplied; do not infer calendar dates.
export const testimonials: Testimonial[] = [
  {
    name: "Vincent",
    rating: 5,
    quote:
      "Professional friendly and down to earth connor was great at helping me start my fitness journey. He was reassuring and answered questions i had about equiptment use and provided me with a custom workout that helped me ease into working out helping me build confidence and and routines gradually 5/5 stars",
  },
  {
    name: "Dana",
    rating: 5,
    quote:
      "Coach Conzo is that friend that would promise you soft serve and pizza, ONLY if you finish your workouts and do what’s best for you! In all seriousness, I’ve never been more motivated to workout and to learn more about what works out for my body, and I have seen results in the past month with him that I haven’t seen in my last five years at the gym. He’s always ready to answer any question and doesn’t hesitate to demonstrate any form to ensure you get maximum benefit of the training. He’s a pretty good fella too. 10/10 would recommend to y’all",
  },
  {
    name: "Claudia",
    rating: 5,
    type: "Online + in-person",
    quote:
      "Couldn’t recommend Conzo enough! I do online coaching with him and one in-person session a month and it works really well for me.\n\nHe actually listens to my goals and what I like and don’t like in the gym, and adapts my programme around that rather than just giving me a generic plan. He’s also added food goals which have really helped keep me focused and accountable.\n\nReally supportive, easy to work with and I’m really enjoying my training with him!",
  },
  {
    name: "Alex",
    rating: 5,
    quote:
      "5 stars, extremely knowledgeable, totally able to work with my hypermobility, supportive like the ultimate hype man and set me up for long term gains",
  },
  {
    // Supplied WhatsApp screenshot: no star rating or calendar date is shown.
    name: "Giorgio Basile",
    quote:
      "Re-found my love of weightlifting through my sessions with Connor! For the longest time, I was stagnating in the gym and feeling a real loss of confidence from past injuries. Through Connor's training, I was able to build back my former strength and achieve PBs in my squat i thought were unattainable. I really appreciate his dedication, expertise, and ability to make me feel confident to reach higher. I look forward to my gym sessions every week.\nThanks for the confidence and new set of wheels, Connor!",
  },
];
