import { IProduct } from "@/libs/database/models/product.model";
import CategoryFilter from "../utility/CategoryFilter";
import ModelFilter from "../utility/ModelFilter";
import { Dispatch, SetStateAction } from "react";

type ProductFilterBarProp = {
  productsWithNoLimit: IProduct[];
  newProductsWithNoLimit: IProduct[];
  fetchedProducts: IProduct[];
  setProducts: Dispatch<SetStateAction<IProduct[]>>;
  setNewProductsWithNoLimit: Dispatch<SetStateAction<IProduct[]>>;
  page: number;
  categorySearchParams: URLSearchParams;
};

const ProductFilterBar = async ({
  productsWithNoLimit,
  newProductsWithNoLimit,
  setNewProductsWithNoLimit,
  fetchedProducts,
  setProducts,
  page,
  categorySearchParams,
}: ProductFilterBarProp) => {
  // Get categories
  const categories = productsWithNoLimit.map((item) => {
    return item.original_category;
  });

  // If a category appears more than once, ignore duplicate
  const uniqueCategories = Array.from(new Set(categories));

  // Get numer of times each category appeared in the original array
  const categoryCounts = productsWithNoLimit.reduce<{
    [key: string]: number;
  }>((acc, item) => {
    const category = item.original_category;
    if (acc[category]) {
      acc[category]++;
    } else {
      acc[category] = 1;
    }
    return acc;
  }, {});

  // Create an empty set to store the unique model texts
  let uniqueModels: Set<string> = new Set();

  // Loop through the products array and the model array of each element
  for (let i = 0; i < newProductsWithNoLimit.length; i++) {
    const models = newProductsWithNoLimit[i].additional_information?.model;
    if (models) {
      for (let j = 0; j < models.length; j++) {
        // Add the model text to the set, which will automatically remove duplicates
        uniqueModels.add(models[j].text);
      }
    }
  }

  // Convert the set to an array
  const models = Array.from(uniqueModels);

  return (
    <aside className="w-[25%]">
      <section className="flex flex-col gap-10 items-start justify-start overflow-hidden">
        <CategoryFilter
          uniqueCategories={uniqueCategories}
          categoryCounts={categoryCounts}
          setProducts={setProducts}
          page={page}
          fetchedProducts={fetchedProducts}
          productsWithNoLimit={productsWithNoLimit}
          setNewProductsWithNoLimit={setNewProductsWithNoLimit}
          categorySearchParams={categorySearchParams}
        />
        <ModelFilter
          models={models}
          setProducts={setProducts}
          page={page}
          fetchedProducts={fetchedProducts}
          categorySearchParams={categorySearchParams}
        />
      </section>
    </aside>
  );
};

export default ProductFilterBar;
