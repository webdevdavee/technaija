import WishlistItem from "@/components/ui/WishlistItem";
import { getUserById } from "@/libs/actions/user.action";
import { IUser } from "@/libs/database/models/user.model";
import { currentUserID } from "@/userID";

const WishlistPage = async () => {
  return (
    <section className="relative mt-16 px-20 py-12">
      <h1 className="text-center text-3xl font-medium py-6">Wishlist</h1>
      <WishlistItem />
    </section>
  );
};

export default WishlistPage;
