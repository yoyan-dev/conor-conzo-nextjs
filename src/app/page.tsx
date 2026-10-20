import { connection } from "next/server";
import { getFormMode } from "@/lib/server/form-mode";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { HeroSection } from "@/components/sections/hero/hero-section";
import { ServicesSection } from "@/components/sections/services/services-section";
import { CoachingFlow } from "@/components/coaching/coaching-flow";
import { BookingIntroduction } from "@/components/sections/booking/booking-introduction";
import { BookingSection } from "@/components/sections/booking/booking-section";
import { OrientationsSection } from "@/components/sections/orientations/orientations-section";
import { TestimonialsSection } from "@/components/sections/testimonials/testimonials-section";
import { FaqSection } from "@/components/sections/faq/faq-section";
import { GallerySection } from "@/components/sections/gallery/gallery-section";
import { ContactSection } from "@/components/sections/contact/contact-section";
import { SectionNavigation } from "@/components/layout/section-navigation";
import { ScrollReveals } from "@/components/ui/scroll-reveals";
export default async function Home() {
  // Resolve the public mode at request time; SMTP credentials stay server-only.
  await connection();
  const mode = getFormMode();
  return (
    <CoachingFlow>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <ScrollReveals />
        <HeroSection />
        <SectionNavigation />
        <ServicesSection />
        <OrientationsSection />
        <BookingSection introduction={<BookingIntroduction />} mode={mode} />
        <TestimonialsSection />
        <FaqSection />
        <GallerySection />
        <ContactSection mode={mode} />
      </main>
      <SiteFooter />
    </CoachingFlow>
  );
}
