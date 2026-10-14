import { coach } from "@/content/coach";
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-container footer-inner">
        <a href="#main" className="wordmark">
          COACH <span>CONZO</span>
        </a>
        <p>Fitness for life. No judgement.</p>
        <a href={`mailto:${coach.email}`}>
          {coach.email} <span aria-hidden="true">↗</span>
        </a>
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
