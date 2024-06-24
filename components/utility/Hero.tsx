import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative h-[75vh]">
      <div className="flex items-center justify-start hero h-[75vh] overflow-hidden px-20 m:px-8">
        <div className="w-[40%] m:w-[80%]">
          <div className="flex flex-col gap-6">
            <h1 className="text-5xl font-semibold m:text-white sm:text-3xl smd:text-3xl xl:text-3xl">
              The 2024 iPhone, Samsung, iPad, Pixel, Xiaomi Cases
            </h1>
            <h3 className="text-lg m:text-white">
              They are all made from recyclable material
            </h3>
            <Link href="/shop" className="w-fit bg-[#272829] text-white p-3">
              Shop now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
