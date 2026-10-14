import { navigationItems } from "@/content/navigation";
export function SectionNavigation() {
  return (
    <nav className="section-navigation" aria-label="Explore this page">
      <div className="page-container section-navigation-inner">
        {navigationItems.map((item) => (
          <a key={item.id} href={`#${item.id}`}>
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
