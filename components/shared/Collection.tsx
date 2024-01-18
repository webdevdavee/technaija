import ProductCard from "../ui/ProductCard";
import { getAllProducts } from "@/libs/actions/product.action";
import { IProduct } from "@/libs/database/models/product.model";

type CollectionProps = {
  title: string;
  subtitle?: string;
};

const Collection = async ({ title, subtitle }: CollectionProps) => {
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
      <div className="flex flex-wrap justify-between items-center gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Collection;
