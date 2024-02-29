import Image from "next/image";
import Link from "next/link";
import { featuredCategories } from "@/constants";

const FeaturedCategory = () => {
  return (
    <section className="px-20 py-8 overflow-hidden m:px-6 xl:px-12">
      <div className="flex items-center justify-between gap-10 m:flex-col m:gap-4 m:justify-normal">
        {featuredCategories.map((category) => (
          <Link
            key={category.id}
            className="relative overflow-hidden"
            href={category.link}
          >
            <p className="absolute top-20 left-11 text-2xl font-medium z-10 ss:text-xl ss:top-12 ss:left-4 xl:text-xl xl:top-10 xl:left-4">
              {category.text}
            </p>
            <p className="absolute text-base capitalize top-32 left-11 z-10 mb-4 border-b-[1px] border-[#272829] ss:top-20 ss:left-4 xl:top-20 xl:left-4 xl:text-sm">
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
