"use client";
import { sharedStyles } from "@/components/ui/shared-styles";
import { Link } from "@heroui/react/link";
import type { ReactNode } from "react";
import { focusSection } from "@/lib/anchor-navigation";
const actionVariants = {
  primary: sharedStyles["action-link--primary"],
  secondary: sharedStyles["action-link--secondary"],
  text: sharedStyles["action-link--text"],
} as const;
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
      className={`${sharedStyles["action-link"]} ${actionVariants[variant]} ${className}`}
      onPress={() => {
        onPress?.();
        if (href.startsWith("#")) focusSection(href.slice(1));
      }}
    >
      {children}
    </Link>
  );
}
