"use client";

import { IUser } from "@/libs/database/models/user.model";
import ProductFilterBar from "../ui/ProductFilterBar";
import Collection from "./Collection";
import { IProduct } from "@/libs/database/models/product.model";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { shopFilterState } from "@/libs/redux-state/features/shop-filter/shopFilter";
import { getProductsByCategory } from "@/libs/actions/product.action";

type ShopContent = {
  user: IUser;
  fetchedProducts: IProduct[];
  productsWithNoLimit: IProduct[];
  page: number;
};

const ShopContent = ({
  user,
  fetchedProducts,
  productsWithNoLimit,
  page,
}: ShopContent) => {
  const [products, setProducts] = useState<IProduct[]>(fetchedProducts);

  const shopFilter = useSelector(shopFilterState);
  const { categoryArray } = shopFilter;

  // When the page changes, update the products data (without the useEffect, the products data will effect the change on the next render)
  useEffect(() => {
    // Check if you are filtering through the original products data, if so, then load more products from that filtered data. If not, load more data from the original data.
    if (categoryArray.length >= 1) {
      const setLoadMoreFilteredProduct = async () => {
        const modifiedProducts = await getProductsByCategory({
          categoryArray: categoryArray,
          limit: 8,
          page,
        });
        setProducts(modifiedProducts && modifiedProducts.data);
      };
      setLoadMoreFilteredProduct();
    } else {
      setProducts(fetchedProducts);
    }
  }, [page, fetchedProducts, categoryArray]);

  // Increment the page number and save the new page number in this nextPage variable.
  const nextPage = page + 1;

  return (
    <section className="flex gap-20">
      <ProductFilterBar
        productsWithNoLimit={productsWithNoLimit}
        fetchedProducts={fetchedProducts}
        setProducts={setProducts}
        page={page}
      />
      <div className="w-[75%]">
        <Collection user={user} products={products} type="shop" title="Shop" />
        <div className="mt-12 flex items-center justify-center">
          <Link
            href={`?page=${nextPage}`}
            className="w-fit py-2 px-4 bg-transparent
            text-[#272829] border-[1px] border-solid border-[#272829]
            hover:transition hover:bg-[#272829] hover:text-white"
          >
            Load More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ShopContent;
