import { sharedStyles } from "@/components/ui/shared-styles";
import type { ReactNode } from "react";
type SectionHeadingProps = {
  eyebrow: string;
  children: ReactNode;
  id?: string;
  className?: string;
};
export function SectionHeading({
  eyebrow,
  children,
  id,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`${sharedStyles["section-heading"]} ${className}`}>
      <p className={sharedStyles["eyebrow"]}>{eyebrow}</p>
      <h2 id={id}>{children}</h2>
    </div>
  );
}
