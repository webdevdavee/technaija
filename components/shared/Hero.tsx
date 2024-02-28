"use client";

import Image from "next/image";
import { useState } from "react";
import { heroImages } from "@/constants";
import LinkButton from "../ui/LinkButton";

const Hero = () => {
  const [index, setIndex] = useState<number>(1);

  const moveToNextSlide = () => {
    if (index === heroImages.length - 1) {
      // check if index is equal to array length minus one
      setIndex(0); // set index to zero
    } else {
      setIndex((prev) => prev + 1); // increment index by one
    }
  };

  const moveToPrevSlide = () => {
    if (index === 0) {
      // check if index is equal to zero
      setIndex(heroImages.length - 1); // set index to array length minus one
    } else {
      setIndex((prev) => prev - 1); // decrement index by one
    }
  };
  return (
    <section>
      <div className="relative h-screen overflow-hidden m:h-[23rem]">
        <Image
          src="/arrow-right.svg"
          className="absolute left-[2%] top-[50%] rotate-180 cursor-pointer hover:-translate-x-1 hover:ease-in-out duration-500 hover:transition hover:duration-500 m:top-[50%]"
          onClick={moveToPrevSlide}
          width={35}
          height={35}
          alt="arrow left"
        />
        <span className="flex flex-col gap-3 absolute top-[36%] left-[10%] translate-x-2 ease-in-out duration-500 transition w-80 m:w-[10rem] m:top-[24%] m:left-[15%]">
          <p className="leading-[3.5rem] text-5xl font-normal m:text-2xl">
            {heroImages[index].text}
          </p>
          <p className="m:text-sm">{heroImages[index].subtext}</p>
          {index === 0 && (
            <LinkButton
              link={heroImages[index].link}
              classname={
                "bg-[#272829] p-3 text-white mt-4 w-fit hover:transition flex items-center justify-center gap-2 m:text-sm"
              }
              text="Shop now"
              icon="/arrow-right.svg"
            />
          )}
          {index === 1 && (
            <LinkButton
              link={heroImages[index].link}
              classname={
                "bg-[#272829] p-3 text-white mt-4 w-fit hover:transition flex items-center justify-center gap-2 m:text-sm"
              }
              text="Shop now"
              icon="/arrow-right.svg"
            />
          )}
          {index === 2 && (
            <LinkButton
              link={heroImages[index].link}
              classname={
                "bg-[#272829] p-3 text-white mt-4 w-fit hover:transition flex items-center justify-center gap-2 m:text-sm"
              }
              text="Shop now"
              icon="/arrow-right.svg"
            />
          )}
        </span>
        {/* Larger screens */}
        <Image
          className="w-full h-fit m:hidden"
          width={1500}
          height={1500}
          quality={100}
          src={heroImages[index].image}
          alt="hero-img"
        />
        {/* Mobile screen */}
        <Image
          className="max-w-[30rem] h-full xl:hidden xxl:hidden xxxl:hidden ultra:hidden"
          width={1000}
          height={1000}
          quality={100}
          src={heroImages[index].image}
          alt="hero-img"
        />
        <Image
          src="/arrow-right.svg"
          className="absolute right-[2%] top-[50%] cursor-pointer hover:translate-x-1 hover:ease-in-out duration-500 hover:transition hover:duration-500 m:top-[50%]"
          onClick={moveToNextSlide}
          width={35}
          height={35}
          alt="arrow right"
        />
      </div>
    </section>
  );
};

export default Hero;
