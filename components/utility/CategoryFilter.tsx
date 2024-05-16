import Image from "next/image";
import { getProductsByFilter } from "@/libs/actions/product.action";
import { Dispatch, SetStateAction } from "react";
import { IProduct } from "@/libs/database/models/product.model";
import { ChangeEvent } from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setCategoryFilterArray,
  setModelFilterArray,
} from "@/libs/redux-state/features/shop-filter/shopFilter";
import { usePathname, useRouter } from "next/navigation";
import { createURL } from "@/libs/utils";

type CategoryFilterProp = {
  uniqueCategories: string[];
  categoryCounts: {
    [key: string]: number;
  };
  setProducts: Dispatch<SetStateAction<IProduct[]>>;
  page: number;
  fetchedProducts: IProduct[];
  productsWithNoLimit: IProduct[];
  setNewProductsWithNoLimit: Dispatch<SetStateAction<IProduct[]>>;
  categorySearchParams: URLSearchParams;
  setShowMobileFilter: Dispatch<SetStateAction<boolean>>;
};
const CategoryFilter = ({
  uniqueCategories,
  categoryCounts,
  setProducts,
  page,
  fetchedProducts,
  productsWithNoLimit,
  setNewProductsWithNoLimit,
  categorySearchParams,
  setShowMobileFilter,
}: CategoryFilterProp) => {
  const [showFilter, setShowFilter] = useState(true);

  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const handleShowFilter = () => {
    setShowFilter((prev) => !prev);
  };

  // A clean-up function to set the categoryFilterArray and modelFilterArray to an empty array so the data doesn't leak up to the next page
  useEffect(() => {
    return () => {
      dispatch(setCategoryFilterArray([]));
      dispatch(setModelFilterArray([]));
    };
  }, []);

  const handleCategoryFilter = async (
    e: ChangeEvent<HTMLInputElement>,
    category: string
  ) => {
    if (e.currentTarget.checked === true) {
      // Get the name and checked values or state from the event
      const name = e.target.name;
      const checked = e.target.checked;
      // Set the category data in the array created from the ".append" method, in the URL
      categorySearchParams.append("category", category);
      // Set the checked state or value of the category input in the URL
      categorySearchParams.set(name, checked.toString());
      // Call a function that creates a URL string with the data from categorySearchParams
      const url = createURL(pathname, categorySearchParams);
      // Push the created URL string to the URL
      router.push(url);
      // Fetch data from data
      const modifiedProducts = await getProductsByFilter({
        categoryFilterArray: categorySearchParams.getAll("category"),
        limit: 8,
        page,
      });
      // Set the main products data to the retrieved data from the database
      setProducts(modifiedProducts && modifiedProducts.data);
      // Set the ProductsWithNoLimit array to get it's new data from the retrieved data from the database
      setNewProductsWithNoLimit(modifiedProducts && modifiedProducts.data);
    } else if (e.currentTarget.checked === false) {
      // Get the name value or state from the event
      const name = e.target.name;
      // Delete the category from URL "category" array
      categorySearchParams.delete("category", category);
      // Delete the category checked state from URL
      categorySearchParams.delete(name);
      // Call a function that creates a URL string with the data from categorySearchParams
      const url = createURL(pathname, categorySearchParams);
      // Push the created URL string to the URL
      router.push(url);
      // Fetch data from data
      const modifiedProducts = await getProductsByFilter({
        categoryFilterArray: categorySearchParams.getAll("category"),
        limit: 8,
        page,
      });
      setProducts(
        modifiedProducts && modifiedProducts.data.length >= 1
          ? modifiedProducts.data
          : fetchedProducts
      );
      setNewProductsWithNoLimit(
        modifiedProducts && modifiedProducts.data.length >= 1
          ? modifiedProducts.data
          : productsWithNoLimit
      );
    } else {
      setProducts(fetchedProducts);
    }
    setShowMobileFilter(false);
  };

  const handleCheckboxClick = (
    e: ChangeEvent<HTMLInputElement>,
    category: string
  ) => {
    handleCategoryFilter(e, category);
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
            {uniqueCategories.map((category, index) => {
              return (
                <div key={index} className="flex items-center gap-3">
                  <input
                    name={category}
                    className="cursor-pointer"
                    type="checkbox"
                    checked={
                      categorySearchParams.get(category) === "true" || false
                    }
                    onChange={(e) => handleCheckboxClick(e, category)}
                  />
                  <p className="text-sm text-gray-500">
                    {category} ({categoryCounts[category]})
                  </p>
                </div>
              );
            })}
          </span>
        )}
      </div>
    </section>
  );
};

export default CategoryFilter;
