import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import QuantityCounter from "../ui/QuantityCounter";
import { IProduct } from "@/libs/database/models/product.model";

type ProductOptionProp = {
  product: IProduct;
  selectedModel: string | undefined;
  setSelectedModel: Dispatch<SetStateAction<string | undefined>>;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  addToCart: (product: IProduct) => Promise<void>;
};

const ProductOptions = ({
  product,
  selectedModel,
  setSelectedModel,
  quantity,
  setQuantity,
  addToCart,
}: ProductOptionProp) => {
  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <section className="w-full flex flex-col items-start gap-8">
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
          onChange={(e) => setSelectedModel(e.target.value)}
          value={selectedModel === "" ? "Choose an option" : selectedModel}
        >
          {selectedModel === "" && (
            <option value="Choose an option">Choose an option</option>
          )}
          {product.additional_information?.model?.map((data) => (
            <option key={data.id} value={`${data.text}`}>
              {data.text}
            </option>
          ))}
        </select>
      </span>
      <span className="flex items-center gap-4">
        <QuantityCounter
          type="productpage"
          quantity={quantity}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
        />
        <button
          type="button"
          className={`py-2 px-10 capitalize bg-[#272829] text-white transition duration-500 hover:bg-black hover:transition ${
            selectedModel === "" &&
            "bg-gray-300 cursor-not-allowed hover:bg-gray-300 transition duration-500"
          }`}
          disabled={selectedModel === "" && true}
          onClick={() => addToCart(product)}
        >
          add to cart
        </button>
      </span>
      <button
        type="button"
        className={`flex gap-4 items-center py-2 px-6 capitalize transition duration-500 border-[1px] border-gray-300 ${
          selectedModel === "" &&
          "bg-gray-300 cursor-not-allowed transition duration-500"
        }`}
        disabled={selectedModel === "" && true}
      >
        wishlist
        <Image src="/heart.svg" width={20} height={20} alt="wishlist" />
      </button>
    </section>
  );
};

export default ProductOptions;
