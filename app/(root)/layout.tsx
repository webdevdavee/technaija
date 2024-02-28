import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Overlay from "@/components/ui/Overlay";
import SlideInCart from "@/components/shared/SlideInCart";
import Search from "@/components/ui/Search";
import BottomNav from "@/components/shared/BottomNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Overlay />
      <SlideInCart />
      <Search />
      {children}
      <BottomNav />
      <Footer />
    </>
  );
}
