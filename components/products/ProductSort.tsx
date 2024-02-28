"use client";

import { ChangeEvent } from "react";
import { productSortList } from "@/constants";
import Image from "next/image";
import { IProduct } from "@/libs/database/models/product.model";
import { Dispatch, SetStateAction } from "react";

type ProductSort = {
  products: IProduct[];
  fetchedProducts: IProduct[];
  setProducts: Dispatch<SetStateAction<IProduct[]>>;
};

const ProductSort = ({
  products,
  fetchedProducts,
  setProducts,
}: ProductSort) => {
  // Assuming products is an array of objects with a reviews property
  const sortProducts = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.currentTarget.value === "Sort by rating") {
      // Create a copy of the products array
      const sortedProducts = [...products];
      // Sort the copy by the length of the reviews array
      sortedProducts.sort(
        (a, b) => (b.reviews?.length ?? 0) - (a.reviews?.length ?? 0)
      );
      // Return the sorted copy
      setProducts(sortedProducts);
    } else if (e.currentTarget.value === "Sort by price: high to low") {
      const sortedProducts = [...products];
      // Use the sort method with a custom comparator function
      sortedProducts.sort((a, b) => {
        // Use sales_price if it exists, otherwise use price
        const aPrice = a.sales_price ?? a.price;
        const bPrice = b.sales_price ?? b.price;
        // Compare the prices in descending order
        return bPrice - aPrice;
      });
      // Return the sorted array
      setProducts(sortedProducts);
    } else if (e.currentTarget.value === "Sort by price: low to high") {
      const sortedProducts = [...products];
      // Use the sort method with a custom comparator function
      sortedProducts.sort((a, b) => {
        // Use sales_price if it exists, otherwise use price
        const aPrice = a.sales_price ?? a.price;
        const bPrice = b.sales_price ?? b.price;
        // Compare the prices in descending order
        return aPrice - bPrice;
      });
      // Return the sorted array
      setProducts(sortedProducts);
    } else if (e.currentTarget.value === "Sort by latest") {
      setProducts(fetchedProducts);
    }
  };

  return (
    <section className="flex items-center justify-end relative mb-8">
      <Image
        className="absolute right-3 top-2"
        src="/arrow-down.svg"
        width={20}
        height={20}
        alt="arrow"
      />
      <select
        className="w-[30%] text-sm p-2 border-[1px] border-gray-300 focus:outline-none appearance-none cursor-pointer"
        name="options"
        onChange={(e) => sortProducts(e)}
      >
        {productSortList.map((data) => (
          <option className="text-sm" key={data.id} value={`${data.text}`}>
            {data.text}
          </option>
        ))}
      </select>
    </section>
  );
};

export default ProductSort;
