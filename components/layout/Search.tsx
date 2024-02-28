"use client";

import Image from "next/image";
import Link from "next/link";
import SearchBox from "../ui/SearchBox";
import { getProductsBySearchInput } from "@/libs/actions/product.action";
import { useState, useEffect } from "react";
import { IProduct } from "@/libs/database/models/product.model";
import { formatNumber } from "@/libs/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  setSlideInSearch,
  slideInSearchState,
} from "@/libs/redux-state/features/slide-in-search/slideInSearch";
import { setOverlay } from "@/libs/redux-state/features/overlay/overSlice";

const Search = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<IProduct[]>([]);

  const theSlideInSearch = useSelector(slideInSearchState);
  const { showSlideInSearch } = theSlideInSearch;

  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await getProductsBySearchInput(query.trim());
      if (fetchedProducts) {
        setProducts(fetchedProducts.products);
      }
    };
    getProducts();
  }, [query]);

  // Close slide in search
  const handleCloseSearch = () => {
    dispatch(setOverlay(false));
    dispatch(setSlideInSearch(false));
    document.body.classList.remove("no_scroll");
  };

  return (
    <section
      className="w-[35%] bottom-0 fixed top-0 right-0 ease-in-out transition duration-300 p-4 bg-white z-[56] drop-shadow-md animate-slideIn m:w-[100%]"
      style={{ display: showSlideInSearch ? "block" : "none" }}
    >
      <div className="relative">
        <h1 className="border-b-[1px] p-4 text-center">Search Products</h1>
        <button type="button" onClick={handleCloseSearch}>
          <Image
            className="absolute top-[15%] right-[5%]"
            src="/close.svg"
            width={30}
            height={30}
            alt="close"
          />
        </button>
      </div>
      <div>
        <SearchBox query={query} setQuery={setQuery} />
        <div className="flex flex-col gap-4 mt-6 pt-6 border-t-[1px] border-t-gray-400 custom-scrollbar overflow-y-scroll h-[30rem]">
          {products.length >= 1 ? (
            products.map((product) => (
              <Link
                key={product._id}
                href={`/product/${product._id}`}
                onClick={handleCloseSearch}
              >
                <div className="flex items-center gap-6">
                  <Image
                    src={`${product.featured_image}`}
                    width={150}
                    height={150}
                    alt="product-img"
                  />
                  <span className="flex flex-col justify-center gap-2">
                    <p className="text-base font-medium">{product.name}</p>
                    <p className="text-base">
                      {formatNumber(product.price, "₦")}
                    </p>
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div
              className="no_cart_item w-full flex flex-col gap-3 items-center justify-center"
              style={{ display: query ? "flex" : "none" }}
            >
              <p className="text-base">Nothing matches your search</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Search;
