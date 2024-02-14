"use client";

import Image from "next/image";
import Link from "next/link";
import QuantityCounter from "../ui/QuantityCounter";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOverlay } from "@/libs/redux-state/features/overlay/overSlice";
import { setSlideInCart } from "@/libs/redux-state/features/slide-in-cart/slideInCart";
import Loader from "../ui/Loader";
import { updateUser, getUserById } from "@/libs/actions/user.action";
import { slideInCartState } from "@/libs/redux-state/features/slide-in-cart/slideInCart";
import { usePathname } from "next/navigation";
import { currentUserID } from "@/userID";
import { formatNumber } from "@/libs/utils";

type SlideInCartProp = {
  fetchedUser?: IUser;
};

const SlideInCart = ({ fetchedUser }: SlideInCartProp) => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const [user, setUser] = useState<IUser>();

  // useEffect(() => {
  //   // Define an async function to get the user data
  //   const getUser = async () => {
  //     // Await the response from the getUserById function
  //     // The getUserById function takes the current user ID as an argument and returns an IUser object
  //     const currentUser: IUser = await getUserById(currentUserID);
  //     // Update the user state with the fetched user object
  //     setUser(currentUser);
  //   };
  //   getUser();
  // }, [pathname, fetchedUser]);
  // The pathname is the current URL of the browser
  // The fetchedUser is the user object returned by the getUserById function

  const theCart = useSelector(slideInCartState);
  const { showSlideInCart } = theCart;

  const [showLoader, setShowLoader] = useState(false);

  // Array to hold total amounts for each cart item
  // const totals =
  //   user &&
  //   user.cart.map((item) => {
  //     const total = item.price * item.quantity;
  //     return total;
  //   });

  // // Use reduce to sum up the numbers
  // const grandTotal =
  //   totals &&
  //   totals.reduce((a, b) => {
  //     return a + b;
  //   }, 0);

  // Close cart
  const handleCloseCart = () => {
    dispatch(setOverlay(false));
    dispatch(setSlideInCart(false));
    document.body.classList.remove("no_scroll");
  };

  // const removeFromCart = async (item: UserCart) => {
  //   // Check if there is a current user logged in
  //   if (user) {
  //     // Find the index of the item in the user's cart by matching the item's _id property
  //     const itemIndex = user.cart.findIndex(
  //       (cartItem) => cartItem._id === item._id
  //     );

  //     // If the item is found in the cart, remove it using the splice method
  //     if (itemIndex !== -1) {
  //       user.cart.splice(itemIndex, 1);
  //       // Show loader
  //       setShowLoader(true);
  //     }

  //     // Update the user's data on the server using the updateUser function
  //     // Pass the updated user object and the product's path as arguments
  //     await updateUser({
  //       updatedUser: user,
  //       path: "/cart",
  //     });
  //     // Remove loader
  //     setShowLoader(false);
  //   }
  // };

  return (
    <section
      className="w-[35%] bottom-0 fixed top-0 right-0 ease-in-out transition duration-300 p-4 bg-white z-[56] drop-shadow-md animate-slideIn"
      style={{ display: showSlideInCart ? "block" : "none" }}
    >
      <div>
        <div className="relative">
          <h1 className="border-b-[1px] p-4 text-center">Your Cart</h1>
          <button type="button">
            <Image
              className="absolute top-[15%] right-[5%]"
              src="/close.svg"
              width={30}
              height={30}
              alt="close"
              onClick={handleCloseCart}
            />
          </button>
        </div>
        <div className="custom-scrollbar overflow-y-scroll h-[19rem] w-full flex flex-col gap-4 items-start">
          {showLoader && (
            <section className="absolute w-full h-screen top-0 bottom-0 transition-[0.3] ease-in-out duration-300 left-0 right-0 bg-white opacity-70 z-[56]">
              <Loader className="loader" />
            </section>
          )}
          {/* {user && user.cart.length >= 1 ? (
            user.cart.map((item) => (
              <div
                key={item._id}
                className="w-full relative flex items-start gap-6 border-b-[1px] border-gray-300 pb-8"
              >
                <Image src={item.photo} width={120} height={120} alt="img" />
                <span className="flex flex-col items-start gap-6 pt-2">
                  <span className="flex flex-col gap-3">
                    <p className="text-sm capitalize font-semibold">
                      {item.name} - {item.model}
                    </p>
                    <p className="capitalize text-sm font-normal">
                      {formatNumber(item.price, "₦")}
                    </p>
                  </span>
                  <QuantityCounter
                    item={item}
                    user={user}
                    type="cart"
                    quantity={item.quantity}
                    setShowLoader={setShowLoader}
                  />
                </span>
                <button
                  className="absolute bottom-[28%] right-0 flex items-center gap-1"
                  type="button"
                  onClick={() => removeFromCart(item)}
                >
                  <Image src="/close.svg" width={20} height={20} alt="close" />
                  <p className="text-xs">remove</p>
                </button>
              </div>
            ))
          ) : (
            <div className="no_cart_item w-full flex flex-col gap-3 items-center justify-center">
              <p className="text-xl">Your cart is empty</p>
              <Link
                href={"/shop"}
                className="bg-[#272829] text-white p-4 w-fit hover:bg-black hover:transition"
                onClick={handleCloseCart}
              >
                Go shopping
              </Link>
            </div>
          )} */}
        </div>
        <div className="flex flex-col gap-12 mt-6">
          <span className="flex items-center justify-between">
            <p className="text-base capitalize text-black">Subtotal:</p>
            <p className="text-base capitalize text-black">
              {/* {formatNumber(grandTotal, "₦")} */}
            </p>
          </span>
          <span className="w-full flex flex-col gap-2">
            <Link
              className="bg-[#272829] text-white capitalize p-4 text-center hover:bg-black hover:transition hover:duration-200"
              href={"/cart"}
              onClick={handleCloseCart}
            >
              View Cart
            </Link>
            <Link
              className="border-[1px] border-gray-400 bg-transparent capitalize p-4 text-center"
              href={"/checkout"}
              onClick={handleCloseCart}
            >
              Checkout
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
};

export default SlideInCart;
