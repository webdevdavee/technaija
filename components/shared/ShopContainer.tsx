import ShopContent from "./ShopContent";
import { getAllProducts } from "@/libs/actions/product.action";
import { IProduct } from "@/libs/database/models/product.model";
import { IUser } from "@/libs/database/models/user.model";
import { getUserById } from "@/libs/actions/user.action";
import { currentUserID } from "@/userID";

type ShopContainerProp = {
  page: number;
};

const ShopContainer = async ({ page }: ShopContainerProp) => {
  // // Await the response from the getUserById function and store it in a variable
  // // The function takes a user id as an argument and returns a user object of type IUser
  // const user: IUser = await getUserById(currentUserID);

  // Await the response from the getAllProducts function and store it in a variable
  // The function takes a limit(number) as an argument
  const fetchedProducts = await getAllProducts(8, page);

  let products: IProduct[] = [];
  let productsWithNoLimit: IProduct[] = [];
  let newLimit: number | undefined;
  if (fetchedProducts !== undefined) {
    products = fetchedProducts.products;

    // The productsWithNoLimit will be used to render the filter bar or options. This was separated from the above products data because when limits are set for the number of products to fetch from the database, it does not affect the number of categories rendered or displayed. So essentially, the categories filter will represent how many categories are present for EVERY product in the database.
    productsWithNoLimit = fetchedProducts.productsNoLimit;

    // The fetchedProducts.newLimit returns the multiple of the current page and the limit passed into the getAllProducts function(8)
    if (fetchedProducts.newLimit) newLimit = fetchedProducts?.newLimit;
  }

  return (
    <section>
      <ShopContent
        // user={user}
        fetchedProducts={products}
        productsWithNoLimit={productsWithNoLimit}
        page={page}
        newLimit={newLimit && newLimit}
      />
    </section>
  );
};

export default ShopContainer;
