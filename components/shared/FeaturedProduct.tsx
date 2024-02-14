import Collection from "./Collection";
import { getAllProducts } from "@/libs/actions/product.action";
import { IProduct } from "@/libs/database/models/product.model";
import { IUser } from "@/libs/database/models/user.model";
import { getUserById } from "@/libs/actions/user.action";
import { currentUserID } from "@/userID";

type CollectionProps = {
  type: string;
  limit: number;
  title: string;
  subtitle?: string;
};

const FeaturedProduct = async ({
  type,
  limit,
  title,
  subtitle,
}: CollectionProps) => {
  // Await the response from the getUserById function and store it in a variable
  // The function takes a user id as an argument and returns a user object of type IUser
  // const user: IUser = await getUserById(currentUserID);

  // Await the response from the getAllProducts function and store it in a variable
  // The function takes a limit(number) as an argument
  const fetchedProducts = await getAllProducts(limit);

  let products: IProduct[] = [];
  if (fetchedProducts !== undefined) {
    products = fetchedProducts.products;
  }

  return (
    <section>
      <Collection
        // user={user}
        products={products}
        type={type}
        title={title}
        subtitle={subtitle}
      />
    </section>
  );
};

export default FeaturedProduct;
