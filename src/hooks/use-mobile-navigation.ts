"use client";
import { useEffect, useRef, useState } from "react";
import { focusSection } from "@/lib/anchor-navigation";
export function useMobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigationRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    navigationRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }
    function handlePointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !navigationRef.current?.contains(event.target) &&
        !buttonRef.current?.contains(event.target)
      )
        setIsOpen(false);
    }
    const viewport = window.matchMedia("(min-width: 64rem)");
    function handleResize(event: MediaQueryListEvent) {
      if (event.matches) setIsOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    viewport.addEventListener("change", handleResize);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
      viewport.removeEventListener("change", handleResize);
    };
  }, [isOpen]);
  function handleNavigate(id: string) {
    setIsOpen(false);
    focusSection(id);
  }
  return {
    isOpen,
    buttonRef,
    navigationRef,
    handleNavigate,
    handleToggle: () => setIsOpen((value) => !value),
  };
}
