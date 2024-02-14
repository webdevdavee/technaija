import { IProduct } from "@/libs/database/models/product.model";
import { IUser } from "@/libs/database/models/user.model";
import Image from "next/image";
import { updateUser } from "@/libs/actions/user.action";
import { Dispatch, SetStateAction } from "react";

type Item = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  photo: string;
  model: string;
};

type QuantityCounterProps = {
  item?: Item;
  // user?: IUser;
  product?: IProduct;
  type: "cart" | "productpage";
  quantity: number;
  incrementQuantity?: () => void;
  decrementQuantity?: () => void;
  setShowLoader?: Dispatch<SetStateAction<boolean>>;
};

const QuantityCounter = ({
  item,
  // user,
  product,
  type,
  quantity,
  incrementQuantity,
  decrementQuantity,
  setShowLoader,
}: QuantityCounterProps) => {
  // const incrementCartProductQuantity = async () => {
  //   // Check if user and item are defined
  //   if (user && item) {
  //     // Find the index of the item in the user's cart
  //     const itemIndex = user.cart.findIndex(
  //       (cartItem) => cartItem._id === item._id
  //     );
  //     // If the item is found, increment its quantity by 1
  //     if (itemIndex !== -1) {
  //       user.cart[itemIndex].quantity += 1;
  //       setShowLoader && setShowLoader(true);
  //     }
  //     // Otherwise, push the item to the user's cart
  //     else {
  //       user.cart.push(item);
  //     }
  //     // Update the user in the database using the updateUser function
  //     await updateUser({
  //       updatedUser: user,
  //       path: `/product/${product && product._id}`,
  //     });
  //     setShowLoader && setShowLoader(false);
  //   }
  // };

  // const decrementCartProductQuantity = async () => {
  //   // Check if user and item are defined
  //   if (user && item) {
  //     // Find the index of the item in the user's cart
  //     const itemIndex = user.cart.findIndex(
  //       (cartItem) => cartItem._id === item._id
  //     );
  //     // If the item is found, decrement its quantity by 1
  //     if (itemIndex !== -1) {
  //       user.cart[itemIndex].quantity -= 1;
  //       if (user.cart[itemIndex]._id === item._id)
  //         setShowLoader && setShowLoader(true);
  //     }
  //     // Otherwise, push the item to the user's cart
  //     else {
  //       user.cart.push(item);
  //     }
  //     // Update the user in the database using the updateUser function
  //     await updateUser({
  //       updatedUser: user,
  //       path: `/product/${product && product._id}`,
  //     });
  //     setShowLoader && setShowLoader(false);
  //   }
  // };

  return (
    <span className="w-fit flex gap-8 items-center p-2 border-[1px] border-gray-300">
      <button
        className="disabled:cursor-not-allowed"
        disabled={quantity === 1 && true}
        type="button"
        // onClick={
        //   type === "productpage"
        //     ? decrementQuantity
        //     : decrementCartProductQuantity
        // }
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
        // onClick={
        //   type === "productpage"
        //     ? incrementQuantity
        //     : incrementCartProductQuantity
        // }
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
