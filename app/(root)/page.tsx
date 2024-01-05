import Hero from "@/components/Hero";
import FeaturedCategory from "@/components/FeaturedCategory";
import Collection from "@/components/Collection";
import CollectionBanner from "@/components/CollectionBanner";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedCategory />
      <Collection
        title="Trending Cases"
        subtitle="Take these babies home with you"
      />
      <CollectionBanner />
      <Collection
        title="Popular Products"
        subtitle="View our best-selling phone cases and accessories"
      />
      <Newsletter />
    </main>
  );
}
