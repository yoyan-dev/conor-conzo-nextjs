import { coach } from "@/content/coach";
import { navigationItems } from "@/content/navigation";
import { SocialIcon } from "@/components/ui/social-icon";
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-container footer-inner">
        <div className="footer-brand">
          <a href="#main" className="wordmark">
            COACH <span>CONZO</span>
          </a>
          <p>Fitness for life. No judgement.</p>
          <a href={`mailto:${coach.email}`}>
            {coach.email} <span aria-hidden="true">↗</span>
          </a>
        </div>
        <nav className="footer-column" aria-label="Footer navigation">
          <h2 className="footer-heading">Explore</h2>
          <ul className="footer-links">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="footer-column">
          <h2 className="footer-heading">Follow along</h2>
          <ul className="footer-links footer-socials">
            {coach.socials.map((social) => (
              <li key={social.name}>
                <a href={social.href}>
                  <SocialIcon platform={social.name} />
                  <span>{social.name}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="page-container footer-bottom">
        <p>
          © {new Date().getUTCFullYear()} {coach.name}. All rights reserved.
        </p>
        <a href="#main">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
