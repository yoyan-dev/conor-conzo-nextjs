import { createEnquiryHandler } from "@/lib/server/enquiry-handler";

export const runtime = "nodejs";
export const maxDuration = 60;
export const POST = createEnquiryHandler();
