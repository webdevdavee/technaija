import ProductCard from "../ui/ProductCard";
import { IProduct } from "@/libs/database/models/product.model";

type CollectionProps = {
  // user: IUser;
  products: IProduct[];
  type: string;
  title: string;
  subtitle?: string;
};

const Collection = async ({
  // user,
  products,
  type,
  title,
  subtitle,
}: CollectionProps) => {
  return (
    <section
      className={`${
        type === "shop" ? "px-0 py-0" : "px-20 py-8"
      } overflow-hidden`}
    >
      <div className="text-center">
        <h1
          className={`text-3xl ${
            type === "shop" && "text-left"
          } font-medium mb-2`}
        >
          {title}
        </h1>
        <h3 className="text-base">{subtitle}</h3>
      </div>
      <div className="grid grid-cols-4 gap-4 gap-y-12 mt-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            type={type}
            product={product}
            // user={user}
          />
        ))}
      </div>
    </section>
  );
};

export default Collection;
