import type { Metadata } from "next";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "Ezekhiel Paras — Full Stack Developer",
  description: "Full Stack Software Engineer with 8+ years building web platforms, APIs, and e-commerce solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
