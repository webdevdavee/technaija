"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatch, SetStateAction } from "react";
import { ChangeEvent } from "react";
import { IProduct } from "@/libs/database/models/product.model";
import { getProductsByFilter } from "@/libs/actions/product.action";
import { setModelFilterArray } from "@/libs/redux-state/features/shop-filter/shopFilter";
import { useSelector } from "react-redux";
import { shopFilterState } from "@/libs/redux-state/features/shop-filter/shopFilter";
import { usePathname, useRouter } from "next/navigation";
import { createURL } from "@/libs/utils";

type ModelFilterProp = {
  models: string[];
  setProducts: Dispatch<SetStateAction<IProduct[]>>;
  page: number;
  fetchedProducts: IProduct[];
  categorySearchParams: URLSearchParams;
  setShowMobileFilter: Dispatch<SetStateAction<boolean>>;
};

const ModelFilter = ({
  models,
  setProducts,
  page,
  fetchedProducts,
  categorySearchParams,
  setShowMobileFilter,
}: ModelFilterProp) => {
  const router = useRouter();
  const pathname = usePathname();

  const shopFilter = useSelector(shopFilterState);
  const { categoryFilterArray } = shopFilter;

  const [showFilter, setShowFilter] = useState(true);

  const handleShowFilter = () => {
    setShowFilter((prev) => !prev);
  };

  const handleModelFilter = async (
    e: ChangeEvent<HTMLInputElement>,
    model: string
  ) => {
    if (e.currentTarget.checked === true && e.currentTarget.id === model) {
      // Get the name and checked values or state from the event
      const name = e.target.name;
      const checked = e.target.checked;
      // Set the category data in the array created from the ".append" method, in the URL
      categorySearchParams.append("model", model);
      // Set the checked state or value of the category input in the URL
      categorySearchParams.set(name, checked.toString());
      // Call a function that creates a URL string with the data from categorySearchParams
      const categoryURL = createURL(pathname, categorySearchParams);
      // Push the created URL string to the URL
      router.push(`${categoryURL}`);
      // Fetch data from data
      const modifiedProducts = await getProductsByFilter({
        modelFilterArray: categorySearchParams.getAll("model"),
        limit: 8,
        page,
      });
      // Set the main products data to the retrieved data from the database
      setProducts(modifiedProducts && modifiedProducts.data);
    } else if (
      e.currentTarget.checked === false &&
      e.currentTarget.id === model
    ) {
      // Get the name value or state from the event
      const name = e.target.name;
      // Delete the category from URL "category" array
      categorySearchParams.delete("model", model);
      // Delete the category checked state from URL
      categorySearchParams.delete(name);
      // Call a function that creates a URL string with the data from categorySearchParams
      const categoryURL = createURL(pathname, categorySearchParams);
      // Push the created URL string to the URL
      router.push(`${categoryURL}`);
      // Fetch data from data
      const modifiedProducts = await getProductsByFilter({
        modelFilterArray: categorySearchParams.getAll("model"),
        limit: 8,
        page,
      });
      setProducts(
        modifiedProducts && modifiedProducts.data.length >= 1
          ? modifiedProducts.data
          : fetchedProducts
      );
    } else {
      setProducts(fetchedProducts);
    }
    setShowMobileFilter(false);
  };

  const handleCheckboxClick = (
    e: ChangeEvent<HTMLInputElement>,
    model: string
  ) => {
    handleModelFilter(e, model);
  };

  return (
    <>
      <section
        className="w-full"
        style={{
          display:
            categoryFilterArray.length === 1 &&
            categoryFilterArray[0] === "Accessories"
              ? "none"
              : "block",
        }}
      >
        <div className="w-full flex flex-col gap-6">
          <button
            type="button"
            className="w-full flex items-center justify-between gap-5 border-b-[1px] border-b-solid border-gray-300 pb-4"
            onClick={handleShowFilter}
          >
            <h2>Model</h2>
            <Image
              className={`${
                showFilter
                  ? "rotate-180 transition duration-150"
                  : "transition duration-150"
              }`}
              src="/arrow-down.svg"
              width={25}
              height={25}
              alt="arrow"
            />
          </button>
          {showFilter && (
            <span className="flex flex-col gap-4">
              {models.map((model) => (
                <div key={model} className="flex items-center gap-3">
                  <input
                    name={model}
                    id={model}
                    className="cursor-pointer"
                    type="checkbox"
                    checked={
                      categorySearchParams.get(model) === "true" || false
                    }
                    onChange={(e) => handleCheckboxClick(e, model)}
                  />
                  <p className="text-sm text-gray-500">{model}</p>
                </div>
              ))}
            </span>
          )}
        </div>
      </section>
      {/* )} */}
    </>
  );
};

export default ModelFilter;
