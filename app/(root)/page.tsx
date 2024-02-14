import Hero from "@/components/ui/Hero";
import FeaturedCategory from "@/components/ui/FeaturedCategory";
import FeaturedProduct from "@/components/shared/FeaturedProduct";
import CollectionBanner from "@/components/ui/CollectionBanner";
import Newsletter from "@/components/ui/Newsletter";
import QuickView from "@/components/ui/QuickView";
import { getAllUsers, getUserById } from "@/libs/actions/user.action";

export default async function Home() {
  return (
    <main>
      <QuickView />
      <Hero />
      <FeaturedCategory />
      <FeaturedProduct
        type="home"
        limit={4}
        title="Trending Cases"
        subtitle="Take these babies home with you"
      />
      <CollectionBanner />
      <FeaturedProduct
        type="home"
        limit={4}
        title="Popular Products"
        subtitle="View our best-selling phone cases and accessories"
      />
      <Newsletter />
    </main>
  );
}
