"use client";

import { useState } from "react";
import { IProduct } from "@/libs/database/models/product.model";
import ProductTabs from "./ProductTabs";
import { updateUser, getUserById } from "@/libs/actions/user.action";
import { IUser } from "@/libs/database/models/user.model";
import ProductGallery from "./ProductGallery";
import ProductOptions from "./ProductOptions";
import ProductInfo from "./ProductInfo";
import AlertBox from "../ui/AlertBox";
import { currentUserID } from "@/userID";
import { setCartCount } from "@/libs/redux-state/features/cart-count/cartCountSlice";
import { useDispatch } from "react-redux";

type Prop = {
  product: IProduct;
};

type CartItem = {
  name: string;
  price: number;
  quantity: number;
  photo: string;
  model: string;
};

type WishlistItem = { name: string; image: string; price: number };

const ProductDetails = ({ product }: Prop) => {
  const dispatch = useDispatch();

  const [selectedModel, setSelectedModel] = useState(
    product.additional_information?.model?.[0]?.text
  );

  const [currentImage, setCurrentImage] = useState(product.featured_image);

  const [showCartAlertBox, setShowCartAlertBox] = useState(false);

  const [showWishlistAlertBox, setShowWishlistAlertBox] = useState(false);

  const [quantity, setQuantity] = useState(1);

  const [showLoader, setShowLoader] = useState(false);

  // Define an async function that takes a product of type IProduct as a parameter
  // const addToCart = async (product: IProduct) => {
  //   // Await the response from the getUserById function and store it in a variable
  //   // The function takes a user id as an argument and returns a user object of type IUser
  //   const fetchedUser: IUser = await getUserById(currentUserID);

  //   // Create an object of type CartItem with the product's details
  //   const cartedProduct: CartItem = {
  //     name: product.name,
  //     model: selectedModel!, // Use the non-null assertion operator to indicate that selectedModel is not null or undefined
  //     quantity: quantity,
  //     photo: currentImage,
  //     price: product.sales_price ? product.sales_price : product.price, // Use the conditional operator to assign the product's sales price if it exists, otherwise use the regular price
  //   };

  //   // Use the spread operator to copy the properties of the fetched user
  //   const updatedUser = {
  //     ...fetchedUser,
  //     // Use the spread operator to add the cartedProduct to the beginning of the user's cart array
  //     cart: [cartedProduct, ...fetchedUser.cart],
  //   };

  //   // Show loader on the add to cart button
  //   setShowLoader(true);

  //   // Update the user's data on the server using the updateUser function
  //   // Pass an object with the updatedUser and the product's path as properties
  //   await updateUser({
  //     updatedUser,
  //     path: "/cart",
  //   });

  //   dispatch(setCartCount(updatedUser.cart.length));

  //   // Show a success status message or alert box when a product is added to cart
  //   setShowCartAlertBox(true);

  //   // Remove loader from the add to cart button
  //   setShowLoader(false);

  //   // After 3 seconds remove the alert message or alert box
  //   setTimeout(() => {
  //     setShowCartAlertBox(false);
  //   }, 4000);
  // };

  // const addToWishlist = async (product: IProduct) => {
  //   // Await the response from the getUserById function and store it in a variable
  //   // The function takes a user id as an argument and returns a user object of type IUser
  //   const fetchedUser: IUser = await getUserById(currentUserID);

  //   // Create an object of type WishlistItem with the product's details
  //   const wishlistProduct: WishlistItem = {
  //     name: product.name,
  //     price: product.sales_price ? product.sales_price : product.price, // Use the conditional operator to assign the product's sales price if it exists, otherwise use the regular price
  //     image: currentImage,
  //   };

  //   // Use the spread operator to copy the properties of the fetched user
  //   const updatedUser = {
  //     ...fetchedUser,
  //     // Use the spread operator to add the cartedProduct to the beginning of the user's cart array
  //     wishlist: [wishlistProduct, ...fetchedUser.wishlist],
  //   };

  //   // Show loader on the add to cart button
  //   setShowLoader(true);

  //   // Update the user's data on the server using the updateUser function
  //   // Pass an object with the updatedUser and the product's path as properties
  //   await updateUser({
  //     updatedUser,
  //     path: "/wishlist",
  //   });

  //   // Show a success status message or alert box when a product is added to cart
  //   setShowWishlistAlertBox(true);

  //   // Remove loader from the add to cart button
  //   setShowLoader(false);

  //   // After 3 seconds remove the alert message or alert box
  //   setTimeout(() => {
  //     setShowWishlistAlertBox(false);
  //   }, 4000);
  // };

  return (
    <>
      <div className="relative w-full grid grid-cols-2 justify-between bg-white py-8">
        {showCartAlertBox && <AlertBox type="success" feature="cart" />}
        {showWishlistAlertBox && <AlertBox type="success" feature="wishlist" />}
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
            // addToCart={addToCart}
            // addToWishlist={addToWishlist}
            showLoader={showLoader}
          />
        </div>
      </div>
      <ProductTabs product={product} />
    </>
  );
};
export default ProductDetails;
