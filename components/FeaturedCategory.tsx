import Image from "next/image";

const FeaturedCategory = () => {
  return (
    <section className="px-20 py-8 overflow-hidden">
      <div className="flex items-center justify-between gap-10">
        <Image
          width={500}
          height={1000}
          src="/featured-category (1).webp"
          alt="category"
        />
        <Image
          width={500}
          height={1000}
          src="/featured-category (2).webp"
          alt="category"
        />
        <Image
          width={500}
          height={1000}
          src="/featured-category (3).webp"
          alt="category"
        />
      </div>
    </section>
  );
};

export default FeaturedCategory;
