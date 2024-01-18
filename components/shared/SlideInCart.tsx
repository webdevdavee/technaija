"use client";

import Image from "next/image";
import Link from "next/link";
import QuantityCounter from "../ui/QuantityCounter";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setOverlay } from "@/libs/redux-state/features/overlay/overSlice";
import { setSlideInCart } from "@/libs/redux-state/features/slide-in-cart/slideInCart";
import { IUser } from "@/libs/database/models/user.model";
import { getUserById } from "@/libs/actions/user.action";
import { IProduct } from "@/libs/database/models/product.model";

type SlideInCartProp = {
  product: IProduct;
};

const SlideInCart = ({ product }: SlideInCartProp) => {
  const dispatch = useDispatch();

  const [currentUser, setCurrentUser] = useState<IUser>();

  const handleCloseCart = () => {
    dispatch(setOverlay(false));
    dispatch(setSlideInCart(false));
  };

  useEffect(() => {
    const getActiveUser = async () => {
      const fetchedUser = await getUserById("65a7fe321e748784eb40b55c");
      setCurrentUser(fetchedUser);
    };

    getActiveUser();
  }, []);

  return (
    <section className="w-[35%] bottom-0 fixed top-0 right-0 ease-in-out transition duration-300 p-4 bg-white z-[56] drop-shadow-md animate-slideIn">
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
      <div className="w-full h-[65%] overflow-y-auto flex flex-col gap-4 items-start">
        {currentUser && currentUser.cart.length >= 1 ? (
          currentUser.cart.map((item) => (
            <div
              key={item._id}
              className="w-full relative flex items-start gap-6"
            >
              <Image src={item.photo} width={120} height={120} alt="img" />
              <span className="flex flex-col items-start gap-6 pt-2">
                <span className="flex flex-col gap-3">
                  <p className="text-sm capitalize font-semibold">
                    {item.name} - {item.model}
                  </p>
                  <p className="capitalize text-sm font-normal">{item.price}</p>
                </span>
                <QuantityCounter
                  item={item}
                  user={currentUser}
                  product={product}
                  type="cart"
                  quantity={item.quantity}
                />
              </span>
              <button
                className="absolute bottom-[13%] right-0 flex items-center gap-1"
                type="button"
              >
                <Image src="/close.svg" width={20} height={20} alt="close" />
                <p className="text-xs">remove</p>
              </button>
            </div>
          ))
        ) : (
          <div className="w-full m-auto flex flex-col gap-3 items-center justify-center">
            <p className="text-xl">Your cart is empty</p>
            <Link href={"/shop"} className="bg-[#272829] text-white p-4 w-fit">
              Go shopping
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default SlideInCart;
