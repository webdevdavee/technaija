"use client";

import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { productState } from "@/libs/redux-state/features/product/productSlice";
import { quickviewState } from "@/libs/redux-state/features/quickview/quickviewSlice";
import { setQuickview } from "@/libs/redux-state/features/quickview/quickviewSlice";
import { setOverlay } from "@/libs/redux-state/features/overlay/overSlice";
import { useState } from "react";
import { IProduct } from "@/libs/database/models/product.model";
import AlertBox from "../ui/AlertBox";
import Link from "next/link";
import ProductInfo from "./ProductInfo";
import ProductOptions from "./ProductOptions";
import { setCartCount } from "@/libs/redux-state/features/cart-count/cartCountSlice";
import {
  addProductToCart,
  getTotalUserCart,
} from "@/libs/actions/cart.actions";
import { usePathname } from "next/navigation";
import { addProductToWishlist } from "@/libs/actions/wishlist.actions";

type Quickview = {
  userId: string;
};

const QuickView = ({ userId }: Quickview) => {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const pathname = usePathname();

  const currentProduct = useSelector(productState);
  const { product } = currentProduct;

  const quickview = useSelector(quickviewState);
  const { showQuickview } = quickview;

  const currentImage = product.featured_image;

  const [selectedModel, setSelectedModel] = useState(
    product.additional_information?.model?.[0]?.text
  );

  const [showCartAlertBox, setShowCartAlertBox] = useState(false);

  const [showWishlistAlertBox, setShowWishlistAlertBox] = useState(false);

  const [showLoader, setShowLoader] = useState(false);

  const [modelError, setModelError] = useState(false);

  // Define an async function that takes a product of type IProduct as a parameter
  const addToCart = async (product: IProduct) => {
    // Create an object of type CartItem with the product's details
    const cartedProduct: CartItem = {
      name: product.name,
      model: selectedModel!, // Use the non-null assertion operator to indicate that selectedModel is not null or undefined
      quantity: quantity,
      photo: currentImage,
      price: product.sales_price ? product.sales_price : product.price, // Use the conditional operator to assign the product's sales price if it exists, otherwise use the regular price
    };

    if (selectedModel !== undefined) {
      // Show loader on the add to cart button
      setShowLoader(true);

      // Call server function to add product or item to the database Cart collection
      await addProductToCart({
        product: cartedProduct,
        userId,
        path: pathname,
      });

      // Call server function to get the user's total carted products
      const userCart = await getTotalUserCart(userId);

      // Set the total carted product number to the redux cartCount state
      dispatch(setCartCount(userCart[0]?.count));

      // Show a success status message or alert box when a product is added to cart
      setShowCartAlertBox(true);

      // Remove loader from the add to cart button
      setShowLoader(false);

      // After 3 seconds remove the alert message or alert box
      setTimeout(() => {
        setShowCartAlertBox(false);
      }, 4000);
    } else {
      setModelError(true);
    }
  };

  const addToWishlist = async (product: IProduct) => {
    // Create an object of type WishlistItem with the product's details
    const wishlistProduct: WishlistItem = {
      name: product.name,
      price: product.sales_price ? product.sales_price : product.price, // Use the conditional operator to assign the product's sales price if it exists, otherwise use the regular price
      image: currentImage,
    };

    // Show loader on the add to cart button
    setShowLoader(true);

    await addProductToWishlist({
      product: wishlistProduct,
      userId,
      path: pathname,
    });

    // Show a success status message or alert box when a product is added to cart
    setShowWishlistAlertBox(true);

    // Remove loader from the add to cart button
    setShowLoader(false);

    // After 3 seconds remove the alert message or alert box
    setTimeout(() => {
      setShowWishlistAlertBox(false);
    }, 4000);
  };

  const closeQuickview = () => {
    dispatch(setQuickview(false));
    dispatch(setOverlay(false));
  };

  return (
    <section
      className="relative quickview z-[55] w-[85%] drop-shadow-xl"
      style={{ display: showQuickview ? "block" : "none" }}
    >
      {showCartAlertBox && <AlertBox type="success" feature="cart" />}
      {showWishlistAlertBox && <AlertBox type="success" feature="wishlist" />}
      <div className="grid grid-cols-2 bg-white p-8">
        <Link href={`product/${product._id}`} onClick={() => closeQuickview()}>
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
    </section>
  );
};

export default QuickView;
