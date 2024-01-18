import Image from "next/image";
import Link from "next/link";
import { featuredCategories } from "@/constants";

const FeaturedCategory = () => {
  return (
    <section className="px-20 py-8 overflow-hidden">
      <div className="flex items-center justify-between gap-10">
        {featuredCategories.map((category) => (
          <Link
            key={category.id}
            className="relative overflow-hidden"
            href={category.link}
          >
            <p className="absolute top-20 left-11 text-2xl font-medium z-10">
              {category.text}
            </p>
            <p className="absolute text-base capitalize top-32 left-11 z-10 mb-4 border-b-[1px] border-[#272829]">
              {category.subtext}
            </p>
            <Image
              className="hover:scale-[1.1] hover:ease-in-out duration-500 hover:transition hover:duration-500"
              width={500}
              height={1000}
              src={category.image}
              alt={category.text}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategory;
