import Image from "next/image";
import Link from "next/link";
import ProductInfo from "./ProductInfo";
import ProductOptions from "./ProductOptions";
import AlertBox from "../ui/AlertBox";
import { IProduct } from "@/libs/database/models/product.model";
import { Dispatch, SetStateAction } from "react";

type LargeQuickviewProp = {
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

const LargeQuickview = ({
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
}: LargeQuickviewProp) => {
  return (
    <>
      {showQuickview && (
        <div className="relative quickview z-[55] w-[85%] drop-shadow-xl m:hidden">
          {showCartAlertBox && !productExistsInCart && (
            <AlertBox type="success" feature="cart" />
          )}
          {showCartAlertBox && productExistsInCart && (
            <AlertBox type="error" feature="cart" />
          )}
          {showWishlistAlertBox && !productExistsInWishlist && (
            <AlertBox type="success" feature="wishlist" />
          )}
          {showWishlistAlertBox && productExistsInWishlist && (
            <AlertBox type="error" feature="wishlist" />
          )}

          <div className="grid grid-cols-2 bg-white p-8">
            <Link
              href={`product/${product._id}`}
              onClick={() => closeQuickview()}
            >
              <Image
                src={product.featured_image}
                width={450}
                height={450}
                quality={100}
                alt="product-img"
              />
              <p className="absolute bottom-0 left-0 right-0 w-full bg-red-500 p-4 text-center text-white">
                See more product info
              </p>
            </Link>
            <div className="flex flex-col items-start gap-8">
              <div className="flex flex-col items-start gap-8">
                <ProductInfo product={product} />
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
          <button type="button" onClick={closeQuickview}>
            <Image
              className="absolute top-16 right-5 text-base"
              src="/close.svg"
              width={45}
              height={45}
              alt="close"
            />
          </button>
        </div>
      )}
    </>
  );
};

export default LargeQuickview;
