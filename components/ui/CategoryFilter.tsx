import Image from "next/image";
import { getProductsByCategory } from "@/libs/actions/product.action";
import { Dispatch, SetStateAction } from "react";
import { IProduct } from "@/libs/database/models/product.model";
import { ChangeEvent } from "react";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setCategoryArray } from "@/libs/redux-state/features/shop-filter/shopFilter";

type CategoryFilterProp = {
  uniqueCategories: string[];
  categoryCounts: {
    [key: string]: number;
  };
  setProducts: Dispatch<SetStateAction<IProduct[]>>;
  page: number;
  fetchedProducts: IProduct[];
};

const CategoryFilter = ({
  uniqueCategories,
  categoryCounts,
  setProducts,
  page,
  fetchedProducts,
}: CategoryFilterProp) => {
  const [showFilter, setShowFilter] = useState(true);
  const dispatch = useDispatch();

  const handleShowFilter = () => {
    setShowFilter((prev) => !prev);
  };

  const categoryArray = useRef<string[]>([]);

  const handleCategoryFilter = async (
    e: ChangeEvent<HTMLInputElement>,
    category: string
  ) => {
    if (e.currentTarget.checked === true) {
      // Make a copy of the initial category array
      categoryArray.current = [...categoryArray.current];
      // Push the category to the current array
      categoryArray.current.push(category);
      dispatch(setCategoryArray(categoryArray.current));
      // Use the callback function to get the new state value
      const modifiedProducts = await getProductsByCategory({
        categoryArray: categoryArray.current,
        limit: 8,
        page,
      });
      setProducts(modifiedProducts && modifiedProducts.data);
    } else if (e.currentTarget.checked === false) {
      // Filter out the category from the current array
      const categoryToRemove = categoryArray.current.filter(
        (thecategory) => thecategory !== category
      );
      // Assign the filtered array to the current array
      categoryArray.current = categoryToRemove;
      dispatch(setCategoryArray(categoryArray.current));
      const modifiedProducts = await getProductsByCategory({
        categoryArray: categoryArray.current,
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

  return (
    <section className="w-full">
      <div className="w-full flex flex-col gap-6">
        <button
          type="button"
          className="w-full flex items-center justify-between gap-5 border-b-[1px] border-b-solid border-gray-300 pb-4"
          onClick={handleShowFilter}
        >
          <h2>Category</h2>
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
            {uniqueCategories.map((category, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  onChange={(e) => handleCategoryFilter(e, category)}
                />
                <p className="text-sm text-gray-500">
                  {category} ({categoryCounts[category]})
                </p>
              </div>
            ))}
          </span>
        )}
      </div>
    </section>
  );
};

export default CategoryFilter;
