import { SiteHeader } from "@/components/layout/site-header";
import { SectionNavigation } from "@/components/layout/section-navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { CoachingFlow } from "@/components/coaching/coaching-flow";
import { BookingIntroduction } from "@/components/sections/booking-introduction";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FaqSection } from "@/components/sections/faq-section";
import { ContactSection } from "@/components/sections/contact-section";
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <HeroSection />
        <SectionNavigation />
        <CoachingFlow bookingIntroduction={<BookingIntroduction />}>
          <ServicesSection />
        </CoachingFlow>
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
