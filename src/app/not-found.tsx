import { sharedStyles } from "@/components/ui/shared-styles";
import Link from "next/link";
export default function NotFound() {
  return (
    <main
      id="main"
      tabIndex={-1}
      className={[
        sharedStyles["not-found"],
        sharedStyles["page-container"],
      ].join(" ")}
    >
      <p className={sharedStyles["eyebrow"]}>404</p>
      <h1>Let&apos;s get you back.</h1>
      <p>This page could not be found.</p>
      <Link href="/">Back to Coach Conzo</Link>
    </main>
  );
}
