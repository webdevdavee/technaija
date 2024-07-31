import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Overlay from "@/components/layout/Overlay";
import SlideInCart from "@/components/layout/SlideInCart";
import Search from "@/components/layout/Search";
import BottomNav from "@/components/layout/BottomNav";
import MobileMenu from "@/components/layout/MobileMenu";

export default function Layout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <Overlay />
      <SlideInCart />
      <MobileMenu />
      <Search />
      {children}
      <BottomNav />
      <Footer />
    </>
  );
}
