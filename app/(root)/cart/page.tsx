import CartListItem from "@/components/ui/CartListItem";
import { getUserById } from "@/libs/actions/user.action";
import { IUser } from "@/libs/database/models/user.model";
import { auth } from "@clerk/nextjs";

const CartPage = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  // The function takes a user id as an argument and returns a user object of type IUser
  const user: IUser = await getUserById(userId);

  return (
    <section className="relative mt-16 px-20 py-12">
      <h1 className="text-center text-3xl font-medium py-6">Cart</h1>
      <CartListItem userId={userId} fetchedUser={user} />
    </section>
  );
};

export default CartPage;
