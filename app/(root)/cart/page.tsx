import CartListItem from "@/components/products/CartListItem";
import { auth } from "@clerk/nextjs";
import { getUserCartItems } from "@/libs/actions/cart.actions";

const CartPage = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const userCart = await getUserCartItems(userId);

  return (
    <section className="relative mt-16 px-20 py-12 m:px-6">
      <h1 className="text-center text-3xl font-medium py-6">Cart</h1>
      <CartListItem userId={userId} userCart={userCart.reverse()} />
    </section>
  );
};

export default CartPage;
