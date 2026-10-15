"use client";

import { useEffect } from "react";

export function ScrollReveals() {
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (
      motion.matches ||
      typeof IntersectionObserver === "undefined" ||
      typeof Element.prototype.animate !== "function"
    ) {
      return;
    }

    // Animate existing content blocks, preserving their grid and flex parents.
    const pending = new Set(
      document.querySelectorAll<HTMLElement>(
        "main .section > .page-container > :not([data-scroll-reveal-group]), " +
          "[data-scroll-reveal-group] > *, " +
          ".section-navigation > .page-container, .site-footer > .page-container",
      ),
    );
    const active = new Map<HTMLElement, Animation>();
    const observer = new IntersectionObserver(
      (entries) => {
        let stagger = 0;
        for (const entry of entries) {
          const element = entry.target as HTMLElement;
          if (!entry.isIntersecting || !pending.delete(element)) continue;
          observer.unobserve(element);

          const animation = element.animate(
            [
              { opacity: 0, transform: "translateY(18px)" },
              { opacity: 1, transform: "none" },
            ],
            {
              duration: 600,
              delay: Math.min(stagger++ * 70, 210),
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              fill: "backwards",
            },
          );
          animation.id = "scroll-reveal";
          active.set(element, animation);
          animation.addEventListener("finish", () => active.delete(element), {
            once: true,
          });
        }
      },
      { rootMargin: "0px 0px 48px 0px", threshold: 0 },
    );

    // Focus and anchor navigation should never land on fading controls.
    function showTarget(target: Element) {
      const region = target.closest("section, footer, nav") ?? target;
      for (const element of pending) {
        if (region.contains(element) || element.contains(target)) {
          pending.delete(element);
          observer.unobserve(element);
        }
      }
      for (const [element, animation] of active) {
        if (region.contains(element) || element.contains(target)) {
          animation.cancel();
          active.delete(element);
        }
      }
    }

    function handleFocus(event: FocusEvent) {
      if (event.target instanceof Element) showTarget(event.target);
    }

    function handleHash() {
      try {
        const target = document.getElementById(
          decodeURIComponent(window.location.hash.slice(1)),
        );
        if (target) showTarget(target);
      } catch {
        // A malformed URL fragment must not prevent content from appearing.
      }
    }

    function stopReveals() {
      observer.disconnect();
      pending.clear();
      for (const animation of active.values()) animation.cancel();
      active.clear();
    }

    function handleMotionChange() {
      if (motion.matches) stopReveals();
    }

    handleHash();
    if (document.activeElement instanceof HTMLElement) {
      // The unfocused document body contains every section.
      if (document.activeElement !== document.body) {
        showTarget(document.activeElement);
      }
    }
    for (const element of pending) observer.observe(element);
    document.addEventListener("focusin", handleFocus);
    window.addEventListener("hashchange", handleHash);
    window.addEventListener("beforeprint", stopReveals);
    motion.addEventListener("change", handleMotionChange);

    return () => {
      stopReveals();
      document.removeEventListener("focusin", handleFocus);
      window.removeEventListener("hashchange", handleHash);
      window.removeEventListener("beforeprint", stopReveals);
      motion.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return null;
}
