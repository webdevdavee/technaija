import Hero from "@/components/utility/Hero";
import FeaturedCategory from "@/components/products/FeaturedCategory";
import FeaturedProduct from "@/components/products/FeaturedProduct";
import CollectionBanner from "@/components/utility/CollectionBanner";
import Newsletter from "@/components/forms/Newsletter";
import QuickView from "@/components/utility/QuickView";
import { auth } from "@clerk/nextjs/server";

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
