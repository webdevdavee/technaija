import Image from "next/image";
import Link from "next/link";
import ProductInfo from "./ProductInfo";
import ProductOptions from "./ProductOptions";
import AlertBox from "../ui/AlertBox";
import { IProduct } from "@/libs/database/models/product.model";
import { Dispatch, SetStateAction } from "react";
import { formatNumber } from "@/libs/utils";

type MobileQuickviewProp = {
  product: IProduct;
  showQuickview: boolean;
  showCartAlertBox: boolean;
  showWishlistAlertBox: boolean;
  showLoader: boolean;
  modelError: boolean;
  productExistsInCart: boolean | undefined;
  productExistsInWishlist: boolean | undefined;
  closeQuickview: () => void;
  addToCart: (product: IProduct) => Promise<void>;
  addToWishlist: (product: IProduct) => Promise<void>;
  selectedModel: string | undefined;
  setSelectedModel: Dispatch<SetStateAction<string | undefined>>;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  setModelError: Dispatch<SetStateAction<boolean>>;
};

const MobileQuickview = ({
  product,
  showQuickview,
  showCartAlertBox,
  showWishlistAlertBox,
  showLoader,
  modelError,
  productExistsInCart,
  productExistsInWishlist,
  closeQuickview,
  addToCart,
  addToWishlist,
  selectedModel,
  setSelectedModel,
  quantity,
  setQuantity,
  setModelError,
}: MobileQuickviewProp) => {
  const stars = ["1", "2", "3", "4", "5"];

  return (
    <>
      {showQuickview && (
        <div className="fixed right-0 top-0 bottom-0 z-[56] w-[80%] h-screen bg-white overflow-y-auto xl:hidden xxl:hidden xxxl:hidden ultra:hidden">
          <button type="button" onClick={closeQuickview}>
            <Image
              className="absolute top-6 right-3 text-base"
              src="/close.svg"
              width={45}
              height={45}
              alt="close"
            />
          </button>
          <div className="w-full flex flex-col gap-3">
            <Image
              src={product.featured_image}
              width={500}
              height={500}
              quality={100}
              alt="product-image"
            />
            <Link
              href={`product/${product._id}`}
              className="w-full p-3 bg-red-500 text-center text-white"
            >
              See more product info
            </Link>
            <span className="flex items-center gap-1 px-3 my-4">
              {stars.map((_, index) => (
                <Image
                  key={index}
                  src="/star.svg"
                  width={15}
                  height={15}
                  alt="star"
                />
              ))}
              <p className="text-sm ml-4">
                Reviews ({product.reviews && product.reviews.length})
              </p>
            </span>
            <div className="flex flex-col gap-3 px-3">
              <h1 className="text-2xl font-semibold">{product.name}</h1>
              {product.sales_price ? (
                <div className="flex items-center gap-2">
                  <p className="line-through text-xl font-medium text-red-500">
                    {formatNumber(product.price, "₦")}
                  </p>
                  <p className="ml-3 text-xl">
                    {formatNumber(product.sales_price, "₦")}
                  </p>
                </div>
              ) : (
                <p className="text-xl">{formatNumber(product.price, "₦")}</p>
              )}
              <p className="text-sm">{product.short_description}</p>
              <ProductOptions
                product={product}
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
                quantity={quantity}
                setQuantity={setQuantity}
                addToCart={addToCart}
                addToWishlist={addToWishlist}
                showLoader={showLoader}
                modelError={modelError}
                setModelError={setModelError}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileQuickview;
