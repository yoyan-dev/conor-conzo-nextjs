import { services } from "@/content/coach";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceAction } from "@/components/coaching/service-action";
import styles from "@/app/assets/css/sections/services-section.module.css";
export function ServicesSection() {
  return (
    <section
      id="about"
      tabIndex={-1}
      aria-labelledby="services-heading"
      className="section"
    >
      <div className="page-container">
        <div className={styles.intro}>
          <SectionHeading eyebrow="What I do" id="services-heading">
            Coaching based on a simple fact:
            <br />
            <span className="muted-heading">we’re all human.</span>
          </SectionHeading>
          <p>
            I’m Coach Conzo - Sixteen (16) years in, countless clients helped,
            and still just as passionate about helping people achieve results
            they can actually maintain.
          </p>
        </div>
        <div className={styles.services} data-scroll-reveal-group="">
          {services.map((service) => (
            <article key={service.id} className={styles.service}>
              <div className={styles.label}>
                <span>{service.label}</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ServiceAction serviceId={service.id} title={service.title} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
