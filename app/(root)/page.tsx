import Hero from "@/components/ui/Hero";
import FeaturedCategory from "@/components/ui/FeaturedCategory";
import FeaturedProduct from "@/components/shared/FeaturedProduct";
import CollectionBanner from "@/components/ui/CollectionBanner";
import Newsletter from "@/components/ui/Newsletter";
import QuickView from "@/components/ui/QuickView";
import { auth } from "@clerk/nextjs";

export default async function Home() {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  return (
    <main>
      <QuickView userId={userId} />
      <Hero />
      <FeaturedCategory />
      <FeaturedProduct
        type="home"
        limit={4}
        title="Trending Cases"
        subtitle="Take these babies home with you"
        userId={userId}
      />
      <CollectionBanner />
      <FeaturedProduct
        type="home"
        limit={4}
        title="Popular Products"
        subtitle="View our best-selling phone cases and accessories"
        userId={userId}
      />
      <Newsletter />
    </main>
  );
}
