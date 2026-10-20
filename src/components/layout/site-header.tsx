import Link from "next/link";
import { navigationItems } from "@/content/navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { FreeCallAction } from "@/components/coaching/free-call-action";
export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="page-container header-inner">
        <Link href="/" className="wordmark" aria-label="Coach Conzo home">
          COACH <span>CONZO</span>
        </Link>
        <nav className="desktop-navigation" aria-label="Main navigation">
          {navigationItems
            .filter((item) => item.id !== "book")
            .map((item) => (
              <a key={item.id} href={`#${item.id}`}>
                {item.label}
              </a>
            ))}
        </nav>
        <FreeCallAction className="header-action">
          Book a free call
        </FreeCallAction>
        <MobileNavigation />
      </div>
    </header>
  );
}
