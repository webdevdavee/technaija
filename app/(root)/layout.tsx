import FixedNavbar from "@/components/FixedNavbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <FixedNavbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
