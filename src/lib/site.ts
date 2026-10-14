function optionalHttpsUrl(value: string | undefined, name: string) {
  if (!value?.trim()) return undefined;
  const url = new URL(value.trim());
  if (url.protocol !== "https:" || url.username || url.password) {
    throw new Error(`${name} must be a public HTTPS URL without credentials.`);
  }
  return url;
}

const origin = optionalHttpsUrl(process.env.SITE_URL, "SITE_URL");
export const site = {
  url: origin?.origin,
  bookingUrl: optionalHttpsUrl(process.env.BOOKING_URL, "BOOKING_URL")?.href,
  indexable:
    Boolean(origin) &&
    process.env.ENABLE_INDEXING === "true" &&
    process.env.VERCEL_ENV !== "preview" &&
    process.env.NODE_ENV === "production",
  title: "Coach Conzo | Personal Training & Online Coaching",
  description:
    "Build strength, confidence, and consistency with Coach Conzo. Personal training, online coaching, and gym orientations. No judgement. Fitness for life.",
};
