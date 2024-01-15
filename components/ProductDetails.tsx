"use client";

import { useState } from "react";
import Image from "next/image";
import { IProduct } from "@/libs/database/models/product.model";
import ProductTabs from "./ProductTabs";

type Prop = {
  product: IProduct;
};

const ProductDetails = ({ product }: Prop) => {
  const [selectedModel, setSelectedModel] = useState(
    product.additional_information?.model?.[0].text
  );
  const stars = ["1", "2", "3", "4", "5"];
  return (
    <>
      <div className="w-full grid grid-cols-2 bg-white p-8">
        <Image
          src={product.featured_image}
          width={450}
          height={450}
          quality={100}
          alt="product-img"
        />
        <div className="flex flex-col items-start gap-8">
          <span className="w-full flex items-center justify-between">
            <p className="text-gray-400 text-sm">{product.original_category}</p>
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
              <p className="text-sm ml-2">
                Reviews ({product.reviews && product.reviews.length})
              </p>
            </span>
          </span>
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          {product.sales_price ? (
            <div className="flex items-center gap-2">
              <p className="line-through text-2xl font-medium text-red-500">
                {product.price}
              </p>
              <p className="ml-3 text-2xl">{product.sales_price}</p>
            </div>
          ) : (
            <p className="text-2xl">{product.price}</p>
          )}
          <p className="text-sm">{product.short_description}</p>
          <span className="w-full flex items-center justify-between">
            <p>
              model: <span className="font-semibold">{selectedModel}</span>
            </p>
            <Image
              className="cursor-pointer"
              src="/close.svg"
              width={20}
              height={20}
              alt="close"
              onClick={() => setSelectedModel("")}
            />
          </span>
          <span className="relative w-full">
            <Image
              className="absolute right-3 top-3"
              src="/arrow-down.svg"
              width={20}
              height={20}
              alt="arrow"
            />
            <select
              className="p-2 border-[1px] border-gray-300 focus:outline-none w-full appearance-none cursor-pointer"
              name="options"
              onChange={(e) => setSelectedModel(e.target.value)}
              value={selectedModel === "" ? "Choose an option" : selectedModel}
            >
              {selectedModel === "" && (
                <option value="Choose an option">Choose an option</option>
              )}
              {product.additional_information?.model?.map((data) => (
                <option key={data.id} value={`${data.text}`}>
                  {data.text}
                </option>
              ))}
            </select>
          </span>
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
              className={`py-2 px-10 capitalize bg-[#272829] text-white transition duration-500 hover:bg-black hover:transition ${
                selectedModel === "" &&
                "bg-gray-300 cursor-not-allowed hover:bg-gray-300 transition duration-500"
              }`}
              disabled={selectedModel === "" && true}
            >
              add to cart
            </button>
          </span>
          <button
            type="button"
            className={`flex gap-4 items-center py-2 px-6 capitalize transition duration-500 border-[1px] border-gray-300 ${
              selectedModel === "" &&
              "bg-gray-300 cursor-not-allowed transition duration-500"
            }`}
            disabled={selectedModel === "" && true}
          >
            wishlist
            <Image src="/heart.svg" width={20} height={20} alt="wishlist" />
          </button>
        </div>
      </div>
      <ProductTabs product={product} />
    </>
  );
};

export default ProductDetails;
