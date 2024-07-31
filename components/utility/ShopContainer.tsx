import ShopContent from "./ShopContent";
import { getAllProducts } from "@/libs/actions/product.action";
import { IProduct } from "@/libs/database/models/product.model";
import { TWishlistItem } from "@/libs/database/models/wishlist.model";

type ShopContainerProp = {
  page: number;
  userId: string;
  userWishlist: TWishlistItem[];
};

const ShopContainer = async ({
  page,
  userId,
  userWishlist,
}: ShopContainerProp) => {
  // Await the response from the getAllProducts function and store it in a variable
  // The function takes a limit(number) as an argument
  const fetchedProducts = await getAllProducts(8, page);

  let products: IProduct[] = [];
  let productsWithNoLimit: IProduct[] = [];
  if (fetchedProducts !== undefined) {
    products = fetchedProducts.products;

    /**  The productsWithNoLimit array is used to render the filter bar or options.
     * This is separate from the products data array, which may have limits on the number of products fetched from the database.
     * By using productsWithNoLimit, we ensure that the filter bar or options reflect all available categories across the entire database, regardless of any limits applied to the number of products displayed.
     * This means the categories filter represents all categories present in the database, not just those for the displayed products.
     */
    productsWithNoLimit = fetchedProducts.productsNoLimit;
  }

  return (
    <section>
      <ShopContent
        fetchedProducts={products}
        productsWithNoLimit={productsWithNoLimit}
        page={page}
        userId={userId}
        userWishlist={userWishlist}
      />
    </section>
  );
};

export default ShopContainer;
