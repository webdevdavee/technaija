"use client";

import { IUser } from "@/libs/database/models/user.model";
import ProductFilterBar from "../ui/ProductFilterBar";
import Collection from "./Collection";
import { IProduct } from "@/libs/database/models/product.model";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { shopFilterState } from "@/libs/redux-state/features/shop-filter/shopFilter";
import { getProductsByFilter } from "@/libs/actions/product.action";
import ProductSort from "./ProductSort";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { createURL } from "@/libs/utils";
import { auth } from "@clerk/nextjs";

type ShopContent = {
  user: IUser;
  fetchedProducts: IProduct[];
  productsWithNoLimit: IProduct[];
  page: number;
  newLimit: number | undefined;
};

const ShopContent = ({
  user,
  fetchedProducts,
  productsWithNoLimit,
  page,
  newLimit,
}: ShopContent) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [products, setProducts] = useState<IProduct[]>(fetchedProducts);

  const [newProductsWithNoLimit, setNewProductsWithNoLimit] =
    useState<IProduct[]>(productsWithNoLimit);

  const [allProductsFetched, setAllProductsFetched] = useState<boolean>();

  const shopFilter = useSelector(shopFilterState);
  const { modelFilterArray } = shopFilter;

  const categorySearchParams = new URLSearchParams(searchParams.toString());

  // When the page, fetchedProducts, modelFilterArray changes, update the products data (without the useEffect, the products data will effect the change on the next render)
  // useEffect(() => {
  //   // Check if you are filtering through the original products data, if so, then load more products from that filtered data.
  //   if (
  //     categorySearchParams.getAll("category").length >= 1 ||
  //     modelFilterArray.length >= 1
  //   ) {
  //     const setLoadMoreFilteredProduct = async () => {
  //       const modifiedProducts = await getProductsByFilter({
  //         categoryFilterArray: categorySearchParams.getAll("category"),
  //         modelFilterArray: modelFilterArray,
  //         limit: 8,
  //         page,
  //       });
  //       setProducts(modifiedProducts && modifiedProducts.data);
  //       setAllProductsFetched(
  //         modifiedProducts &&
  //           modifiedProducts.newLimit > modifiedProducts.data.length
  //       );
  //     };
  //     setLoadMoreFilteredProduct();
  //   } else {
  //     // If not, load more data from the original data.
  //     setProducts(fetchedProducts);
  //     if (newLimit) {
  //       // Check if all products have been fetched from the database after pagination. If true, setAllProductsFetched to true (This will hide the load more button).
  //       setAllProductsFetched(newLimit >= productsWithNoLimit.length);
  //     }
  //   }
  // }, [page, fetchedProducts, modelFilterArray]);

  // When the page, fetchedProducts, modelFilterArray changes, update the products data (without the useEffect, the products data will effect the change on the next render)
  useEffect(() => {
    // Check if you are filtering through the original products data, if so, then load more products from that filtered data.
    if (
      categorySearchParams.getAll("category").length >= 1 ||
      categorySearchParams.getAll("model").length >= 1
    ) {
      const setLoadMoreFilteredProduct = async () => {
        const modifiedProducts = await getProductsByFilter({
          categoryFilterArray: categorySearchParams.getAll("category"),
          modelFilterArray: categorySearchParams.getAll("model"),
          limit: 8,
          page,
        });
        setProducts(modifiedProducts && modifiedProducts.data);
        setAllProductsFetched(
          modifiedProducts &&
            modifiedProducts.newLimit > modifiedProducts.data.length
        );
      };
      setLoadMoreFilteredProduct();
    } else {
      // If not, load more data from the original data.
      setProducts(fetchedProducts);
      if (newLimit) {
        // Check if all products have been fetched from the database after pagination. If true, setAllProductsFetched to true (This will hide the load more button).
        setAllProductsFetched(newLimit >= productsWithNoLimit.length);
      }
    }
  }, [page, fetchedProducts]);

  // Increment the page number and save the new page number in this nextPage variable.
  const nextPage = page + 1;

  const paginate = () => {
    categorySearchParams.set("page", nextPage.toString());
    const categoryURL = createURL(pathname, categorySearchParams);
    router.push(`${categoryURL}`);
  };

  return (
    <section className="flex gap-20">
      <ProductFilterBar
        productsWithNoLimit={productsWithNoLimit}
        newProductsWithNoLimit={newProductsWithNoLimit}
        setNewProductsWithNoLimit={setNewProductsWithNoLimit}
        fetchedProducts={fetchedProducts}
        setProducts={setProducts}
        page={page}
        categorySearchParams={categorySearchParams}
      />
      <div className="w-[75%]">
        <ProductSort
          products={products}
          setProducts={setProducts}
          fetchedProducts={fetchedProducts}
        />
        <Collection
          userId={userId}
          user={user}
          products={products}
          type="shop"
          title="Shop"
        />
        {!allProductsFetched && (
          <div className="mt-12 flex items-center justify-center">
            <p
              className="w-fit py-2 px-4 bg-transparent
            text-[#272829] border-[1px] border-solid border-[#272829]
            cursor-pointer hover:transition hover:bg-[#272829] hover:text-white"
              onClick={paginate}
            >
              Load More
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopContent;
