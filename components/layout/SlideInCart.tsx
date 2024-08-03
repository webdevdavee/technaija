import SlideInCartItems from "../utility/SlideInCartItems";
import { auth } from "@clerk/nextjs/server";
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
