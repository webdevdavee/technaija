import ProductCard from "./ProductCard";
import { IProduct } from "@/libs/database/models/product.model";
import { TWishlistItem } from "@/libs/database/models/wishlist.model";

type CollectionProps = {
  products: IProduct[];
  type: string;
  title: string;
  subtitle?: string;
  userId: string;
  userWishlist: TWishlistItem[];
};

const Collection = async ({
  products,
  type,
  title,
  subtitle,
  userId,
  userWishlist,
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
            userWishlist={userWishlist}
            userId={userId}
          />
        ))}
      </div>
    </section>
  );
};

export default Collection;
