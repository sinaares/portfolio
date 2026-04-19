import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

/* ─── Fonts ───────────────────────────────────────────────────────────────── */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/* ─── Metadata ────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: "Seyedsina Seyedhashemi — AI · Cybersecurity · Web",
    template: "%s | Seyedsina Seyedhashemi",
  },
  description:
    "Computer Engineering student at DEU specializing in Artificial Intelligence, Cybersecurity, UI/UX Design, and Modern Web Development.",
  keywords: [
    "Seyedsina Seyedhashemi",
    "AI",
    "Cybersecurity",
    "Web Development",
    "Portfolio",
    "Computer Engineering",
    "DEU",
  ],
  authors: [{ name: "Seyedsina Seyedhashemi" }],
  creator: "Seyedsina Seyedhashemi",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Seyedsina Seyedhashemi",
    title: "Seyedsina Seyedhashemi — AI · Cybersecurity · Web",
    description:
      "Computer Engineering student at DEU specializing in AI, Cybersecurity, UI/UX, and Web Development.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seyedsina Seyedhashemi",
    description: "AI · Cybersecurity · Web Development Portfolio",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0c12",
  width: "device-width",
  initialScale: 1,
};

/* ─── Root Layout ─────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col">
        {/* Ambient background mesh */}
        <div className="gradient-mesh" aria-hidden="true" />
        {/* Film grain */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Navigation */}
        <Navbar />

        {/* Page content */}
        <main className="flex-1 pt-16">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
