import type { Metadata } from "next";
import { getProductById } from "@/libs/actions/product.action";
import { getAllProducts } from "@/libs/actions/product.action";
import { IProduct } from "@/libs/database/models/product.model";
import ProductDetails from "@/components/shared/ProductDetails";
import { auth } from "@clerk/nextjs";

type Params = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params: { id },
}: Params): Promise<Metadata> {
  const product = await getProductById(id);
  return {
    title: product.name,
    description: product.short_description,
  };
}

const ProductPage = async ({ params: { id } }: Params) => {
  const product: IProduct = await getProductById(id);

  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  return (
    <section className="relative mt-16 px-20 py-4">
      <ProductDetails product={product} userId={userId} />
    </section>
  );
};

export async function generateStaticParams() {
  const fetchedProducts = await getAllProducts(4);
  let products: IProduct[] = [];
  if (fetchedProducts !== undefined) {
    products = fetchedProducts.products;
  }
  return products.map((product) => ({
    id: product._id,
  }));
}

export default ProductPage;
