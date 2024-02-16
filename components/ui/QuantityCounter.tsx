import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { updateCartItem } from "@/libs/actions/cart.actions";
import { TCartItem } from "@/libs/database/models/cart.model";
import { usePathname } from "next/navigation";

type QuantityCounterProps = {
  item?: TCartItem;
  type: "cart" | "productpage";
  quantity: number;
  incrementQuantity?: () => void;
  decrementQuantity?: () => void;
  setShowLoader?: Dispatch<SetStateAction<boolean>>;
};

const QuantityCounter = ({
  item,
  type,
  quantity,
  incrementQuantity,
  decrementQuantity,
  setShowLoader,
}: QuantityCounterProps) => {
  const pathname = usePathname();

  const incrementCartProductQuantity = async () => {
    // Check if item is defined
    if (item && type === "cart") {
      const cartItem: TCartItem = { ...item, quantity: (quantity += 1) };

      setShowLoader && setShowLoader(true);
      // Update the cart in the database using the updateCartItem function
      await updateCartItem(cartItem, pathname);

      setShowLoader && setShowLoader(false);
    }
  };

  const decrementCartProductQuantity = async () => {
    // Check if item is defined
    if (item && type === "cart") {
      const cartItem: TCartItem = { ...item, quantity: (quantity -= 1) };

      setShowLoader && setShowLoader(true);
      // Update the cart in the database using the updateCartItem function
      await updateCartItem(cartItem, pathname);

      setShowLoader && setShowLoader(false);
    }
  };

  return (
    <span className="w-fit flex gap-8 items-center p-2 border-[1px] border-gray-300">
      <button
        className="disabled:cursor-not-allowed"
        disabled={quantity === 1 && true}
        type="button"
        onClick={
          type === "productpage"
            ? decrementQuantity
            : decrementCartProductQuantity
        }
      >
        <Image
          className="hover:bg-gray-200 hover:transition rounded-[50%]"
          src="/minus.svg"
          width={20}
          height={20}
          alt="minus"
        />
      </button>
      <p>{quantity}</p>
      <button
        type="button"
        onClick={
          type === "productpage"
            ? incrementQuantity
            : incrementCartProductQuantity
        }
      >
        <Image
          className="hover:bg-gray-200 hover:transition rounded-[50%]"
          src="/plus.svg"
          width={20}
          height={20}
          alt="plus"
        />
      </button>
    </span>
  );
};

export default QuantityCounter;
