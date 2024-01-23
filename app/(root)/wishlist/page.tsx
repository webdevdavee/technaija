import WishlistItem from "@/components/ui/WishlistItem";
import { getUserById } from "@/libs/actions/user.action";
import { IUser } from "@/libs/database/models/user.model";
import { currentUserID } from "@/userID";

const WishlistPage = async () => {
  // The function takes a user id as an argument and returns a user object of type IUser
  const fetchedUser: IUser = await getUserById(currentUserID);

  return (
    <section className="relative mt-16 px-20 py-12">
      <h1 className="text-center text-3xl font-medium py-6">Wishlist</h1>
      <WishlistItem fetchedUser={fetchedUser} />
    </section>
  );
};

export default WishlistPage;
