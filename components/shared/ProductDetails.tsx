"use client";

import { useState } from "react";
import { IProduct } from "@/libs/database/models/product.model";
import ProductTabs from "./ProductTabs";
import Overlay from "./Overlay";
import SlideInCart from "./SlideInCart";
import { useSelector } from "react-redux";
import { overlayState } from "@/libs/redux-state/features/overlay/overSlice";
import { slideInCartState } from "@/libs/redux-state/features/slide-in-cart/slideInCart";
import { updateUser, getAllUsers } from "@/libs/actions/user.action";
import { IUser } from "@/libs/database/models/user.model";
import ProductGallery from "./ProductGallery";
import ProductOptions from "./ProductOptions";
import ProductInfo from "./ProductInfo";
import { getCartItems } from "@/libs/actions/user.action";

type Prop = {
  product: IProduct;
};

type CartItem = {
  name: string;
  price: string;
  quantity: number;
  photo: string;
  model: string;
};

const ProductDetails = ({ product }: Prop) => {
  const [selectedModel, setSelectedModel] = useState(
    product.additional_information?.model?.[0].text
  );

  const [currentImage, setCurrentImage] = useState(product.featured_image);

  const [quantity, setQuantity] = useState(1);

  const theoverlay = useSelector(overlayState);
  const { overlay } = theoverlay;

  const theCart = useSelector(slideInCartState);
  const { showSlideInCart } = theCart;

  const addToCart = async (product: IProduct) => {
    const fetchedUsers = await getAllUsers();
    let users: IUser[] = [];
    if (fetchedUsers !== undefined) {
      users = fetchedUsers.users;
    }

    console.log(users);

    const cartedProduct: CartItem = {
      name: product.name,
      model: selectedModel!,
      quantity: quantity,
      photo: currentImage,
      price: product.sales_price ? product.sales_price : product.price,
    };

    const updatedUser = {
      ...users[0],
      cart: [...users[0].cart, cartedProduct],
    };

    await updateUser({
      updatedUser,
      path: `/product/${product._id}`,
    });
  };

  return (
    <>
      <div className="relative w-full grid grid-cols-2 justify-between bg-white py-8">
        {overlay && <Overlay />}
        {showSlideInCart && <SlideInCart product={product} />}
        <ProductGallery
          data={product}
          currentImage={currentImage}
          setCurrentImage={setCurrentImage}
        />
        <div className="flex flex-col items-start gap-8">
          <ProductInfo product={product} />
          <ProductOptions
            product={product}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
            quantity={quantity}
            setQuantity={setQuantity}
            addToCart={addToCart}
          />
        </div>
      </div>
      <ProductTabs product={product} />
    </>
  );
};

export async function generateStaticParams() {
  const cartItems = await getCartItems("65a7fe321e748784eb40b55c");
  let cart: UserCart[] = [];
  if (cartItems !== undefined) {
    cart = cartItems;
  }
  return cart.map((cartItem) => ({
    id: cartItem._id,
  }));
}

export default ProductDetails;
