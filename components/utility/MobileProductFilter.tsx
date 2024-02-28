import ProductFilterBar from "../products/ProductFilterBar";
import { IProduct } from "@/libs/database/models/product.model";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

type MobileProductFilterBarProp = {
  productsWithNoLimit: IProduct[];
  newProductsWithNoLimit: IProduct[];
  fetchedProducts: IProduct[];
  setProducts: Dispatch<SetStateAction<IProduct[]>>;
  setNewProductsWithNoLimit: Dispatch<SetStateAction<IProduct[]>>;
  page: number;
  categorySearchParams: URLSearchParams;
  setShowMobileFilter: Dispatch<SetStateAction<boolean>>;
};

const MobileProductFilter = ({
  productsWithNoLimit,
  newProductsWithNoLimit,
  setNewProductsWithNoLimit,
  fetchedProducts,
  setProducts,
  page,
  categorySearchParams,
  setShowMobileFilter,
}: MobileProductFilterBarProp) => {
  return (
    <section className="w-[100%] bg-white z-[55] fixed top-0 left-0 right-0 bottom-0 animate-slideIn px-8 pt-24 xl:hidden xxl:hidden xxxl:hidden ultra:hidden">
      <Image
        className="absolute top-8 right-3"
        src="/close.svg"
        width={40}
        height={40}
        alt="close"
        onClick={() => setShowMobileFilter(false)}
      />
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
    </section>
  );
};

export default MobileProductFilter;
