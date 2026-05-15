import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dango Bridge Monitor",
  description: "Real-time visibility into Dango's Hyperlane bridge infrastructure",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}