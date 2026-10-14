"use client";
import { Link } from "@heroui/react/link";
import type { ReactNode } from "react";
import { focusSection } from "@/lib/anchor-navigation";
type ActionLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "text";
  className?: string;
  onPress?: () => void;
};
export function ActionLink({
  href,
  children,
  variant = "primary",
  className = "",
  onPress,
}: ActionLinkProps) {
  return (
    <Link
      href={href}
      className={`action-link action-link--${variant} ${className}`}
      onPress={() => {
        onPress?.();
        if (href.startsWith("#")) focusSection(href.slice(1));
      }}
    >
      {children}
    </Link>
  );
}
