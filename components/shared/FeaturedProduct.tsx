import Collection from "./Collection";
import { getAllProducts } from "@/libs/actions/product.action";
import { IProduct } from "@/libs/database/models/product.model";
import { IUser } from "@/libs/database/models/user.model";

type CollectionProps = {
  user: IUser;
  userId: string;
  type: string;
  limit: number;
  title: string;
  subtitle?: string;
};

const FeaturedProduct = async ({
  user,
  userId,
  type,
  limit,
  title,
  subtitle,
}: CollectionProps) => {
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
        userId={userId}
        user={user}
        products={products}
        type={type}
        title={title}
        subtitle={subtitle}
      />
    </section>
  );
};

export default FeaturedProduct;
