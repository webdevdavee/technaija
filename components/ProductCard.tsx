"use client";

import { IProduct } from "@/libs/database/models/product.model";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type CardProp = {
  product: IProduct;
};

const ProductCard = ({ product }: CardProp) => {
  const [heartHover, setHeartHover] = useState(false);
  const { id, name, price, sales_price, featured_image } = product;
  return (
    <section className="w-fit group">
      <div className="relative mb-4 overflow-hidden">
        <Link href={"#"}>
          <Image
            width={270}
            height={670}
            quality={100}
            src={featured_image}
            alt="product"
          />
        </Link>
        <div
          className="absolute bg-white drop-shadow-md p-2 transition duration-300 cursor-pointer top-[5%] right-[10%] rounded-[50%] hover:bg-red-300 translate-x-[1000%] group-hover:-translate-x-0 group-hover:transition group-hover:duration-300"
          onMouseOver={() => setHeartHover(true)}
          onMouseLeave={() => setHeartHover(false)}
        >
          {!heartHover ? (
            <Image width={20} height={20} src="/heart.svg" alt="wishlist" />
          ) : (
            <Image
              width={20}
              height={20}
              src="/heart-white.svg"
              alt="wishlist"
            />
          )}
        </div>
        <div className="absolute translate-y-full transition duration-500 bg-[#272829] w-full p-2 cursor-pointer group-hover:-translate-y-full group-hover:transition group-hover:duration-500">
          <p className="text-white capitalize text-center text-sm">
            quick view
          </p>
        </div>
      </div>
      <div>
        <Link href={"#"}>
          <p className="capitalize text-center font-semibold">{name}</p>
        </Link>
        <div className="text-center">
          {sales_price ? (
            <div>
              <span className="line-through font-medium text-red-500">
                {price}
              </span>{" "}
              <span className="ml-3">{sales_price}</span>
            </div>
          ) : (
            price
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
