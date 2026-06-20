import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./styles/globals.css";

// Self-hosted (no render-blocking Google Fonts request), only used weights.
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

// TODO: change to your real deployed domain when you have one
const SITE_URL = "https://portfolio-app-ez3ro.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Ezekhiel Paras — Full Stack Developer",
  description:
    "Full Stack Software Engineer with 8+ years building web platforms, APIs, and e-commerce solutions.",
  keywords: [
    "Ezekhiel Paras",
    "Full Stack Developer",
    "Software Engineer",
    "React",
    "Next.js",
    "Django",
    "Laravel",
  ],
  authors: [{ name: "Ezekhiel Paras" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Ezekhiel Paras — Full Stack Developer",
    description:
      "Full Stack Software Engineer with 8+ years building web platforms, APIs, and e-commerce solutions.",
    siteName: "Ezekhiel Paras",
    images: [
      {
        url: "/images/dev2.webp",
        width: 500,
        height: 500,
        alt: "Ezekhiel Paras — Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ezekhiel Paras — Full Stack Developer",
    description:
      "Full Stack Software Engineer with 8+ years building web platforms, APIs, and e-commerce solutions.",
    images: ["/images/dev2.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
