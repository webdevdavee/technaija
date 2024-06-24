import type { Metadata } from "next";
import "./globals.css";
import { Jost } from "next/font/google";
import ReduxProvider from "@/libs/redux-state/ReduxProvider";
import { ClerkProvider } from "@clerk/nextjs";

const jost = Jost({ subsets: ["latin"] });

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
          fontFamily: "Jost, sans-serif",
        },
      }}
    >
      <html lang="en">
        <body className={jost.className}>
          <section className="ultra:max-w-[1300px] ultra:mx-auto">
            <ReduxProvider>{children}</ReduxProvider>
          </section>
        </body>
      </html>
    </ClerkProvider>
  );
}
