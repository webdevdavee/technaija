import ProductCard from "./ProductCard";

type CollectionProps = {
  data?: any;
  title: string;
  subtitle?: string;
};

const Collection = ({ data, title, subtitle }: CollectionProps) => {
  return (
    <section className="px-20 py-8 overflow-hidden">
      <div className="text-center">
        <h1 className="text-3xl font-medium mb-2">{title}</h1>
        <h3 className="text-base">{subtitle}</h3>
      </div>
      <ProductCard />
    </section>
  );
};

export default Collection;
