"use client";

import ProductFilterBar from "../products/ProductFilterBar";
import Collection from "../products/Collection";
import { IProduct } from "@/libs/database/models/product.model";
import { useState, useEffect } from "react";
import { getProductsByFilter } from "@/libs/actions/product.action";
import ProductSort from "../products/ProductSort";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { createURL } from "@/libs/utils";
import { TWishlistItem } from "@/libs/database/models/wishlist.model";
import MobileProductFilter from "./MobileProductFilter";
import Image from "next/image";

type ShopContent = {
  fetchedProducts: IProduct[];
  productsWithNoLimit: IProduct[];
  page: number;
  userId: string;
  userWishlist: TWishlistItem[];
};

const ShopContent = ({
  fetchedProducts,
  productsWithNoLimit,
  page,
  userId,
  userWishlist,
}: ShopContent) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [products, setProducts] = useState<IProduct[]>(fetchedProducts);

  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const [newProductsWithNoLimit, setNewProductsWithNoLimit] =
    useState<IProduct[]>(productsWithNoLimit);

  const categorySearchParams = new URLSearchParams(searchParams.toString());

  useEffect(() => {
    if (
      categorySearchParams.getAll("category").length >= 1 ||
      categorySearchParams.getAll("model").length >= 1
    ) {
      const setLoadMoreFilteredProduct = async () => {
        const modifiedProducts = await getProductsByFilter({
          categoryFilterArray: categorySearchParams.getAll("category"),
          modelFilterArray: categorySearchParams.getAll("model"),
          limit: 8 * page,
          page,
        });
        setProducts(modifiedProducts?.data);
      };
      setLoadMoreFilteredProduct();
    } else {
      // If not, load more data from the original data.
      setProducts(fetchedProducts);
    }
  }, [page, fetchedProducts]);

  const loadMoreProducts = () => {
    const newPage = page + 1;
    categorySearchParams.set("page", newPage.toString());
    const url = createURL(pathname, categorySearchParams);
    router.push(url);
  };

  return (
    <section className="flex gap-20 m:block xl:gap-14">
      <div className="m:hidden">
        <ProductFilterBar
          productsWithNoLimit={productsWithNoLimit}
          newProductsWithNoLimit={newProductsWithNoLimit}
          setNewProductsWithNoLimit={setNewProductsWithNoLimit}
          fetchedProducts={fetchedProducts}
          setProducts={setProducts}
          page={page}
          categorySearchParams={categorySearchParams}
          setShowMobileFilter={setShowMobileFilter}
        />
      </div>
      {showMobileFilter && (
        <MobileProductFilter
          productsWithNoLimit={productsWithNoLimit}
          newProductsWithNoLimit={newProductsWithNoLimit}
          setNewProductsWithNoLimit={setNewProductsWithNoLimit}
          fetchedProducts={fetchedProducts}
          setProducts={setProducts}
          page={page}
          categorySearchParams={categorySearchParams}
          setShowMobileFilter={setShowMobileFilter}
        />
      )}
      <div className="w-[75%] m:w-full">
        <div className="flex items-start justify-between gap-3 sm:flex-col">
          <button
            type="button"
            className="w-full flex items-center justify-between gap-3 p-2 border-[1px] border-gray-300 focus:outline-none xl:hidden xxl:hidden xxxl:hidden ultra:hidden"
            onClick={() => setShowMobileFilter((prev) => !prev)}
          >
            <p className="text-sm">Filter</p>
            <Image src="/filter.svg" width={20} height={20} alt="filter" />
          </button>
          <ProductSort
            products={products}
            setProducts={setProducts}
            fetchedProducts={fetchedProducts}
          />
        </div>
        <Collection
          userId={userId}
          products={products}
          type="shop"
          title="Shop"
          userWishlist={userWishlist}
        />
        <div className="mt-12 flex gap-6 items-center justify-center">
          <button
            type="button"
            className="w-fit py-2 px-4 bg-transparent
            text-[#272829] border-[1px] border-solid border-[#272829]
            cursor-pointer hover:transition hover:bg-[#272829] hover:text-white"
            onClick={loadMoreProducts}
          >
            Load More
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShopContent;
