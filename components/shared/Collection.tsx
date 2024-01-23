import ProductCard from "../ui/ProductCard";
import { getAllProducts } from "@/libs/actions/product.action";
import { IProduct } from "@/libs/database/models/product.model";
import { IUser } from "@/libs/database/models/user.model";
import { getUserById } from "@/libs/actions/user.action";
import { currentUserID } from "@/userID";

type CollectionProps = {
  title: string;
  subtitle?: string;
};

const Collection = async ({ title, subtitle }: CollectionProps) => {
  // Await the response from the getUserById function and store it in a variable
  // The function takes a user id as an argument and returns a user object of type IUser
  const fetchedUser: IUser = await getUserById(currentUserID);

  const fetchedProducts = await getAllProducts(4);

  let products: IProduct[] = [];
  if (fetchedProducts !== undefined) {
    products = fetchedProducts.products;
  }
  return (
    <section className="px-20 py-8 overflow-hidden">
      <div className="text-center">
        <h1 className="text-3xl font-medium mb-2">{title}</h1>
        <h3 className="text-base">{subtitle}</h3>
      </div>
      <div className="flex flex-wrap justify-between items-center gap-4 mt-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            fetchedUser={fetchedUser}
          />
        ))}
      </div>
    </section>
  );
};

export default Collection;
