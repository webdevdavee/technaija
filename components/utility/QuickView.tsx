"use client";

import { useSelector, useDispatch } from "react-redux";
import { productState } from "@/libs/redux-state/features/product/productSlice";
import { quickviewState } from "@/libs/redux-state/features/quickview/quickviewSlice";
import { setQuickview } from "@/libs/redux-state/features/quickview/quickviewSlice";
import { setOverlay } from "@/libs/redux-state/features/overlay/overSlice";
import { useState } from "react";
import { IProduct } from "@/libs/database/models/product.model";
import { setCartCount } from "@/libs/redux-state/features/cart-count/cartCountSlice";
import {
  addProductToCart,
  getTotalUserCart,
  getUserCartItems,
} from "@/libs/actions/cart.actions";
import { usePathname } from "next/navigation";
import {
  addProductToWishlist,
  getUserWishlistItems,
} from "@/libs/actions/wishlist.actions";
import LargeQuickview from "./LargeQuickview";
import MobileQuickview from "./MobileQuickview";

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
      ? product.additional_information?.model?.[0]?.text
      : "N/A"
  );

  const [showCartAlertBox, setShowCartAlertBox] = useState(false);

  const [showWishlistAlertBox, setShowWishlistAlertBox] = useState(false);

  const [showLoader, setShowLoader] = useState(false);

  const [modelError, setModelError] = useState(false);

  const [productExistsInCart, setProductExistsInCart] = useState<boolean>();

  const [productExistsInWishlist, setProductExistsInWishlist] =
    useState<boolean>();

  // Define an async function that takes a product of type IProduct as a parameter
  const addToCart = async (product: IProduct) => {
    // Create an object of type CartItem with the product's details
    const cartedProduct: NewCartItem = {
      name: product.name,
      model: selectedModel, // Use the non-null assertion operator to indicate that selectedModel is not null or undefined
      quantity: quantity,
      photo: currentImage,
      price: product.sales_price ? product.sales_price : product.price, // Use the conditional operator to assign the product's sales price if it exists, otherwise use the regular price
      category: product.original_category,
      productId: product._id,
    };

    // Get user carted items or products
    const userCart: TCartItem[] = await getUserCartItems(userId);

    // Check if carted product exists in the cart database of the user
    const itemExists = userCart.some(
      (product: TCartItem) =>
        product.name === cartedProduct.name &&
        product.model === cartedProduct.model
    );

    // If not, add product to cart
    if (selectedModel !== undefined && !itemExists) {
      setProductExistsInCart(false);

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
    }
    // If product exists, show error message
    else {
      setModelError(true);

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

  const closeQuickview = () => {
    dispatch(setQuickview(false));
    dispatch(setOverlay(false));
    document.body.classList.remove("no_scroll");
  };

  return (
    <section>
      <LargeQuickview
        product={product}
        showQuickview={showQuickview}
        showCartAlertBox={showCartAlertBox}
        showWishlistAlertBox={showWishlistAlertBox}
        showLoader={showLoader}
        modelError={modelError}
        productExistsInCart={productExistsInCart}
        productExistsInWishlist={productExistsInWishlist}
        closeQuickview={closeQuickview}
        addToCart={addToCart}
        addToWishlist={addToWishlist}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        quantity={quantity}
        setQuantity={setQuantity}
        setModelError={setModelError}
      />
      <MobileQuickview
        product={product}
        showQuickview={showQuickview}
        showCartAlertBox={showCartAlertBox}
        showWishlistAlertBox={showWishlistAlertBox}
        showLoader={showLoader}
        modelError={modelError}
        productExistsInCart={productExistsInCart}
        productExistsInWishlist={productExistsInWishlist}
        closeQuickview={closeQuickview}
        addToCart={addToCart}
        addToWishlist={addToWishlist}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        quantity={quantity}
        setQuantity={setQuantity}
        setModelError={setModelError}
      />
    </section>
  );
};

export default QuickView;
