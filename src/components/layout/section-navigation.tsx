import { sharedStyles } from "@/components/ui/shared-styles";
import { layoutStyles } from "@/components/layout/layout-styles";
import { navigationItems } from "@/content/navigation";
export function SectionNavigation() {
  return (
    <nav
      className={layoutStyles["section-navigation"]}
      aria-label="Explore this page"
    >
      <div
        className={[
          sharedStyles["page-container"],
          layoutStyles["section-navigation-inner"],
        ].join(" ")}
      >
        {navigationItems.map((item) => (
          <a key={item.id} href={`#${item.id}`}>
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
