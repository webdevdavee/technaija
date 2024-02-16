import SlideInCartItems from "./SlideInCartItems";
import { auth } from "@clerk/nextjs";
import { getUserCartItems } from "@/libs/actions/cart.actions";

const SlideInCart = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const userCart = await getUserCartItems(userId);

  return (
    <section>
      <SlideInCartItems userId={userId} userCart={userCart.reverse()} />
    </section>
  );
};

export default SlideInCart;
