import welcome from "../../public/images/coaching/gym-welcome.png";
import community from "../../public/images/coaching/gym-community.jpeg";
import training from "../../public/images/coaching/coach-training.jpg";
import type { OrientationId } from "@/types/coaching";

export const orientationImages = {
  starter: { src: community, position: "50% 45%" },
  intermediate: { src: welcome, position: "50% 35%" },
  advanced: { src: training, position: "50% 40%" },
} satisfies Record<OrientationId, { src: typeof welcome; position: string }>;
