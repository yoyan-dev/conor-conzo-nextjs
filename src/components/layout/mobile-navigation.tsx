"use client";
import { Button } from "@heroui/react/button";
import { navigationItems } from "@/content/navigation";
import { useMobileNavigation } from "@/hooks/use-mobile-navigation";
import { useCoachingSelection } from "@/components/coaching/coaching-selection";
export function MobileNavigation() {
  const { onSessionChange } = useCoachingSelection();
  const { isOpen, buttonRef, navigationRef, handleNavigate, handleToggle } =
    useMobileNavigation();
  return (
    <div className="mobile-navigation">
      <Button
        ref={buttonRef}
        variant="ghost"
        isIconOnly
        className="menu-toggle"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onPress={handleToggle}
      >
        <span className="menu-lines" data-open={isOpen} aria-hidden="true">
          <span />
          <span />
        </span>
      </Button>
      <nav
        ref={navigationRef}
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className="mobile-menu"
        hidden={!isOpen}
      >
        {navigationItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={() => {
              if (item.id === "book") onSessionChange("discovery-call");
              handleNavigate(item.id);
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
