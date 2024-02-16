import WishlistItem from "@/components/ui/WishlistItem";
import { auth } from "@clerk/nextjs";
import { getUserWishlistItems } from "@/libs/actions/wishlist.actions";

const WishlistPage = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const userWishlist = await getUserWishlistItems(userId);

  return (
    <section className="relative mt-16 px-20 py-12">
      <h1 className="text-center text-3xl font-medium py-6">Wishlist</h1>
      <WishlistItem userId={userId} userWishlist={userWishlist.reverse()} />
    </section>
  );
};

export default WishlistPage;
