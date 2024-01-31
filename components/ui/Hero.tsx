"use client";

import Image from "next/image";
import { useState } from "react";
import { heroImages } from "@/constants";
import LinkButton from "./LinkButton";

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
      <div className="h-screen overflow-hidden">
        <Image
          src="/arrow-right.svg"
          className="absolute left-[2%] top-[50%] rotate-180 cursor-pointer hover:-translate-x-1 hover:ease-in-out duration-500 hover:transition hover:duration-500"
          onClick={moveToPrevSlide}
          width={35}
          height={35}
          alt="arrow left"
        />
        <span className="flex flex-col gap-3 absolute top-[33%] left-[10%] translate-x-2 ease-in-out duration-500 transition w-80">
          <p className="leading-[3.5rem] text-5xl font-normal">
            {heroImages[index].text}
          </p>
          <p>{heroImages[index].subtext}</p>
          {index === 0 && (
            <LinkButton
              link={heroImages[index].link}
              classname={
                "bg-[#272829] p-3 text-white mt-4 w-fit hover:transition flex items-center justify-center gap-2"
              }
              text="Shop now"
              icon="/arrow-right.svg"
            />
          )}
          {index === 1 && (
            <LinkButton
              link={heroImages[index].link}
              classname={
                "bg-[#272829] p-3 text-white mt-4 w-fit hover:transition flex items-center justify-center gap-2"
              }
              text="Shop now"
              icon="/arrow-right.svg"
            />
          )}
          {index === 2 && (
            <LinkButton
              link={heroImages[index].link}
              classname={
                "bg-[#272829] p-3 text-white mt-4 w-fit hover:transition flex items-center justify-center gap-2"
              }
              text="Shop now"
              icon="/arrow-right.svg"
            />
          )}
        </span>
        <Image
          className="w-full h-fit ease-in-out duration-700"
          width={1500}
          height={1500}
          quality={100}
          src={heroImages[index].image}
          alt="hero-img"
        />
        <Image
          src="/arrow-right.svg"
          className="absolute right-[2%] top-[50%] cursor-pointer hover:translate-x-1 hover:ease-in-out duration-500 hover:transition hover:duration-500"
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
