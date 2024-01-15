"use client";

import Link from "next/link";
import Image from "next/image";

const QuickView = () => {
  const stars = ["1", "2", "3", "4", "5"];
  return (
    <section className="hidden relative quickview z-[55] w-[85%]">
      <div className="grid grid-cols-2 bg-white p-8">
        <Image
          src="/test-img.jpg"
          width={450}
          height={450}
          quality={100}
          alt="product-img"
        />
        <div className="flex flex-col items-start gap-8">
          <span className="flex items-center gap-1">
            {stars.map((_, index) => (
              <Image
                key={index}
                src="/star.svg"
                width={20}
                height={20}
                alt="star"
              />
            ))}
            <p className="text-sm ml-2">Reviews (1)</p>
          </span>
          <h1 className="text-2xl font-semibold">In Bloom</h1>
          <p className="text-xl font-medium">NGN 15,000</p>
          <p className="text-sm">
            Designed for simplicity and made from high quality materials. Its
            sleek geometry and material combinations creates a modern look.
          </p>
          <span className="w-full flex items-center justify-between">
            <p>
              model: <span className="font-semibold">iPhone 12</span>
            </p>
            <Image src="/close.svg" width={20} height={20} alt="close" />
          </span>
          <select
            className="p-2 border-[1px] border-gray-300 focus:outline-none w-full"
            name="options"
          >
            <option value="">Choose an option</option>
            <option value="iPhone 11">iPhone 11</option>
            <option value="iPhone 11 Pro">iPhone 11 Pro</option>
            <option value="iPhone 12">iPhone 12</option>
            <option value="iPhone 12 Pro">iPhone 12 Pro</option>
          </select>
          <span className="flex items-center gap-4">
            <span className="flex gap-8 items-center p-2 border-[1px] border-gray-300">
              <button type="button">
                <Image
                  className="hover:bg-gray-200 hover:transition rounded-[50%]"
                  src="/minus.svg"
                  width={20}
                  height={20}
                  alt="minus"
                />
              </button>
              <p>1</p>
              <button type="button">
                <Image
                  className="hover:bg-gray-200 hover:transition rounded-[50%]"
                  src="/plus.svg"
                  width={20}
                  height={20}
                  alt="plus"
                />
              </button>
            </span>
            <button
              type="button"
              className="py-2 px-10 capitalize bg-[#272829] text-white hover:bg-black hover:transition"
            >
              add to cart
            </button>
          </span>
          <button
            type="button"
            className="flex gap-4 items-center py-2 px-6 capitalize border-[1px] border-gray-300"
          >
            wishlist
            <Image src="/heart.svg" width={20} height={20} alt="wishlist" />
          </button>
        </div>
      </div>
      <button type="button">
        <Image
          className="absolute top-7 right-9 text-base"
          src="/close.svg"
          width={30}
          height={30}
          alt="close"
        />
      </button>
    </section>
  );
};

export default QuickView;
