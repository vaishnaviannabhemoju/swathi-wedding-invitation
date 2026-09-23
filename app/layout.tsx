import type { Metadata } from "next";
import { Cormorant_Garamond, Italiana, Jost } from "next/font/google";
import "./globals.css";
import "./global.css";

const italiana = Italiana({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-italiana",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

const jost = Jost({
  weight: ["200", "300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "Swathi & Shiva Prasad Reddy — Wedding",
  description:
    "Join us in celebrating the wedding of Swathi and Shiva Prasad Reddy on November 21, 2026",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${italiana.variable} ${cormorant.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
