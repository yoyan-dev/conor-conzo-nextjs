import type { coach } from "@/content/coach";

type SocialIconProps = {
  platform: (typeof coach.socials)[number]["name"];
};

export function SocialIcon({ platform }: SocialIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {platform === "Instagram" && (
        <g fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </g>
      )}
      {platform === "TikTok" && (
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2-2.75V9.42a6.35 6.35 0 1 0 5.45 6.29V8.72a8.16 8.16 0 0 0 4.77 1.52V6.79a4.85 4.85 0 0 1-1-.1Z" />
      )}
      {platform === "YouTube" && (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.58 6.19a2.85 2.85 0 0 0-2.01-2.01C17.8 3.7 12 3.7 12 3.7s-5.8 0-7.57.48a2.85 2.85 0 0 0-2.01 2.01C1.94 7.96 1.94 12 1.94 12s0 4.04.48 5.81a2.85 2.85 0 0 0 2.01 2.01c1.77.48 7.57.48 7.57.48s5.8 0 7.57-.48a2.85 2.85 0 0 0 2.01-2.01c.48-1.77.48-5.81.48-5.81s0-4.04-.48-5.81ZM10 15.5v-7l6 3.5-6 3.5Z"
        />
      )}
    </svg>
  );
}
