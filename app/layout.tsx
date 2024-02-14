import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/libs/redux-state/ReduxProvider";
import { ClerkProvider } from "@clerk/nextjs";

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
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#272829",
          fontFamily: "Poppins, sans-serif",
        },
      }}
    >
      <html lang="en">
        <body>
          <ReduxProvider>{children}</ReduxProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
