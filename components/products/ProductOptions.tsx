import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, ChangeEvent } from "react";
import QuantityCounter from "../utility/QuantityCounter";
import { IProduct } from "@/libs/database/models/product.model";
import Loader from "../ui/Loader";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import LinkButton from "../ui/LinkButton";

type ProductOptionProp = {
  product: IProduct;
  selectedModel: string;
  setSelectedModel: Dispatch<SetStateAction<string>>;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  addToCart: (product: IProduct) => Promise<void>;
  addToWishlist: (product: IProduct) => Promise<void>;
  showLoader: boolean;
  modelError?: boolean;
  setModelError?: Dispatch<SetStateAction<boolean>>;
};

const ProductOptions = ({
  product,
  selectedModel,
  setSelectedModel,
  quantity,
  setQuantity,
  addToCart,
  addToWishlist,
  showLoader,
  modelError,
  setModelError,
}: ProductOptionProp) => {
  const selectAModel = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(e.target.value);
    setModelError?.(false);
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  const renderModelSelection = () => {
    if (!product.additional_information?.model?.length) return null;

    return (
      <>
        <span className="w-full flex items-center justify-between">
          <p>
            model: <span className="font-semibold">{selectedModel}</span>
          </p>
          <Image
            className="cursor-pointer"
            src="/close.svg"
            width={20}
            height={20}
            alt="close"
            onClick={() => setSelectedModel("")}
          />
        </span>
        <span className="relative w-full">
          <Image
            className="absolute right-3 top-3"
            src="/arrow-down.svg"
            width={20}
            height={20}
            alt="arrow"
          />
          <select
            className="p-2 border-[1px] border-gray-300 focus:outline-none w-full appearance-none cursor-pointer"
            name="options"
            onChange={selectAModel}
            value={selectedModel || "Choose an option"}
          >
            {!selectedModel && (
              <option value="Choose an option">Choose an option</option>
            )}
            {product.additional_information.model.map((data) => (
              <option key={data._id} value={data.text}>
                {data.text}
              </option>
            ))}
          </select>
          {modelError && (
            <p className="text-red-500 text-base">Select a model</p>
          )}
        </span>
      </>
    );
  };

  const renderActionButtons = () => {
    const buttonClass = `w-[13rem] text-center py-2 px-10 capitalize bg-[#272829] text-white transition duration-500 hover:bg-black hover:transition m:w-full ${
      selectedModel === "" || showLoader
        ? "bg-gray-300 cursor-not-allowed hover:bg-gray-300 transition duration-500"
        : ""
    }`;
    const isDisabled = selectedModel === "" || showLoader;

    return (
      <>
        <SignedOut>
          <LinkButton
            link="sign-in"
            classname={buttonClass}
            text={
              showLoader ? (
                <Loader className={"loader2"} />
              ) : (
                <p className="capitalize">add to cart</p>
              )
            }
            disabled={isDisabled}
          />
        </SignedOut>
        <SignedIn>
          <button
            type="button"
            className={buttonClass}
            disabled={isDisabled}
            onClick={() => addToCart(product)}
          >
            {showLoader ? <Loader className={"loader2"} /> : <p>add to cart</p>}
          </button>
        </SignedIn>
      </>
    );
  };

  const renderWishlistButton = () => {
    const buttonClass = `flex gap-4 items-center py-2 px-6 transition duration-500 border-[1px] border-gray-300 m:w-full m:justify-center ${
      selectedModel === "" || showLoader
        ? "bg-gray-300 cursor-not-allowed transition duration-500"
        : ""
    }`;
    const isDisabled = selectedModel === "" || showLoader;

    return (
      <>
        <SignedOut>
          <Link href="/sign-in" className="m:w-full">
            <button type="button" className={buttonClass} disabled={isDisabled}>
              {showLoader ? (
                <Loader className={"loader2"} />
              ) : (
                <p className="capitalize">wishlist</p>
              )}
              <Image src="/heart.svg" width={20} height={20} alt="wishlist" />
            </button>
          </Link>
        </SignedOut>
        <SignedIn>
          <button
            type="button"
            className={buttonClass}
            disabled={isDisabled}
            onClick={() => addToWishlist(product)}
          >
            {showLoader ? (
              <Loader className={"loader2"} />
            ) : (
              <p className="capitalize">wishlist</p>
            )}
            <Image src="/heart.svg" width={20} height={20} alt="wishlist" />
          </button>
        </SignedIn>
      </>
    );
  };

  return (
    <section className="w-full flex flex-col items-start gap-8 m:gap-4 m:my-4 xl:gap-4 xl:mb-6">
      {renderModelSelection()}
      <span className="flex items-center gap-4 m:flex-col m:w-full">
        <QuantityCounter
          type="productpage"
          quantity={quantity}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
        />
        {renderActionButtons()}
      </span>
      {renderWishlistButton()}
    </section>
  );
};

export default ProductOptions;
