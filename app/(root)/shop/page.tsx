import QuickView from "@/components/utility/QuickView";
import ShopContainer from "@/components/utility/ShopContainer";
import { auth } from "@clerk/nextjs";
import { getUserWishlistItems } from "@/libs/actions/wishlist.actions";

const Shop = async ({ searchParams }: SearchParamProps) => {
  let page = parseInt(searchParams.page as string, 10);
  page = !page || page < 1 ? 1 : page;

  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const userWishlist = await getUserWishlistItems(userId);

  return (
    <section className="px-20 pt-6 pb-12 overflow-hidden relative mt-24 m:px-6 xl:px-12">
      <QuickView userId={userId} />
      <ShopContainer page={page} userId={userId} userWishlist={userWishlist} />
    </section>
  );
};

export default Shop;
