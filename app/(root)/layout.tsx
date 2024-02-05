import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/shared/Footer";
import Overlay from "@/components/shared/Overlay";
import SlideInCart from "@/components/shared/SlideInCart";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <Overlay />
      <SlideInCart />
      {children}
      <Footer />
    </>
  );
}
