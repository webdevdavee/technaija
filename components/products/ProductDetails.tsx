"use client";

import { useState } from "react";
import { IProduct } from "@/libs/database/models/product.model";
import ProductTabs from "./ProductTabs";
import ProductGallery from "./ProductGallery";
import ProductOptions from "./ProductOptions";
import ProductInfo from "./ProductInfo";
import AlertBox from "../ui/AlertBox";
import { setCartCount } from "@/libs/redux-state/features/cart-count/cartCountSlice";
import { useDispatch } from "react-redux";
import {
  addProductToCart,
  getTotalUserCart,
  getUserCartItems,
} from "@/libs/actions/cart.actions";
import {
  addProductToWishlist,
  getUserWishlistItems,
} from "@/libs/actions/wishlist.actions";
import { usePathname } from "next/navigation";

type Prop = {
  product: IProduct;
  userId: string;
};

const ProductDetails = ({ product, userId }: Prop) => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const [selectedModel, setSelectedModel] = useState(
    product.additional_information?.model?.[0]?.text
      ? product.additional_information?.model?.[0]?.text
      : "N/A"
  );

  const [currentImage, setCurrentImage] = useState(product.featured_image);

  const [showCartAlertBox, setShowCartAlertBox] = useState(false);

  const [showWishlistAlertBox, setShowWishlistAlertBox] = useState(false);

  const [quantity, setQuantity] = useState(1);

  const [showLoader, setShowLoader] = useState(false);

  const [productExistsInCart, setProductExistsInCart] = useState<boolean>();

  const [productExistsInWishlist, setProductExistsInWishlist] =
    useState<boolean>();

  // Define an async function that takes a product of type IProduct as a parameter
  const addToCart = async (product: IProduct) => {
    // Create an object of type CartItem with the product's details
    const cartedProduct: NewCartItem = {
      name: product.name,
      price: product.sales_price ? product.sales_price : product.price, // Use the conditional operator to assign the product's sales price if it exists, otherwise use the regular price
      quantity: quantity,
      photo: currentImage,
      model: selectedModel,
      category: product.original_category,
    };

    // Get user carted items or products
    const userCart: TCartItem[] = await getUserCartItems(userId);

    // Check if carted product exists in the user's cart
    const itemExists = userCart.some(
      (product: TCartItem) =>
        product.name === cartedProduct.name &&
        product.model === cartedProduct.model
    );

    // If not, add product to cart
    if (!itemExists) {
      setProductExistsInCart(false);
      // Show loader on the add to cart button
      setShowLoader(true);

      // Call server function to add product or item to the database Cart collection
      await addProductToCart({
        product: cartedProduct,
        userId,
        productId: product._id,
        path: pathname,
      });

      // Call server function to get the user's total carted products
      const userTotalCart = await getTotalUserCart(userId);

      // Set the total carted product number to the redux cartCount state
      dispatch(setCartCount(userTotalCart[0]?.count));

      // Show a success status message or alert box when a product is added to cart
      setShowCartAlertBox(true);

      // Remove loader from the add to cart button
      setShowLoader(false);

      // After 3 seconds remove the alert message or alert box
      setTimeout(() => {
        setShowCartAlertBox(false);
      }, 4000);
    }
    // If product exists, show error message
    else {
      setProductExistsInCart(true);
      // Show a success status message or alert box when a product is added to cart
      setShowCartAlertBox(true);

      // After 3 seconds remove the alert message or alert box
      setTimeout(() => {
        setShowCartAlertBox(false);
      }, 4000);
    }
  };

  const addToWishlist = async (product: IProduct) => {
    // Create an object of type WishlistItem with the product's details
    const wishlistProduct: WishlistItem = {
      name: product.name,
      price: product.sales_price ? product.sales_price : product.price, // Use the conditional operator to assign the product's sales price if it exists, otherwise use the regular price
      image: currentImage,
    };

    // Get user carted items or products
    const userWishlist: UserWishlist[] = await getUserWishlistItems(userId);

    // Check if carted product exists in the cart database of the user
    const itemExists = userWishlist.some(
      (product: UserWishlist) => product.name === wishlistProduct.name
    );

    if (!itemExists) {
      setProductExistsInWishlist(false);

      // Show loader on the add to cart button
      setShowLoader(true);

      // Call server function to add product or item to the database Wishlist collection
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
    } else {
      setProductExistsInWishlist(true);
      // Show a success status message or alert box when a product is added to cart
      setShowWishlistAlertBox(true);

      // After 3 seconds remove the alert message or alert box
      setTimeout(() => {
        setShowWishlistAlertBox(false);
      }, 4000);
    }
  };

  return (
    <>
      <div className="relative w-full grid grid-cols-2 justify-between bg-white py-8 m:flex m:flex-col">
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
            addToWishlist={addToWishlist}
            showLoader={showLoader}
          />
        </div>
      </div>
      <ProductTabs product={product} />
    </>
  );
};
export default ProductDetails;
