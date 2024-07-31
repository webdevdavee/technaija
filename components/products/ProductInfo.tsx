import { IProduct } from "@/libs/database/models/product.model";
import Image from "next/image";
import { formatNumber } from "@/libs/utils";
import DOMPurify from "isomorphic-dompurify";

type ProductInfoProp = {
  product: IProduct;
};

const ProductInfo = ({ product }: ProductInfoProp) => {
  const stars = ["1", "2", "3", "4", "5"];

  const shortDescription = DOMPurify.sanitize(
    product.short_description ? product.short_description : ""
  );

  return (
    <section className="flex flex-col items-start gap-8 m:mt-12 xl:gap-4 w-full">
      <span className="w-full flex items-center justify-between sm:flex-col sm:items-start sm:gap-4">
        <p className="text-gray-400 text-sm">{product.original_category}</p>
        <span className="flex items-center gap-1 xl:hidden">
          {stars.map((_, index) => (
            <Image
              key={`star-${index}`}
              src="/star.svg"
              width={20}
              height={20}
              alt="star"
            />
          ))}
          <p className="text-sm ml-2">Reviews ({product.reviews?.length})</p>
        </span>
      </span>
      <h1 className="text-2xl font-semibold sm:text-xl">{product.name}</h1>
      {product.sales_price ? (
        <div className="flex items-center gap-2 sm:flex-col sm:items-start">
          <p className="line-through text-2xl font-medium text-red-500 sm:text-xl">
            {formatNumber(product.price, "₦")}
          </p>
          <p className="ml-3 text-2xl sm:ml-0 sm:text-xl">
            {formatNumber(product.sales_price, "₦")}
          </p>
        </div>
      ) : (
        <p className="text-2xl">{formatNumber(product.price, "₦")}</p>
      )}
      <div
        className="text-sm"
        dangerouslySetInnerHTML={{
          __html: shortDescription,
        }}
      />
    </section>
  );
};

export default ProductInfo;
