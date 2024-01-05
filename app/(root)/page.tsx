import Hero from "@/components/Hero";
import FeaturedCategory from "@/components/FeaturedCategory";
import Collection from "@/components/Collection";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedCategory />
      <Collection
        title="Trending Cases"
        subtitle="Take these babies home with you"
      />
    </main>
  );
}
