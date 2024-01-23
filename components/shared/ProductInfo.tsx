import { IProduct } from "@/libs/database/models/product.model";
import Image from "next/image";

type ProductInfoProp = {
  product: IProduct;
};

const ProductInfo = ({ product }: ProductInfoProp) => {
  const stars = ["1", "2", "3", "4", "5"];

  return (
    <section className="flex flex-col items-start gap-8">
      <span className="w-full flex items-center justify-between">
        <p className="text-gray-400 text-sm">{product.original_category}</p>
        <span className="flex items-center gap-1">
          {stars.map((_, index) => (
            <Image
              key={index}
              src="/star.svg"
              width={20}
              height={20}
              alt="star"
            />
          ))}
          <p className="text-sm ml-2">
            Reviews ({product.reviews && product.reviews.length})
          </p>
        </span>
      </span>
      <h1 className="text-2xl font-semibold">{product.name}</h1>
      {product.sales_price ? (
        <div className="flex items-center gap-2">
          <p className="line-through text-2xl font-medium text-red-500">
            ₦{product.price}
          </p>
          <p className="ml-3 text-2xl">₦{product.sales_price}</p>
        </div>
      ) : (
        <p className="text-2xl">₦{product.price}</p>
      )}
      <p className="text-sm">{product.short_description}</p>
    </section>
  );
};

export default ProductInfo;
