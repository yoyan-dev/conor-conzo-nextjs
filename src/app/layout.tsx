import { sharedStyles } from "@/components/ui/shared-styles";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { site } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";
import "./assets/css/globals.css";

const raleway = localFont({
  src: "../../public/fonts/raleway-latin-variable.woff2",
  variable: "--font-raleway",
  weight: "100 900",
  display: "swap",
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url ?? "http://localhost:3000"),
  ...(site.url ? { alternates: { canonical: "/" } } : {}),
  title: site.title,
  description: site.description,
  robots: { index: site.indexable, follow: site.indexable },
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
    locale: "en_GB",
    siteName: "Coach Conzo / TRYHRD",
    ...(site.url ? { url: site.url } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" data-theme="dark">
      <body className={raleway.variable}>
        <a href="#main" className={sharedStyles["skip-link"]}>
          Skip to content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
