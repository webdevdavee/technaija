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
  ): Promise<void> => {
    const { checked, name } = e.target;

    if (checked) {
      categorySearchParams.append("category", category);
    } else {
      categorySearchParams.delete("category", category);
    }

    categorySearchParams.set(name, checked.toString());

    const url = createURL(pathname, categorySearchParams);
    router.push(url);

    const filterParams = {
      categoryFilterArray: categorySearchParams.getAll("category"),
      limit: 8,
      page,
    };

    const modifiedProducts = await getProductsByFilter(filterParams);

    if (modifiedProducts?.data.length >= 1) {
      setProducts(modifiedProducts?.data);
      setNewProductsWithNoLimit(modifiedProducts?.data);
    } else {
      setProducts(fetchedProducts);
      setNewProductsWithNoLimit(productsWithNoLimit);
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
                <div
                  key={`${category}-${index}`}
                  className="flex items-center gap-3"
                >
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
