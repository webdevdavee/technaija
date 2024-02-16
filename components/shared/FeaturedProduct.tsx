import Collection from "./Collection";
import { getAllProducts } from "@/libs/actions/product.action";
import { getUserWishlistItems } from "@/libs/actions/wishlist.actions";
import { IProduct } from "@/libs/database/models/product.model";

type CollectionProps = {
  type: string;
  limit: number;
  title: string;
  subtitle?: string;
  userId: string;
};

const FeaturedProduct = async ({
  type,
  limit,
  title,
  subtitle,
  userId,
}: CollectionProps) => {
  // Await the response from the getAllProducts function and store it in a variable
  // The function takes a limit(number) as an argument
  const fetchedProducts = await getAllProducts(limit);

  let products: IProduct[] = [];
  if (fetchedProducts !== undefined) {
    products = fetchedProducts.products;
  }

  const userWishlist = await getUserWishlistItems(userId);

  return (
    <section>
      <Collection
        userId={userId}
        products={products}
        type={type}
        title={title}
        subtitle={subtitle}
        userWishlist={userWishlist}
      />
    </section>
  );
};

export default FeaturedProduct;
