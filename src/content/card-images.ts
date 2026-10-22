import welcome from "../../public/images/orientations/gym-welcome.png";
import community from "../../public/images/orientations/gym-community.jpeg";
import advanced from "../../public/images/orientations/advanced-orientation-enhanced.webp";
import type { OrientationId } from "@/types/coaching";

export const orientationImages = {
  starter: { src: community, position: "50% 45%" },
  intermediate: { src: welcome, position: "50% 35%" },
  advanced: { src: advanced, position: "50% 30%" },
} satisfies Record<OrientationId, { src: typeof welcome; position: string }>;
