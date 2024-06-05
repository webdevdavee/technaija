import Checkout from "@/components/utility/Checkout";
import { auth } from "@clerk/nextjs";
import { getUserCartItems } from "@/libs/actions/cart.actions";
import { getUserById } from "@/libs/actions/user.action";
import { redirect } from "next/navigation";

const page = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  if (!userId) {
    redirect("/");
  }

  const userCart = await getUserCartItems(userId);

  // If user has no item in cart and they try to access the checkout page, redirect them to the home page
  if (userCart.length <= 0) {
    redirect("/");
  }

  const user = await getUserById(userId);

  const paystackPublicKey = process.env.PAYSTACK_PUBLIC_KEY;

  return (
    <section className="relative px-20 pt-6 pb-12 m:px-6 xl:px-12">
      <h1 className="text-center text-3xl font-medium py-6 mb-6">Checkout</h1>
      <Checkout
        paystackPublicKey={paystackPublicKey!}
        userCart={userCart}
        user={user && user}
        userId={userId}
      />
    </section>
  );
};

export default page;
