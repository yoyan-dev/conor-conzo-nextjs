import { sharedStyles } from "@/components/ui/shared-styles";
import { layoutStyles } from "@/components/layout/layout-styles";
import { coach } from "@/content/coach";
import { navigationItems } from "@/content/navigation";
import { SocialIcon } from "@/components/ui/social-icon";
export function SiteFooter({ homePath = "" }: { homePath?: string }) {
  return (
    <footer className={layoutStyles["site-footer"]}>
      <div
        className={[
          sharedStyles["page-container"],
          layoutStyles["footer-inner"],
        ].join(" ")}
      >
        <div className={layoutStyles["footer-brand"]}>
          <a href={homePath || "#main"} className={layoutStyles["wordmark"]}>
            COACH <span>CONZO</span>
          </a>
          <p>Fitness for life. No judgement.</p>
          <a href={`mailto:${coach.email}`}>{coach.email}</a>
        </div>
        <nav
          className={layoutStyles["footer-column"]}
          aria-label="Footer navigation"
        >
          <h2 className={layoutStyles["footer-heading"]}>Explore</h2>
          <ul className={layoutStyles["footer-links"]}>
            {navigationItems.map((item) => (
              <li key={item.id}>
                <a href={`${homePath}#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={layoutStyles["footer-column"]}>
          <h2 className={layoutStyles["footer-heading"]}>Follow along</h2>
          <ul
            className={[
              layoutStyles["footer-links"],
              layoutStyles["footer-socials"],
            ].join(" ")}
          >
            {coach.socials.map((social) => (
              <li key={social.name}>
                <a href={social.href}>
                  <SocialIcon platform={social.name} />
                  <span>{social.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className={[
          sharedStyles["page-container"],
          layoutStyles["footer-bottom"],
        ].join(" ")}
      >
        <p>
          © {new Date().getUTCFullYear()} {coach.name}. All rights reserved.
        </p>
        <a href="#main">Back to top</a>
      </div>
    </footer>
  );
}
