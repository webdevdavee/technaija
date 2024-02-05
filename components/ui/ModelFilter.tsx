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

type ModelFilterProp = {
  models: string[];
  setProducts: Dispatch<SetStateAction<IProduct[]>>;
  page: number;
  fetchedProducts: IProduct[];
};

const ModelFilter = ({
  models,
  setProducts,
  page,
  fetchedProducts,
}: ModelFilterProp) => {
  const dispatch = useDispatch();

  const shopFilter = useSelector(shopFilterState);
  const { categoryFilterArray } = shopFilter;

  const [showFilter, setShowFilter] = useState(true);

  const handleShowFilter = () => {
    setShowFilter((prev) => !prev);
  };

  const modelFilterArray = useRef<string[]>([]);

  const handleModelFilter = async (
    e: ChangeEvent<HTMLInputElement>,
    model: string
  ) => {
    if (e.currentTarget.checked === true && e.currentTarget.id === model) {
      // Make a copy of the initial model array
      modelFilterArray.current = [...modelFilterArray.current];
      // Push the model to the current array
      modelFilterArray.current.push(model);
      dispatch(setModelFilterArray(modelFilterArray.current));
      // Use the callback function to get the new state value
      const modifiedProducts = await getProductsByFilter({
        modelFilterArray: modelFilterArray.current,
        limit: 8,
        page,
      });
      setProducts(modifiedProducts && modifiedProducts.data);
    } else if (
      e.currentTarget.checked === false &&
      e.currentTarget.id === model
    ) {
      // Filter out the model from the current array
      const modelToRemove = modelFilterArray.current.filter(
        (themodel) => themodel !== model
      );
      // Assign the filtered array to the current array
      modelFilterArray.current = modelToRemove;
      dispatch(setModelFilterArray(modelFilterArray.current));
      const modifiedProducts = await getProductsByFilter({
        modelFilterArray: modelFilterArray.current,
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
                    id={model}
                    className="cursor-pointer"
                    type="checkbox"
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
