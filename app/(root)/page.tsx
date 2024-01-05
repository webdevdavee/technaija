import Image from "next/image";
import Hero from "@/components/Hero";
import FeaturedCategory from "@/components/FeaturedCategory";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedCategory />
    </main>
  );
}
