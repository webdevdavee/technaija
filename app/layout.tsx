import type { Metadata } from "next";
import "./globals.css";
import Newsletter from "@/components/Newsletter";

export const metadata: Metadata = {
  title: "Technaija",
  description: "Shop at technaija",
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
