"use client";

import Image from "next/image";
import { useState, Dispatch, SetStateAction, ChangeEvent } from "react";
import { IProduct } from "@/libs/database/models/product.model";
import { getProductsByFilter } from "@/libs/actions/product.action";
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
  ): Promise<void> => {
    const { checked, name, id } = e.target;

    if (id !== model) {
      return;
    }

    if (checked) {
      categorySearchParams.append("model", model);
    } else {
      categorySearchParams.delete("model", model);
    }

    categorySearchParams.set(name, checked.toString());

    const url = createURL(pathname, categorySearchParams);
    router.push(url);

    const filterParams = {
      modelFilterArray: categorySearchParams.getAll("model"),
      limit: 8,
      page,
    };

    const modifiedProducts = await getProductsByFilter(filterParams);

    setProducts(
      modifiedProducts?.data.length >= 1
        ? modifiedProducts?.data
        : fetchedProducts
    );
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
