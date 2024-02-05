import QuickView from "@/components/ui/QuickView";
import ShopContainer from "@/components/shared/ShopContainer";

const Shop = async ({ searchParams }: SearchParamProps) => {
  let page = parseInt(searchParams.page as string, 10);
  page = !page || page < 1 ? 1 : page;

  return (
    <section className="px-20 py-8 overflow-hidden relative mt-24">
      <QuickView />
      <ShopContainer page={page} />
    </section>
  );
};

export default Shop;
