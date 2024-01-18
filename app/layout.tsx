import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/libs/redux-state/ReduxProvider";

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
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
