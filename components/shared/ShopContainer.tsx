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
  // Await the response from the getUserById function and store it in a variable
  // The function takes a user id as an argument and returns a user object of type IUser
  const user: IUser = await getUserById(currentUserID);

  // Await the response from the getAllProducts function and store it in a variable
  // The function takes a limit(number) as an argument
  const fetchedProducts = await getAllProducts(8, page);

  let products: IProduct[] = [];
  let productsWithNoLimit: IProduct[] = [];
  if (fetchedProducts !== undefined) {
    products = fetchedProducts.products;
    productsWithNoLimit = fetchedProducts.productsNoLimit;
  }

  return (
    <section>
      <ShopContent
        user={user}
        fetchedProducts={products}
        productsWithNoLimit={productsWithNoLimit}
        page={page}
        // totalPages={totalPages}
      />
    </section>
  );
};

export default ShopContainer;
