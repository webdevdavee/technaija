import CartListItem from "@/components/products/CartListItem";
import { auth } from "@clerk/nextjs";
import { getUserCartItems } from "@/libs/actions/cart.actions";
import { redirect } from "next/navigation";

const CartPage = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  if (!userId) {
    redirect("/");
  }

  const userCart = await getUserCartItems(userId);

  return (
    <section className="relative px-20 pt-6 pb-12 m:px-6 xl:px-12">
      <h1 className="text-center text-3xl font-medium py-6">Cart</h1>
      <CartListItem userId={userId} userCart={userCart.reverse()} />
    </section>
  );
};

export default CartPage;
