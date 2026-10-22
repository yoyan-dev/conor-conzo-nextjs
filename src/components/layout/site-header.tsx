import { sharedStyles } from "@/components/ui/shared-styles";
import { layoutStyles } from "@/components/layout/layout-styles";
import Link from "next/link";
import { navigationItems } from "@/content/navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { FreeCallAction } from "@/components/coaching/free-call-action";
export function SiteHeader() {
  return (
    <header className={layoutStyles["site-header"]}>
      <div
        className={[
          sharedStyles["page-container"],
          layoutStyles["header-inner"],
        ].join(" ")}
      >
        <Link
          href="/"
          className={layoutStyles["wordmark"]}
          aria-label="Coach Conzo home"
        >
          COACH <span>CONZO</span>
        </Link>
        <nav
          className={layoutStyles["desktop-navigation"]}
          aria-label="Main navigation"
        >
          {navigationItems
            .filter((item) => item.id !== "book")
            .map((item) => (
              <a key={item.id} href={`#${item.id}`}>
                {item.label}
              </a>
            ))}
        </nav>
        <FreeCallAction className={layoutStyles["header-action"]}>
          Book a free call
        </FreeCallAction>
        <MobileNavigation />
      </div>
    </header>
  );
}
